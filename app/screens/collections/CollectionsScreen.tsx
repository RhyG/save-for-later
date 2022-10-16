import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl as RNRefreshControl } from 'react-native';

import { CollectionAPI } from '@app/api/collections';
import { BaseScreen } from '@app/components/BaseScreen';
import { useCollections } from '@app/hooks/useCollections';
import { useHeaderAddButton } from '@app/hooks/useHeaderAddButton';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { showDeleteAlert } from '@app/lib/alerts';
import { useAuth } from '@app/store/auth';
import { ICollection } from '@app/types';

import { AddCollectionSheet } from './components/AddCollectionSheet';
import { Collection } from './components/Collection';
import { SelectionActions } from './components/SelectionActions';

// type Props = NativeStackScreenProps<CollectionsStackParamList, 'Collections'>;

export const CollectionsScreen = () => {
  const session = useAuth(state => state.session);

  const addCollectionSheetRef = useSheetRef();

  const { data: collections, isLoading, refetch } = useCollections();

  const [selectedCollections, setSelectedCollections] = useState<ICollection['id'][]>([]);
  const currentlySelectingCollections = selectedCollections.length > 0;

  useHeaderAddButton(() => addCollectionSheetRef?.present());

  const deleteSelectedCollections = useCallback(async () => {
    const pluralisedCollection = selectedCollections.length > 1 ? 'collections' : 'collection';

    try {
      showDeleteAlert(
        `Delete ${pluralisedCollection}?`,
        `This will permanently delete the ${pluralisedCollection}.`,
        async () => {
          await Promise.all(selectedCollections.map(collectionId => CollectionAPI.deleteCollection(collectionId)));

          setSelectedCollections([]);
          refetch();
        },
      );
    } catch (error) {
      console.error(error);
    }
  }, [selectedCollections, refetch]);

  const onAddCollection = async (name: string, icon: string) => {
    try {
      await CollectionAPI.addCollection(name, icon, session?.user?.id ?? '');

      addCollectionSheetRef?.dismiss();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const updateSelectedCollections = useCallback((collectionId: string) => {
    setSelectedCollections(prevSelectedCollections => {
      if (prevSelectedCollections.some(id => id === collectionId)) {
        return prevSelectedCollections.filter(id => id !== collectionId);
      }

      return [...prevSelectedCollections, collectionId];
    });
  }, []);

  const renderCollection: ListRenderItem<ICollection> = useCallback(
    ({ item }) => {
      return (
        <Collection
          name={item.name}
          bookmarkCount={item.bookmark_count}
          id={item.id}
          icon={item.icon}
          onItemLongPress={updateSelectedCollections}
          collectionSelected={selectedCollections.some(collection => collection === item.id)}
          currentlySelectingCollections={currentlySelectingCollections}
        />
      );
    },
    [selectedCollections, updateSelectedCollections, currentlySelectingCollections],
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
      <SelectionActions
        visible={currentlySelectingCollections}
        onDeletePress={deleteSelectedCollections}
        onCancelPress={() => setSelectedCollections([])}
      />
    </BaseScreen>
  );
};

const listContentContainerStyle = { padding: 10 };
