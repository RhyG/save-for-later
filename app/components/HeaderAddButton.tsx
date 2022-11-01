import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

import { AddIcon } from './icons';

export const HeaderAddButton = () => {
  const { colours } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ManualBookmarkScreen')}>
      <AddIcon color={colours.grey400} />
    </TouchableOpacity>
  );
};
