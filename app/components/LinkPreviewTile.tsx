import * as Linking from 'expo-linking';
import { useCallback } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
export const GRID_ITEM_WIDTH = width / 2 - 20;

type Props = {
  title: string;
  image: string;
  description: string;
  url: string;
};

export const LinkPreviewTile = ({ title, image, description, url }: Props): JSX.Element => {
  const onPreviewPress = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  const isSVG = image?.slice(-5).includes('.svg');

  return (
    <PressablePreview onPress={onPreviewPress}>
      {isSVG ? (
        <View style={{ width: GRID_ITEM_WIDTH, flex: 1.5, overflow: 'hidden' }}>
          <SvgUri uri={image} />
        </View>
      ) : (
        <PreviewImage
          source={{
            uri: image,
          }}
          accessibilityRole="image"
          resizeMode="cover"
        />
      )}
      <ContentContainer>
        <Title numberOfLines={1}>{title}</Title>
        <Text numberOfLines={2}>{description}</Text>
      </ContentContainer>
    </PressablePreview>
  );
};

const PressablePreview = styled.TouchableOpacity`
  margin-bottom: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: #fff;
  height: ${GRID_ITEM_WIDTH}px;
  width: ${GRID_ITEM_WIDTH}px;
`;

const ContentContainer = styled.View`
  padding: 10px;
  background-color: #fff;
  flex: 1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Title = styled.Text`
  font-weight: bold;
  margin-bottom: 10px;
`;

const PreviewImage = styled.Image`
  width: ${GRID_ITEM_WIDTH}px;
  flex: 1.5;
  align-self: center;
  /* background-color: '#f7f7f8'; */
  border-radius: ${({ theme }) => theme.borderRadius};
`;
