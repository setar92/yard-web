import React, { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { Header, PlaceOrder } from '../components';
import { useGetLockersQuery } from '../store/market-api/market-api';

const PlaceOrderPage: FC = () => {
  const { data: lockers } = useGetLockersQuery();
  if (!lockers) return <CircularProgress color="primary" />;

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw ',
        backgroundColor: 'lightcoral',
      }}
    >
      <Header />
      <Box
        sx={{
          height: '90%',
          width: '100% ',
          backgroundColor: 'lightskyblue',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '20% ',
            backgroundColor: 'red',
          }}
        ></Box>
        <Box
          sx={{
            width: '60% ',
            backgroundColor: 'lightyellow',
          }}
        >
          <PlaceOrder />
        </Box>
        <Box
          sx={{
            width: '20% ',
            backgroundColor: 'lightpink',
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export { PlaceOrderPage };
