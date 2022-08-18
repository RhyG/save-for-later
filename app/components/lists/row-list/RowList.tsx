import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, RefreshControl as RNRefreshControl } from 'react-native';

import { IBookmark } from '@app/types';

import { ListProps } from '../MultiDisplayList';
import { RowListItem } from './RowListItem';

const keyExtractor = (item: IBookmark) => item.id;

export const RowList = ({ data, onItemLongPress, loadingBookmarks, refreshList }: ListProps) => {
  const renderItem = useCallback<ListRenderItem<IBookmark>>(
    ({ item }) => {
      return <RowListItem item={item} onItemLongPress={onItemLongPress} />;
    },
    [onItemLongPress],
  );

  const RefreshControl = useMemo(() => {
    return <RNRefreshControl refreshing={loadingBookmarks} onRefresh={refreshList} />;
  }, [loadingBookmarks, refreshList]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={CONTENT_CONTAINER_STYLE}
      initialNumToRender={10}
      keyExtractor={keyExtractor}
      refreshControl={RefreshControl}
    />
  );
};

const CONTENT_CONTAINER_STYLE = { padding: 10, paddingTop: 0 };
