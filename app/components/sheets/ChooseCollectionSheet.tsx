import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo, useState } from 'react';
import { ListRenderItem } from 'react-native';
import styled from 'styled-components/native';

import { CollectionAPI } from '@app/api/collections';
import { Text } from '@app/components/Text';
import { useCollections } from '@app/hooks/useCollections';
import { ICollection } from '@app/types';

import { RadioButton } from '../RadioButton';
import { Button } from '../buttons/Button';
import { BottomSheet } from './BottomSheet';

type Props = {
  bookmarkId: string;
};

const keyExtractor = (collection: ICollection) => collection.id;

export const ChooseCollectionSheet = forwardRef<BottomSheetModal, Props>(({ bookmarkId }, ref) => {
  const { data: collections } = useCollections();

  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  const handleCollectionPress = (id: string) => {
    if (selectedCollections.includes(id)) {
      setSelectedCollections(curr => curr.filter(collection => collection !== id));
    } else {
      setSelectedCollections(curr => [...curr, id]);
    }
  };

  const renderCollection: ListRenderItem<ICollection> = ({ item }) => (
    <CollectionContainer onPress={() => handleCollectionPress(item.id)}>
      <Text fontSize="xl">{item.icon}</Text>
      <Text fontSize="lg" marginLeft={2}>
        {item.name}
      </Text>
      <RadioButton
        onPress={() => handleCollectionPress(item.id)}
        selected={selectedCollections.includes(item.id)}
        containerStyle={{ marginLeft: 'auto' }}
      />
    </CollectionContainer>
  );

  const onSavePress = async () => {
    const collectionsToUpdate = (collections ?? []).filter(coll => selectedCollections.includes(coll.id));

    for await (const { id } of collectionsToUpdate) {
      await CollectionAPI.addBookmarkToCollection(id, bookmarkId);
    }

    setSelectedCollections([]);
    ref?.current?.dismiss?.();
  };

  // Omit any collections that already contain the bookmark from the list
  const filteredCollections = useMemo(() => {
    return collections?.filter(collection => !collection.bookmarks.includes(bookmarkId)) ?? [];
  }, [collections, bookmarkId]);

  const customSnapPoints = useMemo(() => {
    const numOfCollections = filteredCollections?.length ?? 0;

    if (numOfCollections <= 4) {
      return ['40%'];
    }

    if (numOfCollections <= 8) {
      return ['60%'];
    }

    return ['75%'];
  }, [filteredCollections.length]);

  return (
    <BottomSheet ref={ref} sheetTitle="Choose collection" customSnapPoints={customSnapPoints}>
      <BottomSheetFlatList
        data={filteredCollections}
        renderItem={renderCollection}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <Button onPress={onSavePress} title="Done" />
    </BottomSheet>
  );
});

const CollectionContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`;
