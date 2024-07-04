// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';

import { theme } from './../../../common/theme/theme';

const StyledButton = styled.button`
  padding: ${theme.spacing(2)} ${theme.spacing(1)};
  padding-right: ${theme.spacing(3)};
  margin-right: ${theme.spacing(2)};
  cursor: pointer;
  font-size: ${theme.typography.h5.fontSize};
  border: none;
  background-color: ${theme.palette.primary.light};
  color: ${theme.palette.primary.main};
  align-self: end;

  @media (max-width: ${theme.breakpoints.values.md}px) {
    font-size: ${theme.typography.h6.fontSize};
  }

  @media (max-width: ${theme.breakpoints.values.sm}px) {
    font-size: ${theme.typography.caption.fontSize};
  }
`;

export { StyledButton };
