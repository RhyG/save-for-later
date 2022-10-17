import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

import { AddIcon } from './icons';

type Props = {
  onAddButtonPress: () => void;
};

export const HeaderAddButton = ({ onAddButtonPress }: Props) => {
  const { colours } = useTheme();

  return (
    <TouchableOpacity onPress={onAddButtonPress}>
      <AddIcon color={colours.grey400} />
    </TouchableOpacity>
  );
};
