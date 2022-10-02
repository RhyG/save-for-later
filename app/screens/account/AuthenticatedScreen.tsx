import React from 'react';
import { Alert, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { AccountAPI } from '@app/api/account';
import { Text } from '@app/components/Text';
import { useAuth } from '@app/store/auth';

import { SubmitButton } from './components/SubmitButton';

export const AuthenticatedScreen = () => {
  const { colours } = useTheme();
  const session = useAuth(state => state.session);

  const onDeleteAccountButtonPress = async () => {
    Alert.alert(
      'Delete acount?',
      'This will permanently delete your account, including all bookmarks and collections.',
      [
        {
          text: 'Delete',
          onPress: async () => {
            await AccountAPI.deleteAccount();
          },
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  return (
    <>
      <Text>Authenticated as {session?.user?.email}</Text>
      <View style={{ marginTop: 'auto' }} />
      <SubmitButton onPress={AccountAPI.signOut} title="Sign out" />
      <DeleteAccountButton onPress={onDeleteAccountButtonPress}>
        <Text align="center" color={colours.red}>
          Delete account
        </Text>
      </DeleteAccountButton>
    </>
  );
};

const DeleteAccountButton = styled.TouchableOpacity`
  align-self: center;
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`;
