import React from 'react';

import { Box, CircularProgress } from '@mui/material';

import { theme } from '../common/theme/theme';
import { PhoneNumberInputForm } from '../components';
import { useGetLockersQuery } from '../store/market-api/market-api';

const LogInPage: React.FC = () => {
  const { data: lockers } = useGetLockersQuery();
  if (!lockers)
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
      <PhoneNumberInputForm />
    </Box>
  );
};

export { LogInPage };
