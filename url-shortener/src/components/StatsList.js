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
  Link
} from '@mui/material';
import { BarChart } from '@mui/icons-material';
import logger from '../utils/logger';

const StatsList = ({ urls, onViewDetails }) => {
  const handleViewDetails = (shortCode) => {
    logger.info('Viewing click details for short URL', { shortCode });
    onViewDetails(shortCode);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        URL Statistics
      </Typography>
      {urls.length === 0 ? (
        <Typography>No URLs available</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Expires At</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.shortCode}>
                  <TableCell>
                    <Link href={`/${url.shortCode}`} target="_blank">
                      {`${window.location.host}/${url.shortCode}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={url.originalUrl} target="_blank" rel="noopener">
                      {url.originalUrl.substring(0, 30)}...
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(url.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(url.expiresAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {url.clicks?.length || 0}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<BarChart />}
                      onClick={() => handleViewDetails(url.shortCode)}
                      size="small"
                      style={{ width: '120px' }}
                    >
                      Details
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

export default StatsList;