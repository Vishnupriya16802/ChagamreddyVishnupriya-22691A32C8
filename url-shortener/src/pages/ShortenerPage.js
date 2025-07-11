import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import logger from '../utils/logger';

const ShortenerPage = ({ onNavigate }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(savedUrls);
    logger.info('Loaded URLs from localStorage', { count: savedUrls.length });
  }, []);

  const handleShorten = (urlData) => {
    const newUrls = urlData.map(data => {
      const shortCode = data.shortcode || generateShortCode();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + data.expiry * 60000);

      return {
        originalUrl: data.originalUrl,
        shortCode,
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        clicks: []
      };
    });

    const updatedUrls = [...urls, ...newUrls];
    setUrls(updatedUrls);
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    logger.info('Generated new short URLs', { count: newUrls.length });
  };

  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleViewStats = (shortCode) => {
    logger.info('Navigating to stats page', { shortCode });
    onNavigate('stats', shortCode);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '20px' }}>
        URL Shortener
      </Typography>
      <UrlForm onShorten={handleShorten} />
      <UrlList urls={urls} onViewStats={handleViewStats} />
    </Container>
  );
};

export default ShortenerPage;