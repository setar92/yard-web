import React, { FC } from 'react';

import { Box } from '@mui/material';

import { theme } from '../common/theme/theme';
import { Header, PlaceOrder, ToggleButtons } from '../components';

const PlaceOrderPage: FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw ',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />
      <Box
        sx={{
          height: '90%',
          width: '100% ',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '20% ',
            backgroundColor: theme.palette.background.default,
          }}
        ></Box>
        <Box
          sx={{
            width: '60% ',
            backgroundColor: theme.palette.background.default,
            border: '1px solid black',
          }}
        >
          <ToggleButtons />
          <PlaceOrder />
        </Box>
        <Box
          sx={{
            width: '20% ',
            backgroundColor: theme.palette.background.default,
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export { PlaceOrderPage };
