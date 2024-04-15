import React, { useState, ChangeEvent } from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css'; // Стилізація для react-phone-input-2
import { Button, TextField } from '@mui/material'; // Імпорт компонентів з Material-UI

import { AccountType } from '../../common/enums';
import { theme } from '../../common/theme/theme';
import { Loader } from '../../components';
import { useSendSmsMutation } from '../../store/auth-yard-api/auth-yard-api';

const PhoneNumberInputForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sendSms, { isLoading }] = useSendSmsMutation();
  const isSuccess = true;
  const [smsCode, setSmsCode] = useState('');

  const handlePhoneNumberChange = (value: string): void => {
    if (value.length > 10) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    setPhoneNumber(value);
  };

  const handleSmsCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (value.length > 4) {
      setSmsCode(value.slice(0, 4));
    } else {
      setSmsCode(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    sendSms({ phone: phoneNumber, type: AccountType.Business });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '300px' }}>
      <h2 style={{ marginBottom: '10px' }}>Enter your phone number:</h2>
      <PhoneInput
        country={'lv'}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        autocompleteSearch={true}
      />
      {isSuccess ? (
        <>
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
          >
            Confirm
          </Button>
        </>
      ) : (
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
      )}
    </form>
  );
};

export { PhoneNumberInputForm };
