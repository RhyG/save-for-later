import React from 'react';
import { Dimensions, Linking } from 'react-native';
import { SvgUri } from 'react-native-svg';
import styled, { useTheme } from 'styled-components/native';

import { SelectionIndicator } from '@app/components/SelectionIndicator';
import { Text } from '@app/components/Text';
import { useSelectionsContext } from '@app/components/providers/SelectionProvider';
import { IBookmark } from '@app/types';

const { width } = Dimensions.get('window');
export const GRID_ITEM_WIDTH = width / 2 - 15;

type Props = {
  item: IBookmark;
  onLongPress: (item: IBookmark) => void;
};

export const GridListTile = ({ item, onLongPress }: Props): React.ReactElement => {
  const { colours } = useTheme();

  const { title, preview_image, description, url, id } = item;

  const { selections, selectionsActive, updateSelections } = useSelectionsContext();
  const itemIsSelected = selections.includes(id);

  const onPreviewPress = () => {
    if (selectionsActive) {
      updateSelections(id);
      return;
    }

    Linking.openURL(url);
  };

  const isSVG = preview_image?.slice(-5).includes('.svg') || preview_image?.includes('image/svg');

  return (
    <PressablePreview onPress={onPreviewPress} onLongPress={() => onLongPress(item)}>
      {preview_image ? (
        isSVG ? (
          <SVGContainer>
            <SvgUri uri={preview_image} />
          </SVGContainer>
        ) : (
          <PreviewImage
            source={{
              uri: preview_image,
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
        <Text bold numberOfLines={1} marginBottom={0.5} color={colours.grey400} fontSize="sm">
          {title}
        </Text>
        <Text numberOfLines={3} fontSize="xs" style={{ lineHeight: 15 }}>
          {description}
        </Text>
      </ContentContainer>
      {itemIsSelected ? <SelectionIndicator /> : null}
    </PressablePreview>
  );
};

const PressablePreview = styled.TouchableOpacity`
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: #fff;
  height: ${GRID_ITEM_WIDTH}px;
  width: ${GRID_ITEM_WIDTH}px;
  box-shadow: ${({ theme }) => theme.shadow};
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
