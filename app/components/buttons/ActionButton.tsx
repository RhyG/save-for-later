import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const ActionButton = ({ onPress, children }: React.PropsWithChildren<{ onPress: () => void }>) => {
  return <Button onPress={onPress}>{children}</Button>;
};

const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colours.purple100};
  padding: 10px 10px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
  min-width: 50px;
`;
