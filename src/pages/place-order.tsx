import React, { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { AddressInput } from '../components';
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
      Place order
      <AddressInput />
    </Box>
  );
};

export { PlaceOrderPage };
