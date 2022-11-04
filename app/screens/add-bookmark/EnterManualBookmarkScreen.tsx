import React from 'react';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { Button } from '@app/components/buttons/Button';

export const EnterManualBookmarkScreen = ({ navigation }) => {
  return (
    <BaseScreen noScroll>
      <Text>ENTER URL</Text>
      <Button
        title="Search"
        onPress={() => navigation.navigate('AddManualBookmarkScreen')}
        containerStyle={{ marginTop: 'auto' }}
      />
    </BaseScreen>
  );
};
