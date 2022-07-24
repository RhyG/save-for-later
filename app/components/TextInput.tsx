import React, { Ref, forwardRef, useReducer } from 'react';
import { TextInput as RNTextInput, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

export type TextInputProps = {
  errorText?: string;
  containerStyle?: ViewStyle;
} & React.ComponentProps<typeof RNTextInput>;

export const TextInput = forwardRef(
  ({ testID, containerStyle }: TextInputProps, ref: Ref<RNTextInput>) => {
    const { colours } = useTheme();

    const [inputFocused, toggleInputFocused] = useReducer(
      focusValue => !focusValue,
      false,
    );

    return (
      <InputContainer isFocused={inputFocused} style={containerStyle}>
        <Input
          testID={testID}
          onFocus={toggleInputFocused}
          onBlur={toggleInputFocused}
          placeholder="Search"
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

const InputContainer = styled.View<{ isFocused: boolean }>`
  border-radius: 10px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colours.purple100 : theme.colours.grey200};
  flex: 1;
  border-width: 2px;
`;
