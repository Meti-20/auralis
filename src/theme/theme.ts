import { createTheme } from '@mui/material/styles';

export const AURALIS_COLORS = {
  warmIvory: '#F8F7F2',
  softCream: '#EEECE4',
  cardBg: '#FCFBF8',
  charcoal: '#252923',
  charcoalLight: '#3D443A',
  sageGreen: '#A5B98A',
  sageDark: '#3E502C',
  sageDeep: '#2F3C22',
  sageLight: '#CBD8BA',
  softGrey: '#DADBD5',
  softGreyLight: '#E8E8E2',
  paleLime: '#DDF0CE',
  paleLimeSoft: 'rgba(221, 240, 206, 0.55)',
  aiGlow: 'rgba(165, 185, 138, 0.22)',
  textPrimary: '#252923',
  textSecondary: '#5A6255',
  textMuted: '#7D8678',
  positive: '#367B4A',
  negative: '#B24436',
  warning: '#C48232',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: AURALIS_COLORS.charcoal,
      contrastText: AURALIS_COLORS.warmIvory,
    },
    secondary: {
      main: AURALIS_COLORS.sageGreen,
      contrastText: AURALIS_COLORS.charcoal,
    },
    background: {
      default: AURALIS_COLORS.warmIvory,
      paper: AURALIS_COLORS.cardBg,
    },
    text: {
      primary: AURALIS_COLORS.textPrimary,
      secondary: AURALIS_COLORS.textSecondary,
    },
    divider: AURALIS_COLORS.softGrey,
    success: {
      main: AURALIS_COLORS.positive,
      light: '#E2F3E7',
    },
    error: {
      main: AURALIS_COLORS.negative,
      light: '#FDEAE8',
    },
    warning: {
      main: AURALIS_COLORS.warning,
      light: '#FFF4E5',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: 'var(--font-manrope), sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: AURALIS_COLORS.charcoal,
    },
    h2: {
      fontFamily: 'var(--font-manrope), sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      color: AURALIS_COLORS.charcoal,
    },
    h3: {
      fontFamily: 'var(--font-manrope), sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: AURALIS_COLORS.charcoal,
    },
    h4: {
      fontFamily: 'var(--font-manrope), sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: AURALIS_COLORS.charcoal,
    },
    h5: {
      fontFamily: 'var(--font-manrope), sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: AURALIS_COLORS.charcoal,
    },
    h6: {
      fontFamily: 'var(--font-manrope), sans-serif',
      fontWeight: 600,
      color: AURALIS_COLORS.charcoal,
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: AURALIS_COLORS.textSecondary,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
      color: AURALIS_COLORS.textSecondary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.55,
      color: AURALIS_COLORS.textMuted,
    },
    button: {
      fontFamily: 'var(--font-manrope), sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '10px 22px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          backgroundColor: AURALIS_COLORS.charcoal,
          color: AURALIS_COLORS.warmIvory,
          '&:hover': {
            backgroundColor: AURALIS_COLORS.sageDark,
            color: '#FFFFFF',
          },
        },
        outlinedPrimary: {
          borderColor: AURALIS_COLORS.softGrey,
          color: AURALIS_COLORS.charcoal,
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: AURALIS_COLORS.sageGreen,
            backgroundColor: 'rgba(165, 185, 138, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${AURALIS_COLORS.softGrey}`,
          boxShadow: '0 2px 8px rgba(37, 41, 35, 0.03)',
        },
      },
    },
  },
});

