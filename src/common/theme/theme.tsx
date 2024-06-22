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
  typography: {
    h1: {
      fontSize: '2.5rem', // e.g., 40px
    },
    h2: {
      fontSize: '2rem', // e.g., 32px
    },
    h3: {
      fontSize: '1.75rem', // e.g., 28px
    },
    h4: {
      fontSize: '1.5rem', // e.g., 24px
    },
    h5: {
      fontSize: '1.25rem', // e.g., 20px
    },
    h6: {
      fontSize: '1rem', // e.g., 16px
    },
    body1: {
      fontSize: '1rem', // e.g., 16px
    },
    body2: {
      fontSize: '0.875rem', // e.g., 14px
    },
    button: {
      fontSize: '0.875rem', // e.g., 14px
    },
    caption: {
      fontSize: '0.75rem', // e.g., 12px
    },
    overline: {
      fontSize: '0.75rem', // e.g., 12px
    },
  },
});
