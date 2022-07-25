import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import styled from 'styled-components/native';

import { BaseScreen } from '@app/components/BaseScreen';
import { DismissKeyboardWrapper } from '@app/components/DismissKeyboardWrapper';
import { Text } from '@app/components/Text';
import { TextInput } from '@app/components/TextInput';
import { MAXIMUM_UNAUTHENTICATED_BOOKMARKS } from '@app/lib/constants';

// type Props = NativeStackScreenProps<AccountStackParamList, 'Account'> & {};

export const AccountScreen = () => {
  const emailInputRef = useRef<typeof TextInput>();

  const submitEmail = () => {
    console.log('PRESSED');
  };

  return (
    <BaseScreen>
      <DismissKeyboardWrapper>
        <View style={{ flex: 1 }}>
          <TextInput placeholder="Email address" ref={emailInputRef} />
          <SubmitButton onPress={submitEmail}>
            <Text fontSize="md" color="#fff" bold>
              SUBMIT
            </Text>
          </SubmitButton>
          <Text>
            Due to the small amount of data an app can store on a phone, the
            number of bookmarks you can save without an account is limited to{' '}
            {MAXIMUM_UNAUTHENTICATED_BOOKMARKS}.
          </Text>
          <Text marginTop={2}>
            To create an account, we just need an email so we can tell who owns
            what bookmarks. From there you can create as many bookmarks and
            collections as you like.
          </Text>
        </View>
      </DismissKeyboardWrapper>
    </BaseScreen>
  );
};

const SubmitButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colours.purple100};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`;
