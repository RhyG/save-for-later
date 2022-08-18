import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';
import { IBookmark } from '@app/types';

type Props = { item: IBookmark; onItemLongPress: (item: IBookmark) => void };

export const RowListItem = ({ item, onItemLongPress }: Props) => {
  const { title, description, url, preview_image } = item;

  const isSVG = preview_image?.slice(-5).includes('.svg') || preview_image?.includes('image/svg');

  const openLink = () => {
    Linking.openURL(url);
  };

  return (
    <RowContainer onLongPress={() => onItemLongPress(item)} onPress={openLink}>
      <TextContainer>
        <Text marginBottom={1} bold numberOfLines={1}>
          {title}
        </Text>
        <Text numberOfLines={3} fontSize="xs">
          {description}
        </Text>
      </TextContainer>
      {!!preview_image ? (
        <ImageContainer>
          {isSVG ? (
            <TempImage />
          ) : (
            <PreviewImage
              source={{
                uri: preview_image,
              }}
              accessibilityRole="image"
              resizeMode="cover"
            />
          )}
        </ImageContainer>
      ) : null}
    </RowContainer>
  );
};

const RowContainer = styled.TouchableOpacity`
  /* background-color: ${({ theme }) => theme.colours.grey000}; */
  border-width: 2px;
  border-color: #ebf0f3;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  flex: 3.5;
`;

const ImageContainer = styled.View`
  flex: 0.5;
  margin-left: 10px;
  align-items: flex-end;
`;

const TempImage = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: #fff;
`;

const PreviewImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  /* flex: 1; */
  align-self: center;
  /* background-color: '#f7f7f8'; */
  border-radius: ${({ theme }) => theme.borderRadius};
`;
