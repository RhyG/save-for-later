import React from 'react';
import { Dimensions, Linking } from 'react-native';
import { SvgUri, SvgXml } from 'react-native-svg';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { ILink } from '@app/models';

const { width } = Dimensions.get('window');
export const GRID_ITEM_WIDTH = width / 2 - 15;

type Props = {
  item: ILink;
  onLongPress: (item: ILink) => void;
};

export const GridListTile = ({ item, onLongPress }: Props): JSX.Element => {
  const { colours } = useTheme();

  const { title, images, description, url } = item;

  const onPreviewPress = () => {
    Linking.openURL(url);
  };

  const image = images[0];

  const isSVG =
    image?.slice(-5).includes('.svg') || image?.includes('image/svg');

  return (
    <PressablePreview
      onPress={onPreviewPress}
      onLongPress={() => onLongPress(item)}>
      {image ? (
        isSVG ? (
          <SVGContainer>
            <SvgUri uri={image} />
          </SVGContainer>
        ) : (
          <PreviewImage
            source={{
              uri: image,
            }}
            accessibilityRole="image"
            resizeMode="cover"
          />
        )
      ) : (
        <NoImage>
          <Text>No image available 😔</Text>
        </NoImage>
      )}
      <ContentContainer>
        <Text
          bold
          numberOfLines={1}
          marginBottom={0.5}
          color={colours.grey400}
          fontSize="sm">
          {title}
        </Text>
        <Text numberOfLines={3} fontSize="xs" style={{ lineHeight: 15 }}>
          {description}
        </Text>
      </ContentContainer>
    </PressablePreview>
  );
};

const PressablePreview = styled.TouchableOpacity`
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: #fff;
  height: ${GRID_ITEM_WIDTH}px;
  width: ${GRID_ITEM_WIDTH}px;
`;

const SVGContainer = styled.View`
  width: ${GRID_ITEM_WIDTH}px;
  flex: 1.5;
  overflow: hidden;
`;

const ContentContainer = styled.View`
  padding: 10px;
  padding-left: 10px;
  padding-left: 10px;
  background-color: #fff;
  flex: 1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colours.grey100};
`;

const PreviewImage = styled.Image`
  width: ${GRID_ITEM_WIDTH}px;
  flex: 1.5;
  align-self: center;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
`;

const NoImage = styled.View`
  width: ${GRID_ITEM_WIDTH}px;
  flex: 1.5;
  align-self: center;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colours.grey100};
  align-items: center;
  justify-content: center;
`;
