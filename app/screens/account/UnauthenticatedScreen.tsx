import React, { useRef, useState } from 'react';
import { Alert, TextInput as RNTextInput } from 'react-native';

import { AccountAPI } from '@app/api/account';
import { BaseScreen } from '@app/components/BaseScreen';
import { DismissKeyboardWrapper } from '@app/components/DismissKeyboardWrapper';
import { Text } from '@app/components/Text';
import { TextInput } from '@app/components/TextInput';
import { MAXIMUM_UNAUTHENTICATED_BOOKMARKS } from '@app/config/constants';
import { validateEmail as _validateEmail } from '@app/lib/validation';

import { SubmitButton } from './components/SubmitButton';

// type Props = NativeStackScreenProps<AccountStackParamList, 'Account'> & {};

type FormState = 'email' | 'code';

export const UnauthenticatedScreen = () => {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [OTP, setOTP] = useState('');
  const [formState, setFormState] = useState<FormState>('email');
  const emailInputRef = useRef<RNTextInput>();

  const submitEmail = async () => {
    try {
      const user = await AccountAPI.signIn(emailInputValue);

      if (user) {
        console.log('HERE', user);
        setFormState('code');
      }
    } catch (error) {
      Alert.alert('Error signing in.');
    }
  };

  const validateEmail = () => {
    const isValid = _validateEmail(emailInputRef?.current?.value);
    console.log({ isValid });
  };

  const submitOTP = async () => {
    // TODO manually set the session in the store here rather than in an effect
    try {
      const res = await AccountAPI.submitOTP(emailInputValue, OTP);
      console.log(res);
    } catch (error) {
      console.log(error);
      Alert.alert('Error submitting OTP.');
    }
  };

  return (
    <BaseScreen>
      <DismissKeyboardWrapper>
        {formState === 'email' ? (
          <>
            <TextInput
              placeholder="Email address"
              onBlur={validateEmail}
              onChangeText={setEmailInputValue}
              value={emailInputValue}
              autoCapitalize="none"
              // @ts-ignore
              ref={emailInputRef}
            />
            <SubmitButton onPress={submitEmail} />
          </>
        ) : (
          <>
            <TextInput placeholder="Code" onChangeText={setOTP} value={OTP} />
            <SubmitButton onPress={submitOTP} />
          </>
        )}

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
      </DismissKeyboardWrapper>
    </BaseScreen>
  );
};
