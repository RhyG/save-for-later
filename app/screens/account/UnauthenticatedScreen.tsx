import React, { useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { BaseScreen } from '@app/components/BaseScreen';
import { DismissKeyboardWrapper } from '@app/components/DismissKeyboardWrapper';
import { Text } from '@app/components/Text';
import { TextInput } from '@app/components/TextInput';
import { MAXIMUM_UNAUTHENTICATED_BOOKMARKS } from '@app/config/constants';
import { supabase } from '@app/lib/supabase';
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
    // 1. Use signIn({ email: '' }) to send a code
    // 2. Use verifyOTP({ token, type: 'magiclink' })

    const res = await supabase.auth.signIn({
      email: emailInputValue,
    });

    console.log({ result: res });

    if (res.error) {
      console.error('Error calling sign in', res.error);
      return;
    }

    setFormState('code');
  };

  const validateEmail = () => {
    const isValid = _validateEmail(emailInputRef?.current?.value);
    console.log({ isValid });
  };

  const submitOTP = async () => {
    console.log('Submitting OTP', OTP);
    const { user, error, session } = await supabase.auth.verifyOTP({
      email: emailInputValue.toLowerCase(),
      token: OTP,
      type: 'magiclink',
    });

    if (error) {
      console.error('Error verifying OTP', error);
    }

    if (user) {
      console.log('SUCCESS!');
      console.log(session);
    }
  };

  React.useEffect(() => {
    console.log('RUNNING');
    supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });
    });
  }, []);

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
