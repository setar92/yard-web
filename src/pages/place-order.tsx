import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { theme } from '../common/theme/theme';
import {
  Header,
  PlaceOrderA2A,
  PlaceOrderB2A,
  ToggleDeliveryType,
  ToggleSender,
} from '../components';
import { RootState } from '../store/store';

const PlaceOrderPage: FC = () => {
  const fromLocation = useSelector(
    (state: RootState) => state.deliveryType.fromLocation,
  );
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
          // height: '90%',
          width: '100% ',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '30% ',
            backgroundColor: theme.palette.background.default,
          }}
        ></Box>
        <Box
          sx={{
            width: '40% ',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <ToggleDeliveryType />
          <ToggleSender />
          {fromLocation === 'warehouse' ? <PlaceOrderB2A /> : <PlaceOrderA2A />}
        </Box>
        <Box
          sx={{
            width: '30% ',
            backgroundColor: theme.palette.background.default,
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export { PlaceOrderPage };
