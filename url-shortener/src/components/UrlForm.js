import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { validateUrl, validateShortcode, validateExpiry } from '../utils/validation';
import logger from '../utils/logger';

const UrlForm = ({ onShorten }) => {
  const [urls, setUrls] = useState([{ originalUrl: '', expiry: 30, shortcode: '' }]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);

    if (errors[index]?.[field]) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: '' };
      setErrors(newErrors);
    }
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: '', expiry: 30, shortcode: '' }]);
      logger.info('Added new URL input field');
    }
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
      logger.info('Removed URL input field', { index });
    }
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = urls.map(() => ({}));

    urls.forEach((url, index) => {
      if (!url.originalUrl) {
        newErrors[index].originalUrl = 'URL is required';
        isValid = false;
      } else if (!validateUrl(url.originalUrl)) {
        newErrors[index].originalUrl = 'Invalid URL format';
        isValid = false;
      }

      if (url.shortcode && !validateShortcode(url.shortcode)) {
        newErrors[index].shortcode = 'Shortcode must be 4-20 alphanumeric characters';
        isValid = false;
      }

      if (url.expiry && !validateExpiry(url.expiry)) {
        newErrors[index].expiry = 'Expiry must be a positive number';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logger.info('Attempting to shorten URLs', { urls });

    if (validateInputs()) {
      onShorten(urls);
      logger.info('URLs validated successfully', { urls });
    } else {
      logger.warn('URL validation failed', { errors });
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Shorten URLs
      </Typography>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <Grid container spacing={2} key={index} style={{ marginBottom: '15px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Original URL"
                value={url.originalUrl}
                onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
                error={!!errors[index]?.originalUrl}
                helperText={errors[index]?.originalUrl || ''}
                required
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                label="Expiry (minutes)"
                type="number"
                value={url.expiry}
                onChange={(e) => handleChange(index, 'expiry', e.target.value)}
                error={!!errors[index]?.expiry}
                helperText={errors[index]?.expiry || ''}
                InputProps={{
                  inputProps: { min: 1 }
                }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Custom Shortcode (optional)"
                value={url.shortcode}
                onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
                error={!!errors[index]?.shortcode}
                helperText={errors[index]?.shortcode || ''}
              />
            </Grid>
            <Grid item xs={12} sm={1} style={{ display: 'flex', alignItems: 'center' }}>
              {urls.length > 1 && (
                <IconButton onClick={() => removeUrlField(index)} color="error">
                  <Remove />
                </IconButton>
              )}
              {index === urls.length - 1 && urls.length < 5 && (
                <Tooltip title="Add another URL">
                  <IconButton onClick={addUrlField} color="primary">
                    <Add />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Shorten URLs
        </Button>
      </form>
    </Paper>
  );
};

export default UrlForm;