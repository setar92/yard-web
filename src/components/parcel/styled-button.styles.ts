import styled from 'styled-components';

import { theme } from './../../common/theme/theme';

const StyledButton = styled.button`
  padding: ${theme.spacing(1)} ${theme.spacing(1)};
  margin-top: ${theme.spacing(2)};
  margin-right: ${theme.spacing(2)};
  cursor: pointer;
  font-size: ${theme.typography.h6.fontSize};
  border: none;
  border-radius: ${theme.spacing(1)};
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.light};
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
  justify-content: center;
  align-items: center;
`;

export { StyledButton, ButtonsContainer };
