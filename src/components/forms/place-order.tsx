import React, { FC, useState } from 'react';

import { Box } from '@mui/material';

import { FromInput } from '../';
import { AddressInput } from '../address-autocomplite/autocomplite';

const PlaceOrder: FC = () => {
  const [origin, setOrigin] = useState('');
  console.log(origin);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Place order</h1>
      <FromInput />
      <AddressInput
        setAddress={setOrigin}
        label="From location"
        placeholder="Type FROM location"
      />
    </Box>
  );
};

export { PlaceOrder };
