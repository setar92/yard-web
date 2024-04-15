import React, { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { useGetLockersQuery } from '../store/market-api/market-api';

const PlaceOrderPage: FC = () => {
  const { data: lockers } = useGetLockersQuery();
  if (!lockers) return <CircularProgress color="primary" />;

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
      main page
    </Box>
  );
};

export { PlaceOrderPage };
