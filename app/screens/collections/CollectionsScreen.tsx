import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, RefreshControl as RNRefreshControl } from 'react-native';

import { CollectionAPI } from '@app/api/collections';
import { BaseScreen } from '@app/components/BaseScreen';
import { SelectionActions } from '@app/components/SelectionActions';
import { Text } from '@app/components/Text';
import { DeleteIcon } from '@app/components/icons';
import { useCollections } from '@app/hooks/useCollections';
import { useHeaderAddButton } from '@app/hooks/useHeaderAddButton';
import { useSelections } from '@app/hooks/useSelections';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { showDeleteAlert } from '@app/lib/alerts';
import { useAuth } from '@app/store/auth';
import { ICollection } from '@app/types';

import { AddCollectionSheet } from './components/AddCollectionSheet';
import { Collection } from './components/Collection';

// type Props = NativeStackScreenProps<CollectionsStackParamList, 'Collections'>;

export const CollectionsScreen = () => {
  const session = useAuth(state => state.session);

  const addCollectionSheetRef = useSheetRef();

  const { data: collections, isLoading, refetch } = useCollections();
  const { selections, selectionsActive, updateSelections, resetSelections } = useSelections();

  useHeaderAddButton();

  const deleteSelectedCollections = useCallback(async () => {
    const pluralisedCollection = selections.length > 1 ? 'collections' : 'collection';

    try {
      showDeleteAlert(
        `Delete ${pluralisedCollection}?`,
        `This will permanently delete the ${pluralisedCollection}.`,
        async () => {
          await Promise.all(selections.map(collectionId => CollectionAPI.deleteCollection(collectionId)));

          resetSelections();
          refetch();
        },
      );
    } catch (error) {
      console.error(error);
    }
  }, [refetch, selections, resetSelections]);

  const onAddCollection = async (name: string, icon: string) => {
    try {
      await CollectionAPI.addCollection(name, icon, session?.user?.id ?? '');

      addCollectionSheetRef?.dismiss();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const renderCollection: ListRenderItem<ICollection> = useCallback(
    ({ item }) => {
      return (
        <Collection
          name={item.name}
          bookmarkCount={item.bookmark_count}
          id={item.id}
          icon={item.icon}
          onItemLongPress={updateSelections}
          collectionSelected={selections.some(collection => collection === item.id)}
          currentlySelectingCollections={selectionsActive}
        />
      );
    },
    [selections, updateSelections, selectionsActive],
  );

  const RefreshControl = useMemo(
    () => <RNRefreshControl refreshing={isLoading} onRefresh={refetch} />,
    [isLoading, refetch],
  );

  return (
    <BaseScreen noPadding>
      <FlatList
        data={collections}
        renderItem={renderCollection}
        refreshing={isLoading}
        refreshControl={RefreshControl}
        contentContainerStyle={listContentContainerStyle}
      />

      <AddCollectionSheet ref={addCollectionSheetRef.sheetRef} addCollection={onAddCollection} />

      <SelectionActions visible={selectionsActive}>
        <SelectionActions.Item onPress={deleteSelectedCollections}>
          <DeleteIcon />
        </SelectionActions.Item>
        <SelectionActions.Item onPress={resetSelections}>
          <Text fontSize="sm" bold color="#fff">
            CANCEL
          </Text>
        </SelectionActions.Item>
      </SelectionActions>
    </BaseScreen>
  );
};

const listContentContainerStyle = { padding: 10 };
