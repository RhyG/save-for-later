import React, { useReducer, useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import styled from 'styled-components/native';

import { BookmarksAPI } from '@app/api/bookmarks';
import { DisplayType, ListDisplayToggleButton } from '@app/components/lists';
import { MultiDisplayList } from '@app/components/lists/MultiDisplayList';
import { SortListButton } from '@app/components/lists/SortListButton';
import { EditBookmarkSheet } from '@app/components/sheets/EditBookmarkSheet';
import { ManualBookmarkSheet } from '@app/components/sheets/ManualBookmarkSheet';
import { useBookmarks } from '@app/hooks/useBookmarks';
import { useHeaderAddButton } from '@app/hooks/useHeaderAddButton';
import { useShareIntent } from '@app/hooks/useShareIntent';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { useUser5ettings } from '@app/store/userSettings';
import { IBookmark } from '@app/types';

import { NewBookmarkSheet } from './components/NewBookmarkSheet';
import { SearchInput } from './components/SearchInput';

// type Props = NativeStackScreenProps<HomeStackParamList, 'Home'> & {};

const EMPTY_ARRAY: IBookmark[] = [];

export const HomeScreen = () => {
  const [bookmarkBeingEdited, setBookmarkBeingEdited] = useState<IBookmark | undefined>();
  // const [sortBy, setSortBy] = useState<SortMethod>('newest');

  const defaultHomeToRow = useUser5ettings(state => state.settings.defaultHomeToRow);

  const [currentListDisplayType, toggleListDisplayType] = useReducer(
    (_: DisplayType, action: DisplayType) => action,
    defaultHomeToRow ? 'row' : 'grid',
  );

  const searchInputRef = useRef<RNTextInput>();

  const manualBookmarkSheet = useSheetRef();
  const editBookmarkSheet = useSheetRef();
  const newBookmarkSheet = useSheetRef();

  useHeaderAddButton(() => manualBookmarkSheet.present());

  const { isLoading, data: bookmarks, deleteBookmark, refetch } = useBookmarks();

  const presentEditBookmarkSheet = (item: IBookmark) => {
    setBookmarkBeingEdited(item);
    editBookmarkSheet.present();
  };

  const addNewBookmark = async (bookmark: Omit<IBookmark, 'id'>) => {
    try {
      await BookmarksAPI.addBookmark(bookmark);
      refetch();
      manualBookmarkSheet.dismiss();
    } catch (error) {
      // TODO update with more graceful errors when implemented
      console.error(error);
    }
  };

  const { newBookmarkDetails, loadingNewBookmarkDetails } = useShareIntent(addNewBookmark);

  return (
    <>
      <ScreenContainer>
        <FiltersContainer>
          <SearchInput ref={searchInputRef as React.Ref<RNTextInput>} />
          <ListDisplayToggleButton
            currentDisplayType={currentListDisplayType}
            onToggleDisplayTypePress={toggleListDisplayType}
          />
          <SortListButton onSortMethodPress={() => {}} />
        </FiltersContainer>
        <MultiDisplayList
          currentListDisplayType={currentListDisplayType}
          data={bookmarks ?? EMPTY_ARRAY}
          loadingBookmarks={isLoading}
          onItemLongPress={presentEditBookmarkSheet}
          refreshList={refetch}
        />
      </ScreenContainer>
      <ManualBookmarkSheet ref={manualBookmarkSheet.sheetRef} addNewBookmark={addNewBookmark} />
      {bookmarkBeingEdited ? (
        <EditBookmarkSheet
          ref={editBookmarkSheet.sheetRef}
          bookmarkBeingEdited={bookmarkBeingEdited}
          deleteBookmark={deleteBookmark}
        />
      ) : null}
      <NewBookmarkSheet
        ref={newBookmarkSheet.sheetRef}
        linkDetails={newBookmarkDetails}
        loadingLinkDetails={loadingNewBookmarkDetails}
      />
    </>
  );
};

const ScreenContainer = styled.View`
  flex: 1;
  padding-top: 10px;
`;

const FiltersContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;
