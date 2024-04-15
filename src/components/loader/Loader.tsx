import React from 'react';

import { Box, CircularProgress } from '@mui/material';

import { theme } from '../../common/theme/theme';
export const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Adjust height as needed
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.primary.main,
        }}
      />
    </Box>
  );
};
