import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { ILink } from '@app/models';

import { ListEmptyComponent } from '../ListEmptyComponent';
import { LoadingComponent } from '../LoadingComponent';
import { GRID_ITEM_WIDTH, GridListTile } from './GridListTile';

type Props = {
  data: ILink[];
  loadingLinks: boolean;
  onItemLongPress: (item: ILink) => void;
};

const getItemLayout = (_: ILink[] | null | undefined, index: number) => ({
  length: GRID_ITEM_WIDTH,
  offset: GRID_ITEM_WIDTH * index,
  index,
});

const keyExtractor = (item: ILink) => item.id;

export const GridList = ({ data, loadingLinks, onItemLongPress }: Props) => {
  const renderItem = useCallback<ListRenderItem<ILink>>(
    ({ item }) => <GridListTile item={item} onLongPress={onItemLongPress} />,
    [onItemLongPress],
  );

  const EmptyComponent = useMemo(() => {
    if (data.length === 0 && loadingLinks) {
      return LoadingComponent;
    }

    return ListEmptyComponent;
  }, [loadingLinks, data.length]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
      columnWrapperStyle={COLUMN_WRAPPER_STYLE}
      numColumns={2}
      initialNumToRender={8}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyComponent}
    />
  );
};

const COLUMN_WRAPPER_STYLE = {
  justifyContent: 'space-between',
  paddingHorizontal: 10,
} as const;
