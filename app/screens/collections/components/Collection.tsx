import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import { SelectionIndicator } from '@app/components/SelectionIndicator';
import { Text } from '@app/components/Text';
import { CollectionScreenNavigationProp } from '@app/navigation/types';

type Props = {
  name: string;
  bookmarkCount: number;
  id: string;
  icon: string;
  onItemLongPress: (id: string) => void;
  collectionSelected: boolean;
  currentlySelectingCollections: boolean;
};

const getFormattedBookmarkCount = (count: number) => {
  const hasBookmarks = count > 0;
  return hasBookmarks ? `${count} bookmark${count > 1 ? 's' : ''}` : 'Empty';
};

const _Collection = ({
  name,
  bookmarkCount,
  id,
  icon,
  onItemLongPress,
  collectionSelected,
  currentlySelectingCollections,
}: Props) => {
  const navigation = useNavigation<CollectionScreenNavigationProp>();

  const { colours } = useTheme();

  const onCollectionPress = () => {
    navigation.navigate('Collection', { id, name });
  };

  const onPress = () => {
    currentlySelectingCollections ? onItemLongPress(id) : onCollectionPress();
  };

  return (
    <CollectionContainer onPress={onPress} onLongPress={() => onItemLongPress(id)}>
      <IconContainer>
        <Text fontSize="xxl">{icon}</Text>
      </IconContainer>
      <TextContainer>
        <Text marginTop={0.5} fontSize="lg">
          {name}
        </Text>
        <Text color={colours.grey300} fontSize="sm" bold marginTop={0.5}>
          {getFormattedBookmarkCount(bookmarkCount)}
        </Text>
      </TextContainer>
      {collectionSelected ? <SelectionIndicator /> : null}
    </CollectionContainer>
  );
};

const CollectionContainer = styled.TouchableOpacity`
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px;
  flex-direction: row;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow};
  border-color: #eef1f5;
  background-color: #fff;
`;

const IconContainer = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  border-color: #ebf0f3;
`;

const TextContainer = styled.View`
  margin-left: 5px;
`;

export const Collection = React.memo(_Collection);
