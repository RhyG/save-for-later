import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { supabase } from '@app/lib/supabase';
import { CollectionsStackParamList } from '@app/navigation/types';
import { useAuth } from '@app/store/auth';
import { Collection as CollectionType } from '@app/types';

import { AddCollectionButton } from './components/AddCollectionButton';
import { AddCollectionSheet } from './components/AddCollectionSheet';
import { Collection } from './components/Collection';

type Props = NativeStackScreenProps<
  CollectionsStackParamList,
  'Collections'
> & {};

const fetchData = async (): Promise<CollectionType[] | void> => {
  try {
    const { data } = await supabase.from('collections').select();
    return data as CollectionType[];
  } catch (error) {
    console.log(error);
  }
};

export const CollectionsScreen = ({ navigation }: Props) => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const addCollectionSheetRef = useRef<BottomSheetModal>(null);

  const session = useAuth(state => state.session);

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

  React.useEffect(() => {
    (async () => {
      const coll = await fetchData();
      if (coll) {
        setCollections(coll);
      }
    })();
  }, []);

  console.log('GOT THESE:', collections);

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

  const addCollection = async (name: string) => {
    const newCollection = {
      name,
      bookmarks: [],
      user_id: session?.user?.id,
    };

    try {
      const { data, error } = await supabase
        .from('collections')
        .insert([{ ...newCollection }]);

      console.log({ data, error });
    } catch (error) {
      console.log({ error });
    }

    // setCollections(prev => [newCollection, ...prev]);
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
