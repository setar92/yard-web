import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Стилізація для react-phone-input-2
import { Navigate, useLocation } from 'react-router-dom';

import { Button, TextField } from '@mui/material'; // Імпорт компонентів з Material-UI

import { AccountType, AppRoute } from '../../common/enums';
import { theme } from '../../common/theme/theme';
import { Loader } from '../../components';
import {
  useSendSmsMutation,
  useVerifyCodeMutation,
  useGetUserInfoQuery,
} from '../../store/auth-yard-api/auth-yard-api';

const PhoneNumberInputForm: React.FC = () => {
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sendSms, { isLoading, isSuccess }] = useSendSmsMutation();
  const [
    verifyCode,
    { isLoading: CheckCodeLoading, isSuccess: CheckCodeSuccess },
  ] = useVerifyCodeMutation();
  const { refetch } = useGetUserInfoQuery();
  CheckCodeSuccess && refetch();
  const [smsCode, setSmsCode] = useState('');

  const handlePhoneNumberChange = (value: string): void => {
    if (value.length > 10) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    setPhoneNumber(value);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'NumpadEnter') {
      handleSubmit(event);
    }
  };

  const handleSmsCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (value.length > 4) {
      setSmsCode(value.slice(0, 4));
    } else {
      setSmsCode(value);
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    sendSms({ phone: phoneNumber, type: AccountType.Business });
  };

  const handleVerifyCode = async (): Promise<void> => {
    await verifyCode({
      phone: phoneNumber,
      type: AccountType.Business,
      code: smsCode,
    });
  };

  if (isLoading || CheckCodeLoading) {
    return <Loader />;
  }

  if (CheckCodeSuccess) {
    return <Navigate to={AppRoute.ROOT} replace state={{ from: location }} />;
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '300px' }}>
      {isSuccess ? (
        <>
          <h2 style={{ marginBottom: '10px' }}>Enter code:</h2>
          <TextField
            placeholder="* * * *"
            fullWidth
            type="number"
            InputProps={{
              sx: {
                '& input::placeholder': {
                  textAlign: 'center',
                },
                '& input': {
                  textAlign: 'center',
                  height: '6px',
                },
                marginTop: '10px',
              },
            }}
            value={smsCode}
            onChange={handleSmsCodeChange}
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{
              my: 2,
              width: '100%',
              backgroundColor: theme.palette.primary.main,
            }}
            disabled={!(smsCode.length === 4)}
            onClick={handleVerifyCode}
          >
            Confirm
          </Button>
        </>
      ) : (
        <>
          <h2 style={{ marginBottom: '10px' }}>Enter your phone number:</h2>
          <PhoneInput
            country={'lv'}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            autocompleteSearch={true}
            onKeyDown={handleEnter}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              my: 2,
              width: '100%',
              backgroundColor: theme.palette.primary.main,
            }}
            disabled={disableSubmit}
          >
            Get the code
          </Button>
        </>
      )}
    </form>
  );
};

export { PhoneNumberInputForm };
