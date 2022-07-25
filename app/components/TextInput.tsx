import React, { Ref, forwardRef, useReducer } from 'react';
import { TextInput as RNTextInput, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

export type TextInputProps = {
  error?: boolean;
  errorText?: string;
  containerStyle?: ViewStyle;
} & React.ComponentProps<typeof RNTextInput>;

export const TextInput = forwardRef(
  (props: TextInputProps, ref: Ref<RNTextInput>) => {
    const { testID, containerStyle, placeholder, error } = props;
    const { colours } = useTheme();

    const [inputFocused, toggleInputFocused] = useReducer(
      focusValue => !focusValue,
      false,
    );

    return (
      <InputContainer
        isFocused={inputFocused}
        style={containerStyle}
        error={error}>
        <Input
          testID={testID}
          onFocus={toggleInputFocused}
          onBlur={toggleInputFocused}
          placeholder={placeholder ?? ''}
          // @ts-ignore refs are hard to type :(
          ref={ref}
          placeholderTextColor={colours.grey100}
        />
      </InputContainer>
    );
  },
);

const Input = styled.TextInput`
  padding: 10px;
`;

const InputContainer = styled.View<{ isFocused: boolean; error?: boolean }>`
  border-radius: 10px;
  border-color: ${({ theme, isFocused, error }) => {
    if (error) {
      return theme.colours.red;
    }

    return isFocused ? theme.colours.purple100 : theme.colours.grey200;
  }};
  /* flex: 1; */
  border-width: 2px;
`;
