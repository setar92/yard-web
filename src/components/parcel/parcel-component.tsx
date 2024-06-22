import React from 'react';

import { Box } from '@mui/material';

import { StyledButton, ButtonsContainer } from './styled-button.styles';
import { ParcelStatuses } from '../../common/enums';
import { theme } from '../../common/theme/theme';
import { ParcelObject } from '../../common/types';
import { useSenderPutMutation } from '../../store/market-api/market-api';

interface ParcelComponentProps {
  parcel: ParcelObject;
}

const ParcelComponent: React.FC<ParcelComponentProps> = ({ parcel }) => {
  const [senderPut] = useSenderPutMutation();
  const handlePutButton = async (): Promise<void> => {
    try {
      await senderPut({ parcelNumber: parcel.number });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderRadius: theme.spacing(2),
        padding: theme.spacing(2),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: theme.typography.h5.fontSize,
        }}
      >
        <p>{parcel.number}</p>
      </Box>
      <Box
        sx={{
          display: 'flex',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        }}
      >
        <Box
          sx={{
            width: '100px',
          }}
        >
          <p>Description:</p>
        </Box>
        <Box>{parcel.desc}</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        }}
      >
        <Box
          sx={{
            width: '100px',
          }}
        >
          <p>Status:</p>
        </Box>
        <Box>{parcel.status}</Box>
      </Box>
      <ButtonsContainer onClick={handlePutButton}>
        {parcel.status !== ParcelStatuses.put && (
          <StyledButton>Ready for pick up</StyledButton>
        )}
      </ButtonsContainer>
    </Box>
  );
};

export { ParcelComponent };
