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
  Divider
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import logger from '../utils/logger';

const ClickDetails = ({ clicks, onBack }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={onBack}
        style={{ marginBottom: '20px' }}
      >
        Back to Statistics
      </Button>
      <Typography variant="h6" gutterBottom>
        Click Details
      </Typography>
      <Divider style={{ marginBottom: '20px' }} />
      {clicks.length === 0 ? (
        <Typography>No clicks recorded yet</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clicks.map((click, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(click.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {click.source || 'Direct'}
                  </TableCell>
                  <TableCell>
                    {click.location || 'Unknown'}
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

export default ClickDetails;