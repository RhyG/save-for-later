import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { ILink } from '@app/models';

import { RowListItem } from './RowListItem';

type Props = {
  data: ILink[];
  loadingLinks: boolean;
  onItemLongPress: (item: ILink) => void;
};

const keyExtractor = (item: ILink) => item.id;

export const RowList = ({ data, onItemLongPress }: Props) => {
  const renderItem = useCallback<ListRenderItem<ILink>>(
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
