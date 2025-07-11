import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Link,
  IconButton,
  Tooltip
} from '@mui/material';
import { ContentCopy, BarChart } from '@mui/icons-material';
import logger from '../utils/logger';

const UrlList = ({ urls, onViewStats }) => {
  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    logger.info('Copied short URL to clipboard', { shortUrl });
  };

  const handleRedirect = (shortCode) => {
    logger.info('Redirecting to stats page', { shortCode });
    onViewStats(shortCode);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Shortened URLs
      </Typography>
      {urls.length === 0 ? (
        <Typography>No URLs shortened yet</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Short URL</TableCell>
                <TableCell>Expires At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.shortCode}>
                  <TableCell>
                    <Link href={url.originalUrl} target="_blank" rel="noopener">
                      {url.originalUrl.substring(0, 50)}...
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/${url.shortCode}`} target="_blank">
                      {`${window.location.host}/${url.shortCode}`}
                    </Link>
                    <Tooltip title="Copy to clipboard">
                      <IconButton onClick={() => handleCopy(`${window.location.host}/${url.shortCode}`)} size="small">
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {new Date(url.expiresAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<BarChart />}
                      onClick={() => handleRedirect(url.shortCode)}
                      size="small"
                    >
                      Stats
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default UrlList;