import React, { Ref, forwardRef, useState } from 'react';
import { TextInput as RNTextInput, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { colours } from '@app/config/themes';

export type TextInputProps = {
  errorText?: string;
  containerStyle?: ViewStyle;
} & React.ComponentProps<typeof RNTextInput>;

export const SearchInput = forwardRef(({ testID, containerStyle, ...props }: TextInputProps, ref: Ref<RNTextInput>) => {
  // const inputRef = useRef<RNTextInput>();
  const { colours } = useTheme();

  const [focused, setFocused] = useState(false);

  return (
    <InputContainer isFocused={focused} style={containerStyle}>
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search"
        ref={ref}
        placeholderTextColor={colours.grey100}
      />
    </InputContainer>
  );
});

const Input = styled.TextInput`
  padding: 10px;
`;

const InputContainer = styled.View<{ isFocused: boolean }>`
  border-radius: 10px;
  border-color: ${({ theme, isFocused }) => (isFocused ? theme.colours.purple100 : theme.colours.grey200)};
  flex: 1;
  border-width: 2px;
`;
