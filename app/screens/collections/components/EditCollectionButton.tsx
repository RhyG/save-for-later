import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';

type Props = {
  onEditCollectionButtonPress: () => void;
};

export const EditCollectionButton = ({
  onEditCollectionButtonPress,
}: Props) => {
  const { colours } = useTheme();

  return (
    <TouchableOpacity onPress={onEditCollectionButtonPress}>
      <Icon name="edit-2" color={colours.grey400} size={22} />
    </TouchableOpacity>
  );
};
