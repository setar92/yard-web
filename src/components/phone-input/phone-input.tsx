import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css'; // Стилізація для react-phone-input-2

const PhoneNumberInput: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (value: string): void => {
    setPhoneNumber(value);
  };

  return (
    <div>
      <h2>Enter your phone number:</h2>
      <PhoneInput
        country={'lv'}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        autocompleteSearch={true}
      />
    </div>
  );
};

export { PhoneNumberInput };
