import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AccountAPI } from '@app/api/account';
import { Text } from '@app/components/Text';
import { useAuth } from '@app/store/auth';

import { SubmitButton } from './components/SubmitButton';

export const AuthenticatedScreen = () => {
  const session = useAuth(state => state.session);

  return (
    <>
      <Text>Authenticated as {session?.user?.email}</Text>
      <View style={{ marginTop: 'auto' }} />
      <SubmitButton onPress={AccountAPI.signOut} title="SIGN OUT" />
    </>
  );
};
