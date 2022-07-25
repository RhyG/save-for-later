import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getLinkPreview } from 'link-preview-js';
import React, { useLayoutEffect, useReducer, useRef, useState } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import ShareMenu from 'react-native-share-menu';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import styled, { useTheme } from 'styled-components/native';

import { EditLinkSheet } from '@app/components/EditLinkSheet';
import { GridList, RowList } from '@app/components/lists';
import { ILink } from '@app/models';
import { HomeStackParamList } from '@app/navigation/types';
import { useLocalLinks } from '@app/store/localLinks';
import { useUser5ettings } from '@app/store/userSettings';

import { AddLinkHeaderButton } from './components/AddLinkHeaderButton';
import {
  DisplayType,
  ListDisplayToggleButton,
} from './components/ListDisplayToggleButton';
import { ManualLinkSheet } from './components/ManualLinkSheet';
import { NewLinkSheet } from './components/NewLinkSheet';
import { SearchInput } from './components/SearchInput';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'> & {};

export const HomeScreen = ({ navigation }: Props) => {
  const { colours } = useTheme();
  const localLinks = useLocalLinks(state => state.localLinks);
  const loadingLocalLinks = useLocalLinks(state => state.loadingLocalLinks);

  const [linkBeingEdited, setLinkBeingEdited] = useState<ILink | undefined>();
  const [loadingNewLinkDetails, setLoadingNewLinkDetails] = useState(false);
  const [newLinkDetails, setNewLinkDetails] = useState();

  const defaultHomeToList = useUser5ettings(
    state => state.settings.defaultHomeToList,
  );

  const [currentListDisplayType, toggleListDisplayType] = useReducer(
    (_: DisplayType, action: DisplayType) => action,
    defaultHomeToList ? 'list' : 'grid',
  );

  const searchInputRef = useRef<RNTextInput>();
  const manualLinkSheetRef = useRef<BottomSheetModal>(null);
  const editLinkSheetRef = useRef<BottomSheetModal>(null);
  const newLinkSheetRef = useRef<BottomSheetModal>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddLinkHeaderButton
          onAddLinkButtonPress={() => manualLinkSheetRef?.current?.present()}
        />
      ),
    });
  }, [navigation]);

  const presentEditLinkSheet = (item: ILink) => {
    setLinkBeingEdited(item);
    editLinkSheetRef?.current?.present();
  };

  const handleShare = React.useCallback(async (item: any) => {
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

    const newPreviewDetails = await getLinkPreview(sharedData);

    setNewLinkDetails(newPreviewDetails);

    newLinkSheetRef?.current?.present();
  }, []);

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
        {currentListDisplayType === 'grid' ? (
          <GridList
            data={localLinks}
            loadingLinks={loadingLocalLinks}
            onItemLongPress={presentEditLinkSheet}
          />
        ) : (
          <RowList
            data={localLinks}
            loadingLinks={loadingLocalLinks}
            onItemLongPress={presentEditLinkSheet}
          />
        )}
      </ScreenContainer>
      <ManualLinkSheet ref={manualLinkSheetRef} />
      {linkBeingEdited ? (
        <EditLinkSheet
          ref={editLinkSheetRef}
          linkBeingEdited={linkBeingEdited}
        />
      ) : null}
      <NewLinkSheet
        ref={newLinkSheetRef}
        linkDetails={newLinkDetails}
        loadingLinkDetails={loadingNewLinkDetails}
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
  margin-bottom: 20px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const styles = StyleSheet.create({
  sortIcon: { marginLeft: 10 },
});
