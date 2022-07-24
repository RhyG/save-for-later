import React from 'react';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { MAXIMUM_UNAUTHENTICATED_BOOKMARKS } from '@app/lib/constants';

// type Props = NativeStackScreenProps<AccountStackParamList, 'Account'> & {};

export const AccountScreen = () => {
  return (
    <BaseScreen>
      <Text>
        Due to the small amount of data an app can store on a phone, the number
        of bookmarks you can save without an account is limited to{' '}
        {MAXIMUM_UNAUTHENTICATED_BOOKMARKS}.
      </Text>
      <Text marginTop={2}>
        To create an account, we just need an email so we can tell who owns what
        bookmarks. From there you can create as many bookmarks and collections
        as you like.
      </Text>
    </BaseScreen>
  );
};
