import React, { Dispatch, SetStateAction, useRef } from 'react';

import { Box, TextField } from '@mui/material'; // Імпорт компонентів з Material-UI
import {
  Libraries,
  LoadScript,
  StandaloneSearchBox,
} from '@react-google-maps/api';

import { theme } from '../../common/theme/theme';
import { ToLocation } from '../../common/types';

interface AddressInputProps {
  setRecipientAddress: Dispatch<SetStateAction<ToLocation | null>>;
  label: string;
  placeholder: string;
}

const GOOGLE_MAPS_LIBRARIES = ['places'] as Libraries;

const ToAddressInput: React.FC<AddressInputProps> = ({
  setRecipientAddress,
  label,
  placeholder,
}) => {
  const inputRef = useRef<google.maps.places.SearchBox>();
  const handlePlaceChanged = (): void => {
    if (inputRef.current) {
      const place = inputRef.current.getPlaces();
      if (place) {
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

        const toLoaction: ToLocation = {
          to_apartment: streetNumber?.long_name as string,
          to_city: cityName?.long_name as string,
          to_street: streetName?.long_name as string,
          to_zip: postalCode?.long_name as string,
          to_lat: String(lat),
          to_lng: String(lng),
        };
        setRecipientAddress(toLoaction);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
        libraries={GOOGLE_MAPS_LIBRARIES}
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
              marginTop: theme.spacing(2),
              background: theme.palette.background.paper,
            }}
          />
        </StandaloneSearchBox>
      </LoadScript>
    </Box>
  );
};

export { ToAddressInput };
