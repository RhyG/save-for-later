import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const DEFAULT_ICON_SIZE = 25;
const DEFAULT_ICON_COLOUR = '#fff';

export const DeleteIcon = ({ size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOUR }) => (
  <Icon name="trash-2" color={color} size={size} />
);

export const AddToCollectionIcon = ({ size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOUR }) => (
  <Icon name="folder-plus" color={color} size={size} />
);

export const AddIcon = ({ size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOUR }) => (
  <Icon name="plus" color={color} size={size} />
);
