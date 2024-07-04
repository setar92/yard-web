// ToggleButton.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { StyledButton, ButtonsContainer } from './styled-button.styles';
import { UserRole } from '../../common/types';
import { setUserRole } from '../../store/delivery-type/slice';

const ToggleSender: React.FC = () => {
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState<UserRole>('sender');

  const habdleUserIsSender = (): void => {
    setActiveButton('sender');
    dispatch(setUserRole({ userRole: 'sender' }));
  };
  const habdleUserIsRecipient = (): void => {
    setActiveButton('recipier');
    dispatch(setUserRole({ userRole: 'recipier' }));
  };
  const habdleUserIsCreator = (): void => {
    setActiveButton('creator');
    dispatch(setUserRole({ userRole: 'creator' }));
  };

  return (
    <ButtonsContainer>
      <StyledButton
        $isActive={activeButton === 'sender'}
        onClick={habdleUserIsSender}
      >
        I'm sender
      </StyledButton>
      <StyledButton
        $isActive={activeButton === 'recipier'}
        onClick={habdleUserIsRecipient}
      >
        I'm recipient
      </StyledButton>
      <StyledButton
        $isActive={activeButton === 'creator'}
        onClick={habdleUserIsCreator}
      >
        I'm creator
      </StyledButton>
    </ButtonsContainer>
  );
};

export { ToggleSender };
