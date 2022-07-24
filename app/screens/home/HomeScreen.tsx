import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useReducer, useRef, useState } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import styled, { useTheme } from 'styled-components/native';

import { EditLinkSheet } from '@app/components/EditLinkSheet';
import { GridList, RowList } from '@app/components/lists';
import { Bookmark, ILink } from '@app/models';
import { HomeStackParamList } from '@app/navigation/types';
import { useLocalLinks } from '@app/store/localLinks';
import { useUser5ettings } from '@app/store/userSettings';

import { AddLinkHeaderButton } from './components/AddLinkHeaderButton';
import {
  DisplayType,
  ListDisplayToggleButton,
} from './components/ListDisplayToggleButton';
import { ManualLinkSheet } from './components/ManualLinkSheet';
import { SearchInput } from './components/SearchInput';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'> & {};

export const HomeScreen = ({ navigation }: Props) => {
  const { colours } = useTheme();
  const localLinks = useLocalLinks(state => state.localLinks);
  const loadingLocalLinks = useLocalLinks(state => state.loadingLocalLinks);

  const [linkBeingEdited, setLinkBeingEdited] = useState<
    Bookmark | undefined
  >();

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
      <EditLinkSheet ref={editLinkSheetRef} linkBeingEdited={linkBeingEdited} />
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
