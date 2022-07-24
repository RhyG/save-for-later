import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';

type Props = {
  onAddLinkButtonPress: () => void;
};

export const AddLinkHeaderButton = ({ onAddLinkButtonPress }: Props) => {
  const { colours } = useTheme();

  return (
    <TouchableOpacity onPress={onAddLinkButtonPress}>
      <Icon name="plus" color={colours.grey400} size={25} />
    </TouchableOpacity>
  );
};
