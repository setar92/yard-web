import React, { Dispatch, SetStateAction } from 'react';

import { Box, TextField } from '@mui/material'; // Імпорт компонентів з Material-UI
import {
  useJsApiLoader,
  Autocomplete,
  Libraries,
} from '@react-google-maps/api';

import { Loader } from '..';

interface AddressInputProps {
  setAddress: Dispatch<SetStateAction<string>>;
  label: string;
  placeholder: string;
}

const GOOGLE_MAPS_LIBRARIES = ['places'] as Libraries;

const AddressInput: React.FC<AddressInputProps> = ({
  setAddress,
  label,
  placeholder,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });
  const HandleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setAddress(e.target.value);
  };

  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <Box>
      <Autocomplete>
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          placeholder={placeholder}
          sx={{
            width: '400px',
          }}
          onChange={HandleLocationChange}
        />
      </Autocomplete>
    </Box>
  );
};

export { AddressInput };
