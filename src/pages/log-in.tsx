import React from 'react';

import { Box } from '@mui/material';

import { PhoneNumberInputForm } from '../components';

const LogInPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <PhoneNumberInputForm />
    </Box>
  );
};

export { LogInPage };
