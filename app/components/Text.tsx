import React from 'react';
import { TextProps as RNTextProps } from 'react-native';
import styled from 'styled-components/native';

import { StyledComponentsTheme } from '@app/config/themes';

export type TextProps = {
  fontSize?: keyof typeof StyledComponentsTheme.font.size;
  bold?: boolean;
  extraBold?: boolean;
  secondary?: boolean;
  error?: boolean;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  opacity?: number;
  wrap?: boolean;
  flex?: number | string;
  width?: number | string;
  letterSpacing?: number;
  uppercase?: boolean;
  capitalize?: boolean;
  textDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  italic?: boolean;
} & RNTextProps;

/**
 * A flexible, theme compliant text component
 */
export const Text = (props: TextProps): JSX.Element => (
  //@ts-ignore can't figure this out
  <TextContainer allowFontScaling={false} {...props} />
);

const TextContainer = styled.Text<TextProps>`
  font-size: ${props => (props.fontSize ? props.theme.font.size[props.fontSize] : props.theme.font.size.sm)};
  font-weight: ${props => {
    if (props.extraBold) {
      return props.theme.font.weight.extraBold;
    }

    if (props.bold) {
      return props.theme.font.weight.bold;
    }

    return props.theme.font.weight.regular;
  }};
  text-align: ${props => props.align ?? 'auto'};
  margin-top: ${props => props.theme.spacing(props.marginVertical || props.marginTop || 0)};
  margin-bottom: ${props => props.theme.spacing(props.marginVertical || props.marginBottom || 0)};
  margin-left: ${props => props.theme.spacing(props.marginHorizontal || props.marginLeft || 0)};
  margin-right: ${props => props.theme.spacing(props.marginHorizontal || props.marginRight || 0)};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  flex: ${props => props.flex || 'none'};
  width: ${props => (props.width ? props.theme.utils.numbersToPixels(props.width) : 'auto')};
  opacity: ${props => props.opacity || 1};
  color: ${props => {
    if (props.color) {
      return props.color;
    }

    if (props.secondary) {
      return props.theme.colours.grey300;
    }

    return props.theme.colours.grey400;
  }};
  letter-spacing: ${props => props.letterSpacing ?? 0.1}px;
  text-transform: ${({ uppercase, capitalize }) => {
    if (uppercase) {
      return 'uppercase';
    }
    if (capitalize) {
      return 'capitalize';
    }
    return 'none';
  }};
  font-style: ${({ italic }) => {
    if (italic) {
      return 'italic';
    }
    return 'normal';
  }};
  text-decoration: ${props => props.textDecoration || 'none'};
`;
