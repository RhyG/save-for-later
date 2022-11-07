import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

import { AddIcon } from './icons';

export const HeaderAddButton = ({ onPress }: { onPress: () => void }) => {
  const { colours } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <AddIcon color={colours.grey400} />
    </TouchableOpacity>
  );
};
