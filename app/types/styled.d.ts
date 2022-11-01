import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colours: Record<string, string>;
    spacing: (...units: number[]) => string;
    pixelsToSpacing: (pixels: number) => number;
    shadow: string;
    font: {
      size: { [key in FontSize]: string };
      weight: { [key in 'regular' | 'bold' | 'extraBold']: number };
      colour: { primary: string };
    };
    utils: {
      numbersToPixels: (...units: any[]) => string;
    };
  }
}

type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
