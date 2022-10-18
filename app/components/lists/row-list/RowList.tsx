import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, RefreshControl as RNRefreshControl, View } from 'react-native';

import { IBookmark } from '@app/types';

import { ListProps } from '../MultiDisplayList';
// import { RowListItem } from './RowListItem';
// import { RowListItemV2 } from './RowListItemV2';
import { RowListItemV3 } from './RowListItemV3';

type Props = {
  selections: string[];
  updateSelections: (id: string) => void;
} & ListProps;

const keyExtractor = (item: IBookmark) => item.id;

const ItemSeperatorComponent = () => <View style={ITEM_SEPERATOR_STYLE} />;

export const RowList = React.forwardRef<FlatList, Props>(
  ({ data, onItemLongPress, loadingBookmarks, refreshList, ...rest }, ref) => {
    const renderItem = useCallback<ListRenderItem<IBookmark>>(
      ({ item }) => {
        return <RowListItemV3 item={item} onItemLongPress={onItemLongPress} />;
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
        showsVerticalScrollIndicator={false}
        ref={ref}
        // ItemSeparatorComponent={ItemSeperatorComponent}
        {...rest}
      />
    );
  },
);

const CONTENT_CONTAINER_STYLE = { padding: 10, paddingTop: 2 };
const ITEM_SEPERATOR_STYLE = { borderWidth: 0.5, opacity: 0.2 };
