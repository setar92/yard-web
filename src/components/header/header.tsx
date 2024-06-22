import React, { FC } from 'react';

import { Box } from '@mui/material';

import { theme } from '../../common/theme/theme';

const Header: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '10%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        alignItems: 'center',
      }}
    ></Box>
  );
};

export { Header };
