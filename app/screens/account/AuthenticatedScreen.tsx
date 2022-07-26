import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { supabase } from '@app/lib/supabase';
import { useAuth } from '@app/store/auth';

type Props = {};

export const AuthenticatedScreen = (_: Props) => {
  const session = useAuth(state => state.session);

  console.log(session);

  return (
    <BaseScreen>
      <Text>Authenticated as {session?.user?.email}</Text>
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </BaseScreen>
  );
};
