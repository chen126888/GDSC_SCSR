import { createTheme } from '@mui/material/styles';

let theme = createTheme();

export const courseSelectThemeLightOne = createTheme(theme, {
  ...theme,
  palette: {
    type: 'light',
    primary: {
      main: '#7188B4',
      dark: '#7188B4',
      light: '#7188B4',
    },
    antiPrimary: {
      main: '#F0F0F0',
      dark: '#F0F0F0',
      light: '#F0F0F0',
      contrastText: '#7188B4',
    },
    secondary: {
      main: '#CEC3B3',
      light: '#CEC3B3',
      dark: '#CEC3B3',
      contrastText: '#4F4F4F',
    },
    background: {
      default: '#F0F0F0',
      paper: '#F0F0F0',
    },
    success: {
      main: '#6E9B6D',
      light: '#6E9B6D',
      dark: '#6E9B6D',
    },
    error: {
      main: '#CE5E5E',
      light: '#CE5E5E',
      dark: '#CE5E5E',
    },
    text: {
      primary: '#2D2D2D',
      disabled: '#B9B9B9',
      secondary: '#7188B4',
      hint: '#4F4F4F',
    },
    info: {
      main: '#E0E0E0',
      light: '#E0E0E0',
      dark: '#E0E0E0',
      contrastText: '#4F4F4F',
    },
    disabled: {
      main: '#B0B0B0'
    },
  },
  typography: {
    fontFamily: 'Noto Sans',
    h1: {
      fontSize: 36,
      lineHeight: 1.5,
      fontWeight: 700,
    },
    h2: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.5,
    },
    /**
     * Frame Title, Header Title, Hedaer List Item
     */
    h3: {
      fontSize: 30,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    /**
     * 課程清單 課程名稱
     */
    h4: {
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 1.3,
    },
    /**
     * 登記課表 課程方塊 課程名稱
     */
    subtitle1: {
      fontWeight: 300,
      lineHeight: 1.45,
      fontSize: 20,
    },
    /**
     * 課程清單 其他項目
     */
    subtitle2: {
      fontSize: 15,
      fontWeight: 300,
      lineHeight: 1.2,
    },
    /**
     * 登記課表 課程方塊 老師名稱
     */
    h5: {
      fontSize: 25,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    /**
     * 表格標題
     */
  },
  props: {
    MuiAppBar: {
      backgroundColor: 'transparent',
    },
  },
  shadows: {
    ...theme.shadows,
    frameInner: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    frame: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
    none: 'none !important'
  },
});