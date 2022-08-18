import { Platform } from 'react-native';
import { DefaultTheme } from 'styled-components';

const SPACING_SIZE = 5;

const grey = {
  grey000: '#f4f4f4',
  grey100: '#dcdcdc',
  grey200: '#c4c4c4',
  grey300: '#7c7c7c',
  grey400: '#323232',
};

const purple = {
  purple100: '#4c4f95',
  purple200: '#0E121A',
};

export const colours = {
  green: '#3ECF8E',
  offWhite: '#f5f5f5',
  darkBlue: '#2D3E4E',
  red: '#dc3545',
  ...grey,
  ...purple,
};

export const HeaderStyle = {
  shadowColor: 'transparent',
  elevation: 0,
  borderBottomWidth: 0,
  borderWidth: 0,
  shadowOffset: { height: 0, width: 0 },
};

export const StyledComponentsFonts = {
  size: {
    xs: '12px',
    sm: '14px',
    md: '15px',
    lg: '17px',
    xl: '19px',
    xxl: '22px',
    xxxl: '30px',
  },
  weight: {
    regular: 400,
    bold: Platform.select({
      default: 600,
      android: 700,
    }),
    extraBold: Platform.select({
      default: 700,
      android: 700,
    }),
  },
};

export const BORDER_RADIUS = '10px';

export const StyledComponentsTheme: DefaultTheme = {
  borderRadius: BORDER_RADIUS,
  spacing: (...units: number[]) => `${units.map(u => u * SPACING_SIZE).join('px ')}px`,
  pixelsToSpacing: (pixels: number) => pixels / SPACING_SIZE,
  font: StyledComponentsFonts,
  colours,
  utils: {
    numbersToPixels: (...units: any[]) => units.map(unit => (typeof unit === 'number' ? `${unit}px` : unit)).join(' '),
  },
};
