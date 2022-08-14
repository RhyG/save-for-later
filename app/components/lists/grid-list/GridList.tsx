import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl as RNRefreshControl,
} from 'react-native';

import { IBookmark } from '@app/types';

import { ListEmptyComponent } from '../ListEmptyComponent';
import { LoadingComponent } from '../LoadingComponent';
import { ListProps } from '../MultiDisplayList';
import { GRID_ITEM_WIDTH, GridListTile } from './GridListTile';

const getItemLayout = (_: IBookmark[] | null | undefined, index: number) => ({
  length: GRID_ITEM_WIDTH,
  offset: GRID_ITEM_WIDTH * index,
  index,
});

const keyExtractor = (item: IBookmark) => item.id;

export const GridList = ({
  data,
  loadingBookmarks,
  onItemLongPress,
  refreshList,
}: ListProps) => {
  const renderItem = useCallback<ListRenderItem<IBookmark>>(
    ({ item }) => <GridListTile item={item} onLongPress={onItemLongPress} />,
    [onItemLongPress],
  );

  const EmptyComponent = useMemo(() => {
    if (data.length === 0 && loadingBookmarks) {
      return LoadingComponent;
    }

    return ListEmptyComponent;
  }, [loadingBookmarks, data.length]);

  const RefreshControl = useMemo(() => {
    return (
      <RNRefreshControl refreshing={loadingBookmarks} onRefresh={refreshList} />
    );
  }, [loadingBookmarks, refreshList]);

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
      refreshing={loadingBookmarks}
      refreshControl={RefreshControl}
    />
  );
};

const COLUMN_WRAPPER_STYLE = {
  justifyContent: 'space-between',
  paddingHorizontal: 10,
} as const;
