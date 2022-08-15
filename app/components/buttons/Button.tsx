import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '../Text';

type ButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
};

export const Button = ({
  title,
  onPress,
  disabled,
  containerStyle,
}: ButtonProps) => {
  return (
    <StyledButton onPress={onPress} disabled={disabled} style={containerStyle}>
      <Text fontSize="md" color="#fff" bold>
        {title}
      </Text>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colours.grey300 : theme.colours.purple100};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`;
