import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';
import { IBookmark } from '@app/types';

type Props = { item: IBookmark; onItemLongPress: (item: IBookmark) => void };

export const RowListItemV3 = ({ item, onItemLongPress }: Props) => {
  const { title, description, url, preview_image } = item;

  const isSVG = preview_image?.slice(-5).includes('.svg') || preview_image?.includes('image/svg');

  const openLink = () => {
    Linking.openURL(url);
  };

  return (
    <RowContainer onLongPress={() => onItemLongPress(item)} onPress={openLink}>
      {preview_image ? (
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
      <TextContainer>
        <Text marginBottom={1} bold numberOfLines={1}>
          {title}
        </Text>
        <Text numberOfLines={3} fontSize="xs">
          {description}
        </Text>
      </TextContainer>
    </RowContainer>
  );
};

const RowContainer = styled.TouchableOpacity`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  /* border: 1px solid red; */
  border-color: ${({ theme }) => theme.colours.grey100};
  border-width: 1.5px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const TextContainer = styled.View`
  flex: 3.5;
  padding-left: 10px;
`;

const ImageContainer = styled.View`
  flex: 1.5;
  height: 100px;
`;

const TempImage = styled.View`
  height: 40px;
  width: 40px;
  background-color: #fff;
`;

const PreviewImage = styled.Image`
  height: 100px;
  width: 100%;
  align-self: center;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
`;
