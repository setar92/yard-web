// ToggleButton.tsx
import styled from 'styled-components';

import { theme } from '../../common/theme/theme';

interface StyledButtonProps {
  $isActive?: boolean;
  $borderRadius?: 'left' | 'right';
}

// Define the styled components
const StyledButton = styled.button<StyledButtonProps>`
  width: 50%;
  padding: 10px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 36px;
  border-top-left-radius: ${({ $borderRadius }): string =>
    $borderRadius === 'left' ? '10px' : '0'};
  border-bottom-left-radius: ${({ $borderRadius }): string =>
    $borderRadius === 'left' ? '10px' : '0'};
  border-top-right-radius: ${({ $borderRadius }): string =>
    $borderRadius === 'right' ? '10px' : '0'};
  border-bottom-right-radius: ${({ $borderRadius }): string =>
    $borderRadius === 'right' ? '10px' : '0'};
  background-color: ${({ $isActive }): string =>
    $isActive ? theme.palette.primary.dark : theme.palette.primary.light};
  color: ${({ $isActive }): string =>
    $isActive ? theme.palette.primary.light : theme.palette.primary.dark};
  transition: background-color 0.3s;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { StyledButton, ButtonsContainer };
