import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import { StyledButton } from './log-out/styled-button.styles';
import { theme } from '../../common/theme/theme';
import { logOut } from '../../store/auth/slice';

const Header: FC = () => {
  const dispatch = useDispatch();

  const handleLogOut = (): void => {
    dispatch(logOut({}));
  };
  return (
    <Box
      sx={{
        display: 'flex',
        height: '10%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '70%',
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          width: '30%',
          justifyContent: 'end',
        }}
      >
        <StyledButton onClick={handleLogOut}>Log out</StyledButton>
      </Box>
    </Box>
  );
};

export { Header };
