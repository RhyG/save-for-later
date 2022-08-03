import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { ListRenderItem } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';
import { useCollections } from '@app/hooks/useCollections';
import { supabase } from '@app/lib/supabase';
import { ICollection } from '@app/types';

type Props = {
  bookmarkId: string;
};

const bottomSheetStyle = { zIndex: 2 };

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
);

const SNAP_POINTS = ['30%'];

const keyExtractor = (collection: ICollection) => collection.id;

export const ChooseCollectionSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ bookmarkId }, ref) => {
    // const { bottom: bottomInset } = useSafeAreaInsets();
    // const { colours } = useTheme();

    const { data } = useCollections();

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
      const collectionsToUpdate = (data ?? []).filter(coll =>
        selectedCollections.includes(coll.id),
      );

      for await (const collection of collectionsToUpdate) {
        const { id, bookmarks } = collection;

        const { data, error } = await supabase
          .from('collections')
          .update({ bookmarks: [...bookmarks, bookmarkId] })
          .eq('id', id);

        console.log({ data, error });
      }

      setSelectedCollections([]);
      ref?.current?.dismiss?.();
    };

    return (
      <BottomSheetModal
        index={0}
        snapPoints={SNAP_POINTS}
        ref={ref}
        enablePanDownToClose={true}
        style={bottomSheetStyle}
        backdropComponent={Backdrop}>
        <SheetContainer>
          <BottomSheetFlatList
            data={data}
            renderItem={renderCollection}
            keyExtractor={keyExtractor}
          />
          <TouchableOpacity onPress={save}>
            <Text>Done</Text>
          </TouchableOpacity>
        </SheetContainer>
      </BottomSheetModal>
    );
  },
);

const SheetContainer = styled.View`
  padding: 10px 20px 30px 20px;
  flex: 1;
`;

const CollectionContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`;
