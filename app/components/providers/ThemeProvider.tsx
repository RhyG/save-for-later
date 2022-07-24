import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components/native';

import { StyledComponentsTheme } from '@app/config/themes';

export const ThemeProvider = ({
  children,
}: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => (
  <StyledComponentsThemeProvider theme={StyledComponentsTheme}>
    {children}
  </StyledComponentsThemeProvider>
);
