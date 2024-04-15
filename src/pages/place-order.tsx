import React, { FC } from 'react';

import { Box } from '@mui/material';

import { PhoneNumberInputForm } from '../components';
import { useGetLockersQuery } from '../store/market-api/market-api';

const PlaceOrderPage: FC = () => {
  const { data: lockers } = useGetLockersQuery();
  if (!lockers) return <div>Loading...</div>;

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

export { PlaceOrderPage };
