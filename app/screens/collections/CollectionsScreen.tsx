import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { CollectionsStackParamList } from '@app/navigation/types';
import { Collection as CollectionType } from '@app/types';

import { AddCollectionButton } from './components/AddCollectionButton';
import { AddCollectionSheet } from './components/AddCollectionSheet';
import { Collection } from './components/Collection';
import { useCollections } from './hooks/useCollections';

type Props = NativeStackScreenProps<
  CollectionsStackParamList,
  'Collections'
> & {};

export const CollectionsScreen = ({ navigation }: Props) => {
  const addCollectionSheetRef = useRef<BottomSheetModal>(null);

  const { fetchCollections, collections, addCollection } = useCollections();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddCollectionButton
          onAddCollectionButtonPress={() =>
            addCollectionSheetRef?.current?.present()
          }
        />
      ),
    });
  }, [navigation]);

  const renderCollection: ListRenderItem<CollectionType> = useCallback(
    ({ item }) => {
      return (
        <Collection
          name={item.name}
          bookmarkCount={item.bookmarkCount}
          id={item.id}
        />
      );
    },
    [],
  );

  const onAddCollection = async (name: string) => {
    await addCollection(name);
    addCollectionSheetRef?.current?.dismiss();
  };

  return (
    <BaseScreen>
      <TouchableOpacity onPress={fetchCollections}>
        <Text>Refresh</Text>
      </TouchableOpacity>
      <FlatList data={collections} renderItem={renderCollection} />
      <AddCollectionSheet
        ref={addCollectionSheetRef}
        addCollection={onAddCollection}
      />
    </BaseScreen>
  );
};
