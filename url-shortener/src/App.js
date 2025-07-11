import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import logger from './utils/logger';

function App() {
  const [redirectInfo, setRedirectInfo] = useState(null);

  const handleShortUrlRedirect = (shortCode) => {
    logger.info('Attempting to redirect short URL', { shortCode });

    const urls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    const urlData = urls.find(url => url.shortCode === shortCode);

    if (urlData) {
      const now = new Date();
      const expiresAt = new Date(urlData.expiresAt);

      if (now > expiresAt) {
        logger.warn('Attempted to access expired URL', { shortCode, expiresAt });
        return null;
      }

      const clickData = {
        timestamp: now.toISOString(),
        source: document.referrer || 'Direct',
        location: navigator.language
      };

      urlData.clicks = [...(urlData.clicks || []), clickData];
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
      logger.info('Recorded click for short URL', { shortCode, clickData });

      return urlData.originalUrl;
    }

    logger.warn('Short URL not found', { shortCode });
    return null;
  };

  const handleNavigation = (page, shortCode) => {
    if (page === 'shortener') {
      window.location.href = '/';
    } else if (page === 'stats') {
      window.location.href = `/stats${shortCode ? `?code=${shortCode}` : ''}`;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ShortenerPage onNavigate={handleNavigation} />}
        />
        <Route
          path="/stats"
          element={<StatsPage onNavigate={handleNavigation} />}
        />
        <Route
          path="/:shortCode"
          element={<ShortUrlRedirect handler={handleShortUrlRedirect} />}
        />
      </Routes>
    </Router>
  );
}

const ShortUrlRedirect = ({ handler }) => {
  const shortCode = window.location.pathname.substring(1);
  const targetUrl = handler(shortCode);

  if (targetUrl) {
    window.location.href = targetUrl;
    return <div>Redirecting...</div>;
  }

  return <Navigate to="/" />;
};

export default App;