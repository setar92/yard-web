import React, { useRef, useState } from 'react';

import { Box, TextField } from '@mui/material'; // Імпорт компонентів з Material-UI
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

import { Loader } from '..';

const AddressInput: React.FC = () => {
  const originRef = useRef<HTMLDivElement | null>(null);
  const [origin, setOrigin] = useState('');
  // const destiantionRef = useRef<HTMLDivElement | null>(null);;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });
  const HandleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setOrigin(e.target.value);
  };

  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <Box>
      <Autocomplete>
        <TextField
          id="outlined-basic"
          label="Locations"
          variant="outlined"
          placeholder="Recipient's location"
          sx={{
            width: '400px',
          }}
          onChange={HandleLocationChange}
          ref={originRef}
        />
      </Autocomplete>
    </Box>
  );
};

export { AddressInput };
