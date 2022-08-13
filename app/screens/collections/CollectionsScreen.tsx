import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl as RNRefreshControl,
} from 'react-native';

import { CollectionAPI } from '@app/api/collections';
import { BaseScreen } from '@app/components/BaseScreen';
import { useCollections } from '@app/hooks/useCollections';
import { CollectionsStackParamList } from '@app/navigation/types';
import { useAuth } from '@app/store/auth';
import { ICollection } from '@app/types';

import { AddCollectionSheet } from './components/AddCollectionSheet';
import { Collection } from './components/Collection';
import { HeaderAddButton } from './components/HeaderAddButton';

type Props = NativeStackScreenProps<
  CollectionsStackParamList,
  'Collections'
> & {};

const renderCollection: ListRenderItem<ICollection> = ({ item }) => {
  return (
    <Collection
      name={item.name}
      bookmarkCount={item.bookmark_count}
      id={item.id}
      icon={item.icon}
    />
  );
};

export const CollectionsScreen = ({ navigation }: Props) => {
  const session = useAuth(state => state.session);

  const addCollectionSheetRef = useRef<BottomSheetModal>(null);

  const { data: collections, isLoading, refetch } = useCollections();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderAddButton
          onAddButtonPress={() => addCollectionSheetRef?.current?.present()}
        />
      ),
    });
  }, [navigation]);

  const onAddCollection = async (name: string, icon: string) => {
    try {
      await CollectionAPI.addCollection(name, icon, session?.user?.id ?? '');

      addCollectionSheetRef?.current?.dismiss();
    } catch (error) {
      console.error(error);
    }
  };

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
        ref={addCollectionSheetRef}
        addCollection={onAddCollection}
      />
    </BaseScreen>
  );
};
