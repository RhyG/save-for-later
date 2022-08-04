import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';

type Props = {
  onAddButtonPress: () => void;
};

export const HeaderAddButton = ({ onAddButtonPress }: Props) => {
  const { colours } = useTheme();

  return (
    <TouchableOpacity onPress={onAddButtonPress}>
      <Icon name="plus" color={colours.grey400} size={25} />
    </TouchableOpacity>
  );
};
