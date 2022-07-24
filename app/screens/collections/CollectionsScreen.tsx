import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import shortid from 'shortid';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { CollectionsStackParamList } from '@app/navigation/types';
import { Collection as CollectionType } from '@app/types';

import { AddCollectionButton } from './components/AddCollectionButton';
import { AddCollectionSheet } from './components/AddCollectionSheet';
import { Collection } from './components/Collection';

type Props = NativeStackScreenProps<
  CollectionsStackParamList,
  'Collections'
> & {};

export const CollectionsScreen = ({ navigation }: Props) => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const addCollectionSheetRef = useRef<BottomSheetModal>(null);

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

  const addCollection = (name: string) => {
    const newCollection: CollectionType = {
      id: shortid.generate(),
      name,
      bookmarkCount: 0,
      bookmarks: [],
    };

    setCollections(prev => [newCollection, ...prev]);
  };

  console.log(collections);

  return (
    <BaseScreen>
      <Text>Collections</Text>
      <FlatList data={collections} renderItem={renderCollection} />
      <AddCollectionSheet
        ref={addCollectionSheetRef}
        addCollection={addCollection}
      />
    </BaseScreen>
  );
};
