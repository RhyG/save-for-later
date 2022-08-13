import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useLayoutEffect } from 'react';

import { HeaderAddButton } from '@app/components/HeaderAddButton';

export const useHeaderAddButton = (
  onAddButtonPress: () => void,
  additionalOptions: Record<string, unknown>,
) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderAddButton onAddButtonPress={onAddButtonPress} />
      ),
      ...additionalOptions,
    });
  }, [navigation, onAddButtonPress, additionalOptions]);
};
