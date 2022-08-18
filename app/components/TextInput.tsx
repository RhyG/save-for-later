import React, { forwardRef, useReducer } from 'react';
import { NativeSyntheticEvent, TextInput as RNTextInput, TextInputFocusEventData, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

export type TextInputProps = {
  error?: boolean;
  errorText?: string;
  containerStyle?: ViewStyle;
} & React.ComponentProps<typeof RNTextInput>;

export const TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const { testID, containerStyle, placeholder, error, ...inputProps } = props;
  const { colours } = useTheme();

  const [inputFocused, toggleInputFocused] = useReducer(focusValue => !focusValue, false);

  return (
    <InputContainer isFocused={inputFocused} style={containerStyle} error={error}>
      <Input
        testID={testID}
        onFocus={toggleInputFocused}
        onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          props?.onBlur?.(e);
          toggleInputFocused();
        }}
        placeholder={placeholder ?? ''}
        // @ts-ignore refs are hard to type :(
        ref={ref}
        placeholderTextColor={colours.grey100}
        {...inputProps}
      />
    </InputContainer>
  );
});

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
