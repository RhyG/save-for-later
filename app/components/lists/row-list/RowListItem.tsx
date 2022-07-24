import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';
import { ILink } from '@app/models';

type Props = { item: ILink; onItemLongPress: (item: ILink) => void };

export const RowListItem = ({ item, onItemLongPress }: Props) => {
  const { title, description, url, images } = item;

  const image = images[0];

  const isSVG = image?.slice(-5).includes('.svg');

  const openLink = () => {
    Linking.openURL(url);
  };

  return (
    <RowContainer onLongPress={() => onItemLongPress(item)} onPress={openLink}>
      <TextContainer>
        <Text marginBottom={1} bold numberOfLines={1}>
          {title}
        </Text>
        <Text numberOfLines={3}>{description}</Text>
      </TextContainer>
      <ImageContainer>
        {isSVG ? (
          <TempImage />
        ) : (
          <PreviewImage
            source={{
              uri: image,
            }}
            accessibilityRole="image"
            resizeMode="cover"
          />
        )}
      </ImageContainer>
    </RowContainer>
  );
};

const RowContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colours.grey000};
  margin-bottom: 10px;
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
