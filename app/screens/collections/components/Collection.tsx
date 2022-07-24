import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { CollectionScreenNavigationProp } from '@app/navigation/types';

type Props = {
  name: string;
  bookmarkCount: number;
  id: string;
};

const getRandomColour = () => {
  const blue = '#c9d3ff';
  const yellow = '#fef9e0';
  const red = '#fbdbe6';
  const purple = '#bfbde1';

  const coloursList = [blue, yellow, red, purple];

  const randomColour = Math.floor(
    Math.random() * (coloursList.length - 1 - 0 + 1) + 0,
  );

  return coloursList[randomColour];
};

export const Collection = ({ name, bookmarkCount, id }: Props) => {
  const navigation = useNavigation<CollectionScreenNavigationProp>();

  const { colours } = useTheme();

  const onCollectionPress = () => {
    navigation.navigate('Collection', { collectionId: id });
  };

  return (
    <CollectionContainer onPress={onCollectionPress}>
      <CollectionIcon style={{ backgroundColor: getRandomColour() }} />
      <TextContainer>
        <Text marginTop={0.5} fontSize="lg">
          {name}
        </Text>
        <Text color={colours.grey200} fontSize="sm" bold>
          {bookmarkCount > 0 ? `${bookmarkCount} bookmarks` : 'Empty'}
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
  border-color: ${({ theme }) => theme.colours.grey000};
`;

const CollectionIcon = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50px;
`;

const TextContainer = styled.View`
  margin-left: 20px;
`;
