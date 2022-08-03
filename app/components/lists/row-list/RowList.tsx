import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { IBookmark } from '@app/types';

import { ListProps } from '../MultiDisplayList';
import { RowListItem } from './RowListItem';

const keyExtractor = (item: IBookmark) => item.id;

export const RowList = ({ data, onItemLongPress }: ListProps) => {
  const renderItem = useCallback<ListRenderItem<IBookmark>>(
    ({ item }) => {
      return <RowListItem item={item} onItemLongPress={onItemLongPress} />;
    },
    [onItemLongPress],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={CONTENT_CONTAINER_STYLE}
      initialNumToRender={10}
      keyExtractor={keyExtractor}
    />
  );
};

const CONTENT_CONTAINER_STYLE = { padding: 10 };
