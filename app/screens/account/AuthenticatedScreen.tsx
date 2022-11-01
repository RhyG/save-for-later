import React from 'react';
import { Alert, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { AccountAPI } from '@app/api/account';
import { Space } from '@app/components/Space';
import { Text } from '@app/components/Text';
import { useAuth } from '@app/store/auth';

import { SubmitButton } from './components/SubmitButton';
import { useAccountStats } from './hooks/useAccountStats';

export const AuthenticatedScreen = () => {
  const { colours } = useTheme();
  const session = useAuth(state => state.session);

  const { numberOfCollections, numberOfBookmarks } = useAccountStats();

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

  // This state shouldn't be possible, but the guard is to satisfy TypeScript.
  if (!session || !session.user) {
    return null;
  }

  return (
    <>
      <StatContainer>
        <Text color={colours.grey300} fontSize="md" marginBottom={1}>
          Signed in as
        </Text>
        <Text fontSize="xl" bold>
          {session.user.email}
        </Text>
      </StatContainer>
      <Space units={6} />
      <StatsContainer>
        <StatContainer>
          <Text color={colours.grey300} fontSize="md" marginBottom={1}>
            Bookmarks
          </Text>
          <Text fontSize="xxl" bold>
            {numberOfBookmarks}
          </Text>
        </StatContainer>
        <Divider />
        <StatContainer>
          <Text color={colours.grey300} fontSize="md" marginBottom={1}>
            Collections
          </Text>
          <Text fontSize="xxl" bold>
            {numberOfCollections}
          </Text>
        </StatContainer>
      </StatsContainer>
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

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const StatContainer = styled.View`
  align-items: center;
`;

const Divider = styled.View`
  width: 1px;
  height: 100%;
  background-color: black;
  opacity: 0.2;
`;

const DeleteAccountButton = styled.TouchableOpacity`
  align-self: center;
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`;
