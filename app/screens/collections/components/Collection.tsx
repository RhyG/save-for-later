import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { CollectionScreenNavigationProp } from '@app/navigation/types';

type Props = {
  name: string;
  bookmarkCount: number;
  id: string;
  icon: string;
};

const getFormattedBookmarkCount = (count: number) => {
  const hasBookmarks = count > 0;
  return hasBookmarks ? `${count} bookmark${count > 1 ? 's' : ''}` : 'Empty';
};

export const Collection = ({ name, bookmarkCount, id, icon }: Props) => {
  const navigation = useNavigation<CollectionScreenNavigationProp>();

  const { colours } = useTheme();

  const onCollectionPress = () => {
    navigation.navigate('Collection', { id, name });
  };

  return (
    <CollectionContainer onPress={onCollectionPress}>
      <IconContainer>
        <Text fontSize="lg">{icon}</Text>
      </IconContainer>
      <TextContainer>
        <Text marginTop={0.5} fontSize="lg">
          {name}
        </Text>
        <Text color={colours.grey200} fontSize="sm" bold marginTop={0.5}>
          {getFormattedBookmarkCount(bookmarkCount)}
        </Text>
      </TextContainer>
    </CollectionContainer>
  );
};

const CollectionContainer = styled.TouchableOpacity`
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  /* border-color: ${({ theme }) => theme.colours.grey000}; */
  border-color: #eef1f5;
  background-color: #fff;
`;

const IconContainer = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  /* background-color: ${({ theme }) => theme.colours.grey000}; */
  /* background-color: ${({ theme }) => theme.colours.grey000}; */
  align-items: center;
  justify-content: center;
  border-color: #ebf0f3;
  /* border-width: 2px; */
`;

const TextContainer = styled.View`
  margin-left: 5px;
`;
