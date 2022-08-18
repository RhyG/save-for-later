import React, { useReducer, useRef, useState } from 'react';
import { Alert, TextInput as RNTextInput } from 'react-native';

import { AccountAPI } from '@app/api/account';
import { BaseScreen } from '@app/components/BaseScreen';
import { DismissKeyboardWrapper } from '@app/components/DismissKeyboardWrapper';
import { Text } from '@app/components/Text';
import { TextInput } from '@app/components/TextInput';
import { MAXIMUM_UNAUTHENTICATED_BOOKMARKS } from '@app/config/constants';
import { validateEmail as _validateEmail } from '@app/lib/validation';

import { CodeInput } from './components/CodeInput';
import { SubmitButton } from './components/SubmitButton';

export const UnauthenticatedScreen = () => {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const emailInputRef = useRef<RNTextInput>();

  const [formState, toggleFormState] = useReducer(() => 'code', 'email');

  const submitEmail = async () => {
    setSubmitting(true);
    try {
      await AccountAPI.signIn(emailInputValue);

      toggleFormState();
    } catch (error) {
      Alert.alert('Error signing in.');
    }
    setSubmitting(false);
  };

  const validateEmail = () => {
    // const isValid = _validateEmail(emailInputRef?.current?.value);
    // console.log({ isValid });
  };

  const submitOTP = async (code: string) => {
    setSubmitting(true);
    // TODO manually set the session in the store here rather than in an effect
    try {
      const res = await AccountAPI.submitOTP(emailInputValue, code);
      console.log(res);
    } catch (error) {
      console.log(error);
      Alert.alert('Error submitting OTP.');
    }
    setSubmitting(false);
  };

  return (
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
            keyboardType="email-address"
            editable={!submitting}
          />
          <SubmitButton onPress={submitEmail} submitting={submitting} />
        </>
      ) : (
        <CodeInput submitCode={submitOTP} submitting={submitting} />
      )}

      <Text>
        Due to the small amount of data an app can store on a phone, the number of bookmarks you can save without an
        account is limited to {MAXIMUM_UNAUTHENTICATED_BOOKMARKS}.
      </Text>
      <Text marginTop={2}>
        To create an account, we just need an email so we can tell who owns what bookmarks. From there you can create as
        many bookmarks and collections as you like.
      </Text>
    </DismissKeyboardWrapper>
  );
};
