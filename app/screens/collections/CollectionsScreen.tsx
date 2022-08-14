import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  RefreshControl as RNRefreshControl,
} from 'react-native';

import { CollectionAPI } from '@app/api/collections';
import { BaseScreen } from '@app/components/BaseScreen';
import { useCollections } from '@app/hooks/useCollections';
import { useHeaderAddButton } from '@app/hooks/useHeaderAddButton';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { useAuth } from '@app/store/auth';
import { ICollection } from '@app/types';

import { AddCollectionSheet } from './components/AddCollectionSheet';
import { Collection } from './components/Collection';

// type Props = NativeStackScreenProps<
//   CollectionsStackParamList,
//   'Collections'
// > & {};

export const CollectionsScreen = () => {
  const session = useAuth(state => state.session);

  const addCollectionSheetRef = useSheetRef();

  const { data: collections, isLoading, refetch } = useCollections();

  useHeaderAddButton(() => addCollectionSheetRef?.present());

  const onAddCollection = async (name: string, icon: string) => {
    try {
      await CollectionAPI.addCollection(name, icon, session?.user?.id ?? '');

      addCollectionSheetRef?.dismiss();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const onItemLongPress = useCallback(
    async (id: string) => {
      try {
        Alert.alert(
          'Delete collection?',
          'This will permanently delete the collection.',
          [
            {
              text: 'Delete',
              onPress: async () => {
                await CollectionAPI.deleteCollection(id);
                refetch();
              },
              style: 'destructive',
            },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
      } catch (error) {
        console.error(error);
      }
    },
    [refetch],
  );

  const renderCollection: ListRenderItem<ICollection> = useCallback(
    ({ item }) => {
      return (
        <Collection
          name={item.name}
          bookmarkCount={item.bookmark_count}
          id={item.id}
          icon={item.icon}
          onItemLongPress={onItemLongPress}
        />
      );
    },
    [onItemLongPress],
  );

  const RefreshControl = useMemo(
    () => <RNRefreshControl refreshing={isLoading} onRefresh={refetch} />,
    [isLoading, refetch],
  );

  return (
    <BaseScreen>
      <FlatList
        data={collections}
        renderItem={renderCollection}
        refreshing={isLoading}
        refreshControl={RefreshControl}
      />
      <AddCollectionSheet
        ref={addCollectionSheetRef.sheetRef}
        addCollection={onAddCollection}
      />
    </BaseScreen>
  );
};
