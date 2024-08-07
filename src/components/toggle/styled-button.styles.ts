import styled from 'styled-components';

import { theme } from './../../common/theme/theme';

interface StyledButtonProps {
  $isActive?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  padding: ${theme.spacing(2)} ${theme.spacing(1)};
  margin-top: ${theme.spacing(2)};
  margin-right: ${theme.spacing(2)};
  cursor: pointer;
  font-size: ${theme.typography.h5.fontSize};
  border: none;
  border-radius: ${theme.spacing(2)};
  background-color: ${({ $isActive }): string =>
    $isActive ? theme.palette.primary.main : theme.palette.primary.light};
  color: ${({ $isActive }): string =>
    $isActive ? theme.palette.primary.light : theme.palette.primary.main};
  transition: background-color 0.5s;

  @media (max-width: ${theme.breakpoints.values.md}px) {
    padding: ${theme.spacing(1)} ${theme.spacing(1)};
    margin-top: ${theme.spacing(1)};
    margin-right: ${theme.spacing(1)};
    font-size: ${theme.typography.h6.fontSize};
    border-radius: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.values.sm}px) {
    font-size: ${theme.typography.caption.fontSize};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { StyledButton, ButtonsContainer };
