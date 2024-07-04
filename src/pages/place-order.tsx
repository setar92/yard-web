import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { fetchParcelDetails } from './get-parcels-info';
import { theme } from '../common/theme/theme';
import { ParcelObject } from '../common/types';
import {
  Header,
  PlaceOrderA2A,
  PlaceOrderB2A,
  ToggleDeliveryType,
  ToggleSender,
  ParcelComponent,
} from '../components';
import { useGetParcelsListQuery } from '../store/parcels-api/parcels-api';
import { RootState } from '../store/store';

const PlaceOrderPage: FC = () => {
  const [parcelsInfo, setParcelsInfo] = useState<ParcelObject[]>([]);

  const fromLocation = useSelector(
    (state: RootState) => state.deliveryType.fromLocation,
  );

  const { data: parcelIds } = useGetParcelsListQuery();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (parcelIds && parcelIds.length > 0) {
        const results = await fetchParcelDetails(parcelIds);
        setParcelsInfo(results);
      }
    };

    fetchData();
  }, [parcelIds]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw ',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />
      <Box
        sx={{
          width: '100% ',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '30% ',
            backgroundColor: theme.palette.background.default,
          }}
        >
          {parcelsInfo &&
            parcelsInfo.map((parcel) => (
              <ParcelComponent key={parcel.id} parcel={parcel} />
            ))}
        </Box>
        <Box
          sx={{
            width: '40% ',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <ToggleDeliveryType />
          <ToggleSender />
          {fromLocation === 'warehouse' ? <PlaceOrderB2A /> : <PlaceOrderA2A />}
        </Box>
        <Box
          sx={{
            width: '30% ',
            backgroundColor: theme.palette.background.default,
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export { PlaceOrderPage };
