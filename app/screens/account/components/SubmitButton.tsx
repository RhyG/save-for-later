import React from 'react';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';

type Props = {
  onPress: () => void;
  submitting: boolean;
};

export const SubmitButton = ({ onPress, submitting }: Props) => {
  return (
    <StyledSubmitButton onPress={onPress} disabled={submitting}>
      <Text fontSize="md" color="#fff" bold>
        SUBMIT
      </Text>
    </StyledSubmitButton>
  );
};

const StyledSubmitButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colours.grey300 : theme.colours.purple100};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`;
