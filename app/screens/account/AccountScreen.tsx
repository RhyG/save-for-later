import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';
import { AccountStackParamList } from '@app/navigation/types';
import { useAuth } from '@app/store/auth';

import { AuthenticatedScreen } from './AuthenticatedScreen';
import { UnauthenticatedScreen } from './UnauthenticatedScreen';

type Props = NativeStackScreenProps<AccountStackParamList, 'Account'> & {};

export const AccountScreen = ({ navigation }: Props) => {
  const session = useAuth(state => state.session);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScreenContainer>
      <HeaderContainer>
        <Text fontSize="md" color="#fff" bold>
          Welcome!
        </Text>
      </HeaderContainer>
      <Sheet>
        {session ? <AuthenticatedScreen /> : <UnauthenticatedScreen />}
      </Sheet>
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View`
  flex: 2;
  background-color: ${({ theme }) => theme.colours.purple100};
`;

const Sheet = styled.View`
  background-color: #fff;
  flex: 2;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
`;

const HeaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
