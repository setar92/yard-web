import React, { Dispatch, SetStateAction, useRef } from 'react';

import { Box, TextField } from '@mui/material'; // Імпорт компонентів з Material-UI
import { StandaloneSearchBox } from '@react-google-maps/api';

import { theme } from '../../common/theme/theme';
import { ToLocation } from '../../common/types';

interface AddressInputProps {
  setRecipientAddress: Dispatch<SetStateAction<ToLocation | null>>;
  label: string;
  placeholder: string;
}

const ToAddressInput: React.FC<AddressInputProps> = ({
  setRecipientAddress,
  label,
  placeholder,
}) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlaceChanged = (): void => {
    if (inputRef.current) {
      const place = inputRef.current.getPlaces();
      if (place && place.length > 0) {
        const placeInfo = place[0].address_components;
        const postalCode = placeInfo?.find((place) =>
          place.types.includes('postal_code'),
        );
        const streetNumber = placeInfo?.find((place) =>
          place.types.includes('street_number'),
        );
        const streetName = placeInfo?.find((place) =>
          place.types.includes('route'),
        );
        const cityName = placeInfo?.find((place) =>
          place.types.includes('locality'),
        );
        const lat = place[0].geometry?.location?.lat();
        const lng = place[0].geometry?.location?.lng();

        const toLocation: ToLocation = {
          to_apartment: streetNumber?.long_name || '',
          to_city: cityName?.long_name || '',
          to_street: streetName?.long_name || '',
          to_zip: postalCode?.long_name || '',
          to_lat: String(lat),
          to_lng: String(lng),
        };
        setRecipientAddress(toLocation);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: theme.spacing(2),
      }}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <TextField
          placeholder={placeholder}
          label={label}
          sx={{
            width: '100%',
            background: theme.palette.background.paper,
          }}
        />
      </StandaloneSearchBox>
    </Box>
  );
};

export { ToAddressInput };
