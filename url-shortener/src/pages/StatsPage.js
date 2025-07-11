import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import StatsList from '../components/StatsList';
import ClickDetails from '../components/ClickDetails';
import logger from '../utils/logger';

const StatsPage = ({ onNavigate, shortCode }) => {
  const [urls, setUrls] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [view, setView] = useState('list');

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(savedUrls);
    logger.info('Loaded URLs for statistics', { count: savedUrls.length });

    if (shortCode) {
      const url = savedUrls.find(u => u.shortCode === shortCode);
      if (url) {
        setSelectedUrl(url);
        setView('details');
      }
    }
  }, [shortCode]);

  const handleViewDetails = (shortCode) => {
    const url = urls.find(u => u.shortCode === shortCode);
    if (url) {
      setSelectedUrl(url);
      setView('details');
      logger.info('Viewing click details', { shortCode });
    }
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedUrl(null);
    logger.info('Returned to statistics list view');
  };

  const handleBackToHome = () => {
    logger.info('Navigating back to home page');
    onNavigate('shortener');
  };

  return (
    <Container maxWidth="md">
      <Button
        startIcon={<ArrowBack />}
        onClick={handleBackToHome}
        sx={{ mt: 2, mb: 2 }}
      >
        Back to URL Shortener
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener Statistics
      </Typography>

      {view === 'list' ? (
        <StatsList urls={urls} onViewDetails={handleViewDetails} />
      ) : (
        <ClickDetails clicks={selectedUrl?.clicks || []} onBack={handleBackToList} />
      )}
    </Container>
  );
};

export default StatsPage;