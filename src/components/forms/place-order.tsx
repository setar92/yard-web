import React, { FC, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import { Box, Button, TextField } from '@mui/material';

import { FromInput, Loader } from '../';
import { theme } from '../../common/theme/theme';
import { Locker, ToLocation, CreateParcelBody } from '../../common/types';
import { useGetUserInfoQuery } from '../../store/auth-yard-api/auth-yard-api';
import { useCreateParcelMutation } from '../../store/market-api/market-api';
import { ToAddressInput } from '../to-address-input/to-adress-input';

const PlaceOrder: FC = () => {
  let createParcelBody: CreateParcelBody;

  const [toLocation, setToLocation] = useState<ToLocation>();
  const [fromLocation, setFromLocation] = useState<Locker>();
  const [recipientName, setrecipientName] = useState('');
  const [recipientPhone, setrecipientPhone] = useState('');
  const [parcelDescription, setParcelDescription] = useState('');
  const [commentForMover, setCommentForMover] = useState('');

  const { isLoading, data: userInfo } = useGetUserInfoQuery();
  const [createParcel] = useCreateParcelMutation();
  const fillCreateParcelBody = (): void => {
    if (fromLocation && userInfo && toLocation) {
      createParcelBody = {
        from_id: fromLocation.id,
        sender: { name: userInfo.name, phone: userInfo?.phone },
        to_apartment: toLocation.to_apartment,
        to_city: toLocation.to_city,
        to_lat: toLocation.to_lat,
        to_lng: toLocation.to_lng,
        to_street: toLocation.to_street,
        to_zip: toLocation.to_zip,
        recipient: {
          name: recipientName,
          phone: recipientPhone,
        },
        desc: parcelDescription,
        mover: {
          comment: commentForMover,
        },
      };
    }
    createParcel(createParcelBody);
    setrecipientName('');
    setCommentForMover('');
    setrecipientPhone('');
  };

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Place order</h1>
      <Box>
        <h2>Sender</h2>
        <TextField
          label="Description"
          variant="outlined"
          value={parcelDescription}
          onChange={(e) => setParcelDescription(e.target.value)}
          sx={{ width: 300, marginTop: 2 }}
        />
        <FromInput setFromLocation={setFromLocation} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>Recipient</h2>
        <TextField
          label="Recipient name"
          variant="outlined"
          value={recipientName}
          onChange={(e) => setrecipientName(e.target.value)}
          sx={{ width: 300, marginTop: 2, marginBottom: 2 }}
        />
        <PhoneInput
          country={'lv'}
          value={recipientPhone}
          onChange={(e) => setrecipientPhone(e)}
          autocompleteSearch={true}
        />
        <ToAddressInput
          setAddress={setToLocation}
          label="Recipient address"
          placeholder="Type recipient address"
        />
        <TextField
          label="Comment for mover"
          variant="outlined"
          value={commentForMover}
          onChange={(e) => setCommentForMover(e.target.value)}
          sx={{ width: 300, marginTop: 2, marginBottom: 2 }}
        />
        <Button
          onClick={fillCreateParcelBody}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Create order
        </Button>
      </Box>
    </Box>
  );
};

export { PlaceOrder };
