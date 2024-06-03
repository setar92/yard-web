import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#F28300',
      dark: '#000000',
      contrastText: '#D3D3D3',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      lg: 1920,
      xl: 1536,
      md: 1200,
      sm: 768,
      xs: 480,
    },
  },
  spacing: [2, 6, 12, 24],
});
