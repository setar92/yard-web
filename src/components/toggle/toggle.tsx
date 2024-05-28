// ToggleButton.tsx
import React, { useState } from 'react';

import { StyledButton, ButtonsContainer } from './styled-button.styles';

const ToggleButtons: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'button1' | 'button2'>(
    'button1',
  );

  return (
    <ButtonsContainer>
      <StyledButton
        $isActive={activeButton === 'button1'}
        onClick={() => setActiveButton('button1')}
        $borderRadius="left"
      >
        Warehouse to address
      </StyledButton>
      <StyledButton
        $isActive={activeButton === 'button2'}
        onClick={() => setActiveButton('button2')}
        $borderRadius="right"
      >
        Address to Address
      </StyledButton>
    </ButtonsContainer>
  );
};

export { ToggleButtons };
