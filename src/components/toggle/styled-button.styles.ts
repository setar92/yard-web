import styled from 'styled-components';

import { theme } from './../../common/theme/theme';

interface StyledButtonProps {
  $isActive?: boolean;
  $borderRadius?: 'left' | 'right';
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  padding: ${theme.spacing(2)} ${theme.spacing(1)};
  margin-top: ${theme.spacing(2)};
  margin-right: ${theme.spacing(2)};
  cursor: pointer;
  font-size: 18px;
  border: none;
  border-radius: ${theme.spacing(2)};
  background-color: ${({ $isActive }): string =>
    $isActive ? theme.palette.primary.main : theme.palette.primary.light};
  color: ${({ $isActive }): string =>
    $isActive ? theme.palette.primary.light : theme.palette.primary.main};
  transition: background-color 0.3s;

  @media (max-width: ${theme.breakpoints.values.md}px) {
    padding: ${theme.spacing(1)} ${theme.spacing(1)};
    margin-top: ${theme.spacing(1)};
    margin-right: ${theme.spacing(1)};
    font-size: 16px;
    border-radius: ${({ $borderRadius }): string =>
      $borderRadius === 'left' ? '4px' : '0'};
  }

  @media (max-width: ${theme.breakpoints.values.md}px) {
    font-size: 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { StyledButton, ButtonsContainer };
