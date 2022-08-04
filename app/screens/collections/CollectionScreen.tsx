import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useReducer, useState } from 'react';
import styled from 'styled-components/native';

import { CollectionAPI } from '@app/api/collections';
import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { DisplayType, ListDisplayToggleButton } from '@app/components/lists';
import { MultiDisplayList } from '@app/components/lists/MultiDisplayList';
import { EditBookmarkSheet } from '@app/components/sheets/EditBookmarkSheet';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { CollectionsStackParamList } from '@app/navigation/types';
import { IBookmark } from '@app/types';

import { EditCollectionButton } from './components/EditCollectionButton';
import { EditCollectionSheet } from './components/EditCollectionSheet';
import { HeaderAddButton } from './components/HeaderAddButton';
import { useCollection } from './hooks/useCollection';

type Props = NativeStackScreenProps<
  CollectionsStackParamList,
  'Collection'
> & {};

export const CollectionScreen = ({ route, navigation }: Props) => {
  const collectionId = route.params.id;
  const collectionName = route.params.name;

  const editCollectionSheet = useSheetRef();
  const editBookmarkSheet = useSheetRef();

  const [bookmarkBeingEdited, setBookmarkBeingEdited] = useState<
    IBookmark | undefined
  >();

  const {
    collectionInformation,
    bookmarks,
    loadingBookmarks,
    fetchCollection,
  } = useCollection(collectionId);

  const [currentListDisplayType, toggleListDisplayType] = useReducer(
    (_: DisplayType, action: DisplayType) => action,
    'grid',
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: collectionInformation?.name ?? collectionName ?? '',
      // TODO disable button when loading or no collection info
      headerRight: () => (
        <HeaderAddButton onAddButtonPress={() => console.log('first')} />
      ),
    });
  }, [navigation, collectionName, collectionInformation, editCollectionSheet]); // TODO figure out how to only add collection name and avoid object as dependency

  const presentEditBookmarkSheet = (item: IBookmark) => {
    console.log({ item });
    setBookmarkBeingEdited(item);
    editBookmarkSheet.present();
  };

  const updateCollection = async ({
    newName,
    newIcon,
  }: {
    newName?: string;
    newIcon?: string;
  }) => {
    if (newName) {
      await CollectionAPI.updateCollectionName(collectionId, newName);
    }

    if (newIcon) {
      await CollectionAPI.updateCollectionIcon(collectionId, newIcon);
    }

    editCollectionSheet.dismiss();

    fetchCollection();
  };

  return (
    <>
      <BaseScreen noPadding>
        <Header>
          <Text fontSize="xxl">{collectionInformation?.icon ?? ''}</Text>
          {/* <Text fontSize="lg" marginLeft={2}>
          {collectionInformation?.name ?? ''}
        </Text> */}
          <BookmarkCountPill>
            <Text bold>{bookmarks?.length ?? ''}</Text>
          </BookmarkCountPill>
          <EditCollectionButton
            onEditCollectionButtonPress={() => editCollectionSheet.present()}
          />
          <ListDisplayToggleButton
            currentDisplayType={currentListDisplayType}
            onToggleDisplayTypePress={toggleListDisplayType}
          />
        </Header>
        <MultiDisplayList
          currentListDisplayType={currentListDisplayType}
          data={bookmarks}
          loadingBookmarks={loadingBookmarks}
          onItemLongPress={presentEditBookmarkSheet}
        />
      </BaseScreen>
      <EditCollectionSheet
        ref={editCollectionSheet.sheetRef}
        updateCollection={updateCollection}
        collectionName={collectionInformation?.name ?? ''}
        collectionIcon={collectionInformation?.icon ?? ''}
      />
      {bookmarkBeingEdited ? (
        <EditBookmarkSheet
          ref={editBookmarkSheet.sheetRef}
          bookmarkBeingEdited={bookmarkBeingEdited}
        />
      ) : null}
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
