import { getLinkPreview } from 'link-preview-js';
import React, { useReducer, useRef, useState } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import ShareMenu from 'react-native-share-menu';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import styled, { useTheme } from 'styled-components/native';

import { DisplayType, ListDisplayToggleButton } from '@app/components/lists';
import { MultiDisplayList } from '@app/components/lists/MultiDisplayList';
import { EditBookmarkSheet } from '@app/components/sheets/EditBookmarkSheet';
import { ManualBookmarkSheet } from '@app/components/sheets/ManualBookmarkSheet';
import { useBookmarks } from '@app/hooks/useBookmarks';
import { useHeaderAddButton } from '@app/hooks/useHeaderAddButton';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { useLocalLinks } from '@app/store/localLinks';
import { useUser5ettings } from '@app/store/userSettings';
import { IBookmark } from '@app/types';

import { NewBookmarkSheet } from './components/NewBookmarkSheet';
import { SearchInput } from './components/SearchInput';

// type Props = NativeStackScreenProps<HomeStackParamList, 'Home'> & {};

const EMPTY_ARRAY: IBookmark[] = [];

export const HomeScreen = () => {
  const { colours } = useTheme();

  const loadingLocalLinks = useLocalLinks(state => state.loadingLocalLinks);

  const [bookmarkBeingEdited, setBookmarkBeingEdited] = useState<
    IBookmark | undefined
  >();
  const [loadingNewLinkDetails, setLoadingNewLinkDetails] = useState(false);
  const [newLinkDetails, setNewLinkDetails] = useState<IBookmark | undefined>();

  const defaultHomeToRow = useUser5ettings(
    state => state.settings.defaultHomeToRow,
  );

  const [currentListDisplayType, toggleListDisplayType] = useReducer(
    (_: DisplayType, action: DisplayType) => action,
    defaultHomeToRow ? 'row' : 'grid',
  );

  const searchInputRef = useRef<RNTextInput>();

  const manualBookmarkSheet = useSheetRef();
  const editBookmarkSheet = useSheetRef();
  const newBookmarkSheet = useSheetRef();

  useHeaderAddButton(() => manualBookmarkSheet.present());

  const { isLoading, data: bookmarks, deleteBookmark } = useBookmarks();

  const presentEditBookmarkSheet = (item: IBookmark) => {
    setBookmarkBeingEdited(item);
    editBookmarkSheet.present();
  };

  const handleShare = React.useCallback(
    async (item: any) => {
      if (!item) {
        return;
      }

      const { data } = item;

      const sharedData = data[0]?.data ?? null;

      if (!sharedData) {
        console.error('Error with share', data);
        return;
      }

      setLoadingNewLinkDetails(true);

      const newPreviewDetails = (await getLinkPreview(
        sharedData,
      )) as unknown as IBookmark;

      setNewLinkDetails(newPreviewDetails);

      newBookmarkSheet.present();
    },
    [newBookmarkSheet],
  );

  React.useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, [handleShare]);

  React.useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  return (
    <>
      <ScreenContainer>
        <FiltersContainer>
          <SearchInput ref={searchInputRef as React.Ref<RNTextInput>} />
          <ListDisplayToggleButton
            currentDisplayType={currentListDisplayType}
            onToggleDisplayTypePress={toggleListDisplayType}
          />
          <MaterialIconsIcon
            name="sort"
            color={colours.grey400}
            size={25}
            style={styles.sortIcon}
          />
        </FiltersContainer>
        <MultiDisplayList
          currentListDisplayType={currentListDisplayType}
          data={bookmarks ?? EMPTY_ARRAY}
          loadingBookmarks={isLoading ?? loadingLocalLinks}
          onItemLongPress={presentEditBookmarkSheet}
        />
      </ScreenContainer>
      <ManualBookmarkSheet
        ref={manualBookmarkSheet.sheetRef}
        addBookmarkToList={() => {}}
      />
      {bookmarkBeingEdited ? (
        <EditBookmarkSheet
          ref={editBookmarkSheet.sheetRef}
          bookmarkBeingEdited={bookmarkBeingEdited}
          deleteBookmark={deleteBookmark}
        />
      ) : null}
      <NewBookmarkSheet
        ref={newBookmarkSheet.sheetRef}
        linkDetails={newLinkDetails}
        loadingLinkDetails={loadingNewLinkDetails}
      />
    </>
  );
};

const ScreenContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  background-color: #fafbfc;
`;

const FiltersContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const styles = StyleSheet.create({
  sortIcon: { marginLeft: 10 },
});
