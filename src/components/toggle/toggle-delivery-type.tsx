// ToggleButton.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { StyledButton, ButtonsContainer } from './styled-button.styles';
import { FromLocation } from '../../common/types';
import { setFromLocation } from '../../store/delivery-type/slice';

const ToggleDeliveryType: React.FC = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState<FromLocation>('warehouse');
  const habdleW2AButton = (): void => {
    setActiveButton('warehouse');
    dispatch(setFromLocation({ fromLocation: 'warehouse' }));
  };

  const habdleA2AButton = (): void => {
    setActiveButton('address');
    dispatch(setFromLocation({ fromLocation: 'address' }));
  };

  return (
    <ButtonsContainer>
      <StyledButton
        $isActive={activeButton === 'warehouse'}
        onClick={habdleW2AButton}
      >
        Warehouse to address
      </StyledButton>
      <StyledButton
        $isActive={activeButton === 'address'}
        onClick={habdleA2AButton}
      >
        Address to Address
      </StyledButton>
    </ButtonsContainer>
  );
};

export { ToggleDeliveryType };
