import { ChangeEvent, FC, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Input, TextField } from '@mui/material';

import { Loader } from '..';
import { theme } from '../../common/theme/theme';
import { ToLocation, CreateParcelBody } from '../../common/types';
import { useGetUserInfoQuery } from '../../store/auth-yard-api/auth-yard-api';
import { useCreateParcelMutation } from '../../store/market-api/market-api';
import { RootState } from '../../store/store';
import { ToAddressInput } from '../to-address-input/to-adress-input';

const PlaceOrderA2A: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userRole = useSelector(
    (state: RootState) => state.deliveryType.userRole,
  );
  const navigate = useNavigate();

  const [fromLocation, setFromLocation] = useState<ToLocation | null>(null);
  const [parcelPhoto, setParcelPhoto] = useState<File>();
  const [toLocation, setToLocation] = useState<ToLocation | null>(null);
  const [bodyData, setBodyData] = useState<CreateParcelBody>({
    sender: { name: '', phone: '' },
    recipient: { name: '', phone: '' },
    desc: '',
    mover: { comment: '' },
  });

  const { data: userInfo, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });
  const [createParcel, { isError }] = useCreateParcelMutation();

  useEffect(() => {
    if (userInfo) {
      const user = {
        name: `${userInfo.name} ${userInfo.lastname}`,
        phone: userInfo.phone,
      };
      const userEmpty = {
        name: '',
        phone: '',
      };
      switch (userRole) {
        case 'sender':
          setBodyData({ ...bodyData, sender: user, recipient: userEmpty });
          break;
        case 'recipier':
          setBodyData({ ...bodyData, sender: userEmpty, recipient: user });
          break;
        case 'creator':
          setBodyData({ ...bodyData, sender: userEmpty, recipient: userEmpty });
          break;
      }
    }
  }, [userRole, userInfo]);

  useEffect(() => {
    isError && alert('some error, parcel is not registered');
  }, [isError]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setParcelPhoto(file);
  };
  const fillCreateParcelBody = async (): Promise<void> => {
    if (fromLocation && userInfo && toLocation && bodyData.desc) {
      const formData = new FormData();
      parcelPhoto && formData.append('photo_sender', parcelPhoto);
      formData.append('from_apartment', fromLocation.to_apartment);
      formData.append('from_city', fromLocation.to_city);
      formData.append('from_lat', fromLocation.to_lat);
      formData.append('from_lng', fromLocation.to_lng);
      formData.append('from_street', fromLocation.to_street);
      formData.append('from_zip', fromLocation.to_zip);
      formData.append('sender[name]', bodyData.sender.name);
      formData.append('sender[phone]', bodyData.sender.phone);
      formData.append('to_apartment', toLocation.to_apartment);
      formData.append('to_city', toLocation.to_city);
      formData.append('to_lat', toLocation.to_lat);
      formData.append('to_lng', toLocation.to_lng);
      formData.append('to_street', toLocation.to_street);
      formData.append('to_zip', toLocation.to_zip);
      formData.append('recipient[name]', bodyData.recipient.name);
      formData.append('recipient[phone]', bodyData.recipient.phone);
      formData.append('desc', bodyData.desc);
      formData.append('mover[comment]', bodyData.mover?.comment as string);

      await createParcel(formData as unknown as CreateParcelBody);
      setBodyData({
        ...bodyData,
        recipient: { name: '', phone: '+371' },
        desc: '',
        mover: { comment: '' },
      });
      setToLocation(null);
      navigate(0);
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
        width: '100%',
      }}
    >
      <h1
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        Place order
      </h1>
      <Box sx={{ width: '100%' }}>
        <h2 style={{ marginBottom: theme.spacing(3) }}>About parcel</h2>
        <TextField
          label="Description"
          variant="outlined"
          value={bodyData.desc}
          onChange={(e) => setBodyData({ ...bodyData, desc: e.target.value })}
          sx={{
            width: '100%',
            marginBottom: theme.spacing(2),
            background: theme.palette.background.paper,
          }}
        />
        <TextField
          label="Comment for mover"
          variant="outlined"
          value={bodyData.mover?.comment}
          onChange={(e) =>
            setBodyData({ ...bodyData, mover: { comment: e.target.value } })
          }
          sx={{
            width: '100%',
            marginBottom: theme.spacing(2),
            background: theme.palette.background.paper,
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <h2 style={{ marginBottom: theme.spacing(3) }}>Sender</h2>
        <TextField
          label="Sender name"
          variant="outlined"
          value={bodyData.sender.name}
          onChange={(e) =>
            setBodyData({
              ...bodyData,
              sender: { name: e.target.value, phone: bodyData.sender.phone },
            })
          }
          sx={{
            width: '100%',
            marginBottom: theme.spacing(2),
            background: theme.palette.background.paper,
          }}
        />
        <ToAddressInput
          setRecipientAddress={setFromLocation}
          label="Sender address"
          placeholder="Type sender address"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <h2 style={{ width: '100%', marginBottom: theme.spacing(3) }}>
          Recipient
        </h2>
        <TextField
          label="Recipient name"
          variant="outlined"
          value={bodyData.recipient.name}
          onChange={(e) =>
            setBodyData({
              ...bodyData,
              recipient: {
                name: e.target.value,
                phone: bodyData.recipient.phone,
              },
            })
          }
          sx={{
            width: '100%',
            marginBottom: theme.spacing(2),
            background: theme.palette.background.paper,
          }}
        />
        <PhoneInput
          country={'lv'}
          value={bodyData.recipient.phone}
          onChange={(e) =>
            setBodyData({
              ...bodyData,
              recipient: {
                name: bodyData.recipient.name,
                phone: e,
              },
            })
          }
          containerStyle={{ marginBottom: theme.spacing(2) }}
          autocompleteSearch={true}
        />
        <ToAddressInput
          setRecipientAddress={setToLocation}
          label="Recipient address"
          placeholder="Type recipient address"
        />

        <Input
          type="File"
          sx={{
            width: '100%',
            marginBottom: theme.spacing(2),
            backgroundColor: theme.palette.primary.light,
          }}
          onChange={handleFileChange}
        />
        <Button
          onClick={fillCreateParcelBody}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Create order A2A
        </Button>
      </Box>
    </Box>
  );
};

export { PlaceOrderA2A };
