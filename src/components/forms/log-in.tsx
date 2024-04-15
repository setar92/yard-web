import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css'; // Стилізація для react-phone-input-2
import { Button } from '@mui/material'; // Імпорт компонентів з Material-UI

import { AccountType } from '../../common/enums';
import { theme } from '../../common/theme/theme';
import { useSendSmsMutation } from '../../store/auth-yard-api/auth-yard-api';

const PhoneNumberInputForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sendSms, { isLoading }] = useSendSmsMutation();

  // Обробник для зміни номеру телефону
  const handlePhoneNumberChange = (value: string): void => {
    if (value.length > 10) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    setPhoneNumber(value);
  };

  // Обробник для відправки форми
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми
    sendSms({ phone: phoneNumber, type: AccountType.Business });
    // Тут можна додати логіку для відправки номеру телефону
    console.log('Submitted phone number:', phoneNumber);
  };

  if (isLoading) {
    return <p>isLoading</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '10px' }}>Enter your phone number:</h2>
      <PhoneInput
        country={'lv'}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        autocompleteSearch={true}
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
        Submit
      </Button>
    </form>
  );
};

export { PhoneNumberInputForm };
