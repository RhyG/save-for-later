import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { CollectionAPI } from '@app/api/collections';
import { Text } from '@app/components/Text';
import { useCollections } from '@app/hooks/useCollections';
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

      for await (const { id } of collectionsToUpdate) {
        await CollectionAPI.addBookmarkToCollection(id, bookmarkId);
      }

      setSelectedCollections([]);
      ref?.current?.dismiss?.();
    };

    // Omit any collections that already contain the bookmark from the list
    const filteredCollections = useMemo(() => {
      return collections?.filter(
        collection => !collection.bookmarks.includes(bookmarkId),
      );
    }, [collections, bookmarkId]);

    return (
      <BottomSheet ref={ref} sheetTitle="Choose collection">
        <BottomSheetFlatList
          data={filteredCollections}
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
