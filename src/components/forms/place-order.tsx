import { ChangeEvent, FC, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import { Box, Button, Input, TextField } from '@mui/material';

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
  const [parcelPhoto, setParcelPhoto] = useState<File>();

  const { isLoading, data: userInfo } = useGetUserInfoQuery();
  const [createParcel] = useCreateParcelMutation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setParcelPhoto(file);
  };
  const fillCreateParcelBody = (): void => {
    if (fromLocation && userInfo && toLocation && parcelDescription) {
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
        photo_sender: parcelPhoto,
      };
      const formData = new FormData();
      parcelPhoto && formData.append('photo_sender', parcelPhoto);
      formData.append('from_id', createParcelBody.from_id);
      formData.append('sender[name]', createParcelBody.sender.name);
      formData.append('sender[phone]', createParcelBody.sender.phone);
      formData.append('to_apartment', createParcelBody.to_apartment);
      formData.append('to_city', createParcelBody.to_city);
      formData.append('to_lat', createParcelBody.to_lat);
      formData.append('to_lng', createParcelBody.to_lng);
      formData.append('to_street', createParcelBody.to_street);
      formData.append('to_zip', createParcelBody.to_zip);
      formData.append('recipient[name]', createParcelBody.recipient.name);
      formData.append('recipient[phone]', createParcelBody.recipient.phone);
      formData.append('desc', parcelDescription);
      formData.append('mover[comment]', commentForMover);
      createParcel(formData as unknown as CreateParcelBody);
      setrecipientName('');
      setCommentForMover('');
      setrecipientPhone('');
      setParcelDescription('');
    }
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
          sx={{ width: 600, marginTop: 2 }}
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
          sx={{ width: 600, marginTop: 2, marginBottom: 2 }}
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
          sx={{ width: 600, marginTop: 2, marginBottom: 2 }}
        />
        <Input
          type="File"
          sx={{ width: 300, marginBottom: 2 }}
          onChange={handleFileChange}
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
