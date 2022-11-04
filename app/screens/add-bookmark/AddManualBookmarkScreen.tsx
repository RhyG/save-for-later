import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getLinkPreview } from 'link-preview-js';
import debounce from 'lodash.debounce';
import React, { useCallback, useReducer, useRef, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { BookmarksAPI } from '@app/api/bookmarks';
import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { Button } from '@app/components/buttons/Button';
import { useBookmarks } from '@app/hooks/useBookmarks';
import { useHeaderTitle } from '@app/hooks/useHeaderTitle';
import { generateBookmarkWithPreviewDetails } from '@app/lib/bookmarks';
import { RootStackParamList } from '@app/navigation/types';
import { useAuth } from '@app/store/auth';
import { IBookmark } from '@app/types';

type ReducerState = {
  preview: Omit<IBookmark, 'id'> | null;
  loading: boolean;
  error: null | string;
};

type ReducerAction =
  | { type: 'PREVIEW_FETCHED'; payload: Omit<IBookmark, 'id'> | null }
  | { type: 'FETCHING_PREVIEW' }
  | { type: 'ERROR_FETCHING_PREVIEW'; payload: string };

const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case 'PREVIEW_FETCHED':
      return { ...state, preview: action.payload, loading: false };
    case 'FETCHING_PREVIEW':
      return { ...state, loading: true };
    case 'ERROR_FETCHING_PREVIEW':
      return { ...state, error: action.payload };
  }
};

const INITIAL_STATE = { loading: false, error: null, preview: null };

export const AddManualBookmarkScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ManualBookmarkScreen'>) => {
  const { colours } = useTheme();

  useHeaderTitle('Add A Bookmark');

  const { refetch } = useBookmarks();

  const session = useAuth(state => state.session);

  const [previewDetails, setPreviewDetails] = useState<any>();

  const [{ preview: _preview, loading, error }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const urlInputRef = useRef<typeof BottomSheetTextInput>();

  const fetchPreviewDetails = useCallback(
    debounce(async (text: string) => {
      dispatch({ type: 'FETCHING_PREVIEW' });
      setPreviewDetails(null);

      const newPreviewDetails = (await getLinkPreview(text)) as unknown as IBookmark;

      if (!newPreviewDetails) {
        dispatch({ type: 'ERROR_FETCHING_PREVIEW', payload: 'No preview details found' });
        return;
      }

      const newBookmark = generateBookmarkWithPreviewDetails(newPreviewDetails, session?.user?.id);

      if (newBookmark?.title && newBookmark?.description) {
        dispatch({ type: 'PREVIEW_FETCHED', payload: newBookmark });
        return;
      }

      dispatch({ type: 'ERROR_FETCHING_PREVIEW', payload: 'Error fetching preview' });
    }, 200),
    [],
  );

  const onAddLinkButtonPress = async () => {
    if (previewDetails) {
      const newBookmark = generateBookmarkWithPreviewDetails(previewDetails, session?.user?.id);

      if (newBookmark) {
        addNewBookmark({ ...newBookmark });
      }
    }
  };

  const addNewBookmark = async (bookmark: Omit<IBookmark, 'id'>) => {
    try {
      await BookmarksAPI.addBookmark(bookmark);
      refetch();
      navigation.goBack();
    } catch (error) {
      // TODO update with more graceful errors when implemented
      console.error(error);
    }
  };

  const preview = {
    collections: [],
    description: 'The Djent community on Reddit. Reddit gives you the best of the internet in one place.',
    number_of_opens: 0,
    preview_image: 'https://styles.redditmedia.com/t5_2s8xc/styles/bannerBackgroundImage_bxvu9y80gwp71.png',
    title: 'r/Djent',
    url: 'https://old.reddit.com/r/Djent/',
    user_id: '735f73ec-2cc9-4066-8f0c-aeb9a3d2f94f',
  };

  return (
    <BaseScreen noScroll>
      <InputContainer isFocused={false}>
        <TextInput
          placeholder="Bookmark URL"
          onChangeText={fetchPreviewDetails}
          // @ts-ignore this type is gross, not sure how to fix
          ref={urlInputRef}
          placeholderTextColor={colours.grey100}
          autoComplete="off"
          autoCorrect={false}
        />
      </InputContainer>
      {!loading && !error ? (
        <>
          <ContentContainer>
            <Text fontSize="lg" bold numberOfLines={2}>
              {preview?.title ?? ''}
            </Text>
            <Text marginTop={2} fontSize="md" secondary numberOfLines={1}>
              {preview?.url ?? ''}
            </Text>
            <Text marginTop={2} fontSize="md" secondary numberOfLines={4}>
              {preview?.description ?? ''}
            </Text>
            <ImageContainer>
              <PreviewImage
                source={{ uri: preview?.preview_image }}
                style={{ flex: 1, marginBottom: 20 }}
                resizeMode="cover"
              />
            </ImageContainer>
          </ContentContainer>
        </>
      ) : (
        <ActivityIndicator animating={loading} />
      )}

      {error ? <Text>{error}</Text> : null}
      <Button onPress={onAddLinkButtonPress} title="Save bookmark" containerStyle={buttonContainerStyle} />
    </BaseScreen>
  );
};

const ContentContainer = styled.View`
  flex: 1;
  padding-top: 20px;
`;

const InputContainer = styled.View<{ isFocused: boolean }>`
  border-radius: 10px;
  border-color: ${({ theme, isFocused }) => (isFocused ? theme.colours.purple100 : theme.colours.grey200)};
  border-width: 2px;
`;

const TextInput = styled.TextInput`
  padding: 10px;
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
