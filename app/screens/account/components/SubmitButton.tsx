import React from 'react';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';

type Props = {
  onPress: () => void;
};

export const SubmitButton = ({ onPress }: Props) => {
  return (
    <StyledSubmitButton onPress={onPress}>
      <Text fontSize="md" color="#fff" bold>
        SUBMIT
      </Text>
    </StyledSubmitButton>
  );
};

const StyledSubmitButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colours.purple100};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`;
