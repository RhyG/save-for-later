import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useLayoutEffect } from 'react';

import { HeaderAddButton } from '@app/components/HeaderAddButton';

// Adds a + icon to the header.
export const useHeaderAddCollectionButton = (onPress: () => void) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderAddButton onPress={onPress} />,
    });
  }, [navigation, onPress]);
};
