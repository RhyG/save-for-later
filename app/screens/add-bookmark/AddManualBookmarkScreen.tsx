import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';

import { BookmarksAPI } from '@app/api/bookmarks';
import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { Button } from '@app/components/buttons/Button';
import { useBookmarks } from '@app/hooks/useBookmarks';
import { useHeaderTitle } from '@app/hooks/useHeaderTitle';
import { RootStackParamList } from '@app/navigation/types';
import { useAuth } from '@app/store/auth';
import { IBookmark } from '@app/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddManualBookmarkScreen'>;

export const AddManualBookmarkScreen = ({ navigation, route }: Props) => {
  const newBookmark = route.params.bookmark;

  useHeaderTitle('Add A Bookmark');

  const { refetch } = useBookmarks();

  const session = useAuth(state => state.session);

  const onAddLinkButtonPress = async () => {
    if (!session?.user?.id) {
      return;
    }

    if (newBookmark) {
      addNewBookmark({ ...newBookmark, user_id: session.user.id });
    }
  };

  const addNewBookmark = async (bookmark: Omit<IBookmark, 'id'>) => {
    try {
      await BookmarksAPI.addBookmark(bookmark);
      refetch();
      navigation.navigate('HomeTab');
    } catch (error) {
      // TODO update with more graceful errors when implemented
      console.error(error);
    }
  };

  return (
    <BaseScreen noScroll>
      <ContentContainer>
        <Text fontSize="lg" bold numberOfLines={2}>
          {newBookmark.title}
        </Text>
        <Text marginTop={2} fontSize="md" secondary numberOfLines={1}>
          {newBookmark.url}
        </Text>
        <Text marginTop={2} fontSize="md" secondary numberOfLines={4}>
          {newBookmark.description}
        </Text>
        <ImageContainer>
          <PreviewImage
            source={{ uri: newBookmark.preview_image }}
            style={{ flex: 1, marginBottom: 20 }}
            resizeMode="cover"
          />
        </ImageContainer>
      </ContentContainer>

      <Button onPress={onAddLinkButtonPress} title="Save bookmark" containerStyle={buttonContainerStyle} />
    </BaseScreen>
  );
};

const ContentContainer = styled.View`
  flex: 1;
  padding-top: 20px;
`;

const ImageContainer = styled.View`
  height: 200px;
  margin-top: 20px;
`;

const PreviewImage = styled.Image`
  width: 100%;
  flex: 1;
  align-self: center;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const buttonContainerStyle = { marginTop: 'auto' };
