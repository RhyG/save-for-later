import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useReducer, useState } from 'react';
import styled from 'styled-components/native';

import { BookmarksAPI } from '@app/api/bookmarks';
import { CollectionAPI } from '@app/api/collections';
import { BaseScreen } from '@app/components/BaseScreen';
import { Space } from '@app/components/Space';
import { Text } from '@app/components/Text';
import { DisplayType, ListDisplayToggleButton } from '@app/components/lists';
import { MultiDisplayList } from '@app/components/lists/MultiDisplayList';
import { SelectionProvider } from '@app/components/providers/SelectionProvider';
import { EditBookmarkSheet } from '@app/components/sheets/EditBookmarkSheet';
import { ManualBookmarkSheet } from '@app/components/sheets/ManualBookmarkSheet';
import { useHeaderAddButton } from '@app/hooks/useHeaderAddButton';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { CollectionsStackParamList } from '@app/navigation/types';
import { IBookmark } from '@app/types';

import { EditCollectionButton } from './components/EditCollectionButton';
import { EditCollectionSheet } from './components/EditCollectionSheet';
import { useCollection } from './hooks/useCollection';

type Props = NativeStackScreenProps<CollectionsStackParamList, 'Collection'> & {};

export const CollectionScreen = ({ route }: Props) => {
  const collectionId = route.params.id;
  const collectionName = route.params.name;

  const editCollectionSheet = useSheetRef();
  const editBookmarkSheet = useSheetRef();
  const manualBookmarkSheet = useSheetRef();

  const [bookmarkBeingEdited, setBookmarkBeingEdited] = useState<IBookmark | undefined>();

  const {
    collectionInformation,
    bookmarks,
    loadingBookmarks,
    fetchCollection,
    fetchBookmarks,
    removeBookmarkFromCollection,
  } = useCollection(collectionId);

  const [currentListDisplayType, toggleListDisplayType] = useReducer(
    (_: DisplayType, action: DisplayType) => action,
    'grid',
  );

  useHeaderAddButton(() => manualBookmarkSheet.present(), {
    headerTitle: collectionInformation?.name ?? collectionName ?? '',
  });

  const presentEditBookmarkSheet = (item: IBookmark) => {
    setBookmarkBeingEdited(item);
    editBookmarkSheet.present();
  };

  const updateCollection = async ({ newName, newIcon }: { newName?: string; newIcon?: string }) => {
    if (newName) {
      await CollectionAPI.updateCollectionName(collectionId, newName);
    }

    if (newIcon) {
      await CollectionAPI.updateCollectionIcon(collectionId, newIcon);
    }

    editCollectionSheet.dismiss();

    fetchCollection();
  };

  const deleteBookmark = async (id: string) => {
    await BookmarksAPI.deleteBookmark(id);
    fetchCollection();
  };

  const onRemoveFromCollectionPress = async (bookmarkId: string) => {
    try {
      await removeBookmarkFromCollection(bookmarkId);

      fetchBookmarks();
      editBookmarkSheet.dismiss();
    } catch (error) {
      console.error(error);
    }
  };

  const addBookmark = async (bookmark: Omit<IBookmark, 'id'>) => {
    try {
      // Save the bookmark
      const savedBookmark = await BookmarksAPI.addBookmark(bookmark);

      // Add the bookmark to the collection
      await CollectionAPI.addBookmarkToCollection(collectionId, savedBookmark.id);

      fetchCollection();
      manualBookmarkSheet.dismiss();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BaseScreen noPadding>
        <Header>
          <Text fontSize="xxl">{collectionInformation?.icon ?? ''}</Text>
          <BookmarkCountPill>
            <Text bold>{bookmarks?.length ?? ''}</Text>
          </BookmarkCountPill>
          <ListDisplayToggleButton
            currentDisplayType={currentListDisplayType}
            onToggleDisplayTypePress={toggleListDisplayType}
          />
          <Space horizontal units={2} />
          <EditCollectionButton onEditCollectionButtonPress={() => editCollectionSheet.present()} />
        </Header>

        <SelectionProvider>
          <MultiDisplayList
            currentListDisplayType={currentListDisplayType}
            data={bookmarks}
            loadingBookmarks={loadingBookmarks}
            onItemLongPress={presentEditBookmarkSheet}
          />

          {bookmarkBeingEdited ? (
            <EditBookmarkSheet
              ref={editBookmarkSheet.sheetRef}
              bookmarkBeingEdited={bookmarkBeingEdited}
              bookmarkInCollection={true}
              deleteBookmark={deleteBookmark}
              removeBookmarkFromCollection={onRemoveFromCollectionPress}
            />
          ) : null}
        </SelectionProvider>
      </BaseScreen>
      <EditCollectionSheet
        ref={editCollectionSheet.sheetRef}
        updateCollection={updateCollection}
        collectionName={collectionInformation?.name ?? ''}
        collectionIcon={collectionInformation?.icon ?? ''}
      />

      <ManualBookmarkSheet ref={manualBookmarkSheet.sheetRef} addBookmarkToList={addBookmark} />
    </>
  );
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const BookmarkCountPill = styled.View`
  background-color: ${({ theme }) => theme.colours.grey200};
  padding: 3px 8px;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: auto;
`;
