import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';
import { useCollections } from '@app/hooks/useCollections';
import { supabase } from '@app/lib/supabase';
import { ICollection } from '@app/types';

import { BottomSheet } from './BottomSheet';

type Props = {
  bookmarkId: string;
};

const keyExtractor = (collection: ICollection) => collection.id;

export const ChooseCollectionSheet = forwardRef<BottomSheetModal, Props>(
  ({ bookmarkId }, ref) => {
    const { data: collections } = useCollections();

    const [selectedCollections, setSelectedCollections] = useState<string[]>(
      [],
    );

    const renderCollection: ListRenderItem<ICollection> = ({ item }) => (
      <CollectionContainer
        onPress={() => setSelectedCollections(curr => [...curr, item.id])}>
        <Text fontSize="xl">{item.icon}</Text>
        <Text fontSize="lg" marginLeft={2}>
          {item.name}
        </Text>
      </CollectionContainer>
    );

    const save = async () => {
      const collectionsToUpdate = (collections ?? []).filter(coll =>
        selectedCollections.includes(coll.id),
      );

      for await (const collection of collectionsToUpdate) {
        const { id, bookmarks, bookmark_count } = collection;

        const { data, error } = await supabase
          .from('collections')
          .update({
            bookmarks: [...bookmarks, bookmarkId],
            bookmark_count: bookmark_count + 1,
          })
          .eq('id', id);

        console.log({ data, error });
      }

      setSelectedCollections([]);
      ref?.current?.dismiss?.();
    };

    return (
      <BottomSheet ref={ref} sheetTitle="Choose collection">
        <BottomSheetFlatList
          data={collections}
          renderItem={renderCollection}
          keyExtractor={keyExtractor}
        />
        <TouchableOpacity onPress={save}>
          <Text>Done</Text>
        </TouchableOpacity>
      </BottomSheet>
    );
  },
);

const CollectionContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`;
