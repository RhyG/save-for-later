import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useLayoutEffect } from 'react';

import { HeaderAddButton } from '@app/components/HeaderAddButton';

// Adds a + icon to the header which navigates to the ManualBookmarkScreen on press.
export const useHeaderAddButton = (options?: Record<string, unknown>) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderAddButton />,
      ...options,
    });
  }, [navigation, options]);
};
