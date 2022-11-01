import React, { useReducer, useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import styled from 'styled-components/native';

import { DisplayType, ListDisplayToggleButton } from '@app/components/lists';
import { MultiDisplayList } from '@app/components/lists/MultiDisplayList';
import { SortListButton } from '@app/components/lists/SortListButton';
import { SelectionProvider } from '@app/components/providers/SelectionProvider';
import { EditBookmarkSheet } from '@app/components/sheets/EditBookmarkSheet';
import { useBookmarks } from '@app/hooks/useBookmarks';
import { useHeaderAddButton } from '@app/hooks/useHeaderAddButton';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { useUser5ettings } from '@app/store/userSettings';
import { IBookmark } from '@app/types';

import { SearchInput } from './components/SearchInput';

// type Props = NativeStackScreenProps<HomeStackParamList, 'Home'> & {};

const EMPTY_ARRAY: IBookmark[] = [];

export const HomeScreen = () => {
  const [bookmarkBeingEdited, setBookmarkBeingEdited] = useState<IBookmark | undefined>();
  // const [sortBy, setSortBy] = useState<SortMethod>('newest');

  const defaultHomeToRow = useUser5ettings(state => state.settings.defaultHomeToRow);

  useHeaderAddButton();

  const [currentListDisplayType, toggleListDisplayType] = useReducer(
    (_: DisplayType, action: DisplayType) => action,
    defaultHomeToRow ? 'row' : 'grid',
  );

  const searchInputRef = useRef<RNTextInput>();

  const editBookmarkSheet = useSheetRef();

  const { isLoading, data: bookmarks, deleteBookmark, refetch } = useBookmarks();

  const presentEditBookmarkSheet = (item: IBookmark) => {
    setBookmarkBeingEdited(item);
    editBookmarkSheet.present();
  };

  return (
    <>
      <SelectionProvider>
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

        {bookmarkBeingEdited ? (
          <EditBookmarkSheet
            ref={editBookmarkSheet.sheetRef}
            bookmarkBeingEdited={bookmarkBeingEdited}
            deleteBookmark={deleteBookmark}
            onSelectButtonPressed={() => {}}
          />
        ) : null}
      </SelectionProvider>
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
