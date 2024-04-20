import React, { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { PlaceOrder } from '../components';
import { useGetLockersQuery } from '../store/market-api/market-api';

const PlaceOrderPage: FC = () => {
  const { data: lockers } = useGetLockersQuery();
  if (!lockers) return <CircularProgress color="primary" />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw ',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '10%',
          width: '100% ',
          backgroundColor: 'coral',
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '90%',
          width: '100% ',
          backgroundColor: 'lightskyblue',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '20% ',
            backgroundColor: 'dimgrey',
          }}
        ></Box>
        <Box
          sx={{
            height: '100%',
            width: '60% ',
            backgroundColor: 'lightyellow',
          }}
        >
          <PlaceOrder />
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '20% ',
            backgroundColor: 'lightpink',
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export { PlaceOrderPage };
