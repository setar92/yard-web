import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button, TextField } from '@mui/material';

import { StorageKey } from '../../common/enums';
import { theme } from '../../common/theme/theme';
import { setBusinesToken } from '../../store/auth/slice';

const Header: FC = () => {
  const [businessToken, setBusinessToken] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [isToken, setisToken] = useState(false);

  const dispatch = useDispatch();

  const handleSaveToken = (): void => {
    const business_token = businessToken;
    localStorage.setItem(StorageKey.BUSINESSTOKEN, business_token);
    dispatch(setBusinesToken({ business_token }));
    setBusinessToken('');
    setShowInput(false);
    setisToken(true);
  };
  const handleAddToken = (): void => {
    setShowInput(true);
  };
  useEffect(() => {
    const token = localStorage.getItem(StorageKey.BUSINESSTOKEN);
    if (token) {
      setisToken(true);
    } else {
      setisToken(false);
    }
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        height: '10%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        alignItems: 'center',
      }}
    >
      {showInput ? (
        <Box>
          <TextField
            type="text"
            label="Business token"
            placeholder="Type your business token"
            value={businessToken}
            onChange={(e): void => setBusinessToken(e.target.value)}
            sx={{
              marginLeft: '10px',
              marginRight: '10px',
            }}
          />
          <Button
            onClick={handleSaveToken}
            sx={{
              paddingTop: '16px',
            }}
          >
            Save
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handleAddToken}
          variant="contained"
          sx={{
            marginLeft: '10px',
            marginRight: '10px',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Add business token
        </Button>
      )}
      {isToken ? 'Token already added' : 'Token missing'}
    </Box>
  );
};

export { Header };
