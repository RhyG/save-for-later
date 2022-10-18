import React, { useCallback, useRef, useState } from 'react';
import { FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { SelectionActions } from '@app/components/SelectionActions';
import { Text } from '@app/components/Text';
import { AddToCollectionIcon, DeleteIcon } from '@app/components/icons';
import { useSelectionsContext } from '@app/components/providers/SelectionProvider';
import { IBookmark } from '@app/types';

import { ScrollToTopFAB } from '../ScrollToTopFAB';
import { DisplayType } from './ListDisplayToggleButton';
import { GridList } from './grid-list/GridList';
import { RowList } from './row-list/RowList';

export type ListProps = {
  data: IBookmark[];
  loadingBookmarks: boolean;
  onItemLongPress: (item: IBookmark) => void;
  refreshList: () => void;
} & Partial<FlatListProps<IBookmark>>;

type Props = {
  currentListDisplayType: DisplayType;
} & ListProps;

export const MultiDisplayList = ({ currentListDisplayType, data, ...listProps }: Props) => {
  const [showScrollToTopFAB, setShowScrollToTopFAB] = useState(true);
  const [lastScrollYOffset, setLastScrollYOffset] = useState(0);

  const { selectionsActive, selections, clearSelections, updateSelections } = useSelectionsContext();

  const listRef = useRef<FlatList<IBookmark>>(null);

  /**
   * Handles the hiding/showing of the FAB when scrolling.
   * This is to prevent it covering entries when scrolling.
   */
  const listScrollHandler = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffsetY = event.nativeEvent.contentOffset.y;

      if (lastScrollYOffset - scrollOffsetY >= 20) {
        setShowScrollToTopFAB(true);
      } else if (data.length > 6 && scrollOffsetY > 5) {
        // If there is enough entries to reach the FAB and the user srolls
        setShowScrollToTopFAB(false);
      } else {
        setShowScrollToTopFAB(true);
      }
    },
    [data.length, lastScrollYOffset],
  );

  const onScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setLastScrollYOffset(offsetY);
  }, []);

  /* Scroll to the top of the list when pressing the header */
  const scrollListToTop = useCallback(() => {
    setShowScrollToTopFAB(true);
    listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  const sharedProps = {
    ref: listRef,
    data,
    onScroll: listScrollHandler,
    onScrollEndDrag,
    selections,
    updateSelections,
  };

  return (
    <>
      {currentListDisplayType === 'grid' ? (
        <GridList {...sharedProps} {...listProps} />
      ) : (
        <RowList {...sharedProps} {...listProps} />
      )}

      <SelectionActions visible={selectionsActive}>
        <SelectionActions.Item onPress={() => console.log('ADDING TO COLLECTION')}>
          <AddToCollectionIcon />
        </SelectionActions.Item>
        <SelectionActions.Item onPress={() => console.log('DELETING')}>
          <DeleteIcon />
        </SelectionActions.Item>
        <SelectionActions.Item onPress={clearSelections}>
          <Text fontSize="sm" bold color="#fff">
            CANCEL
          </Text>
        </SelectionActions.Item>
      </SelectionActions>

      <ScrollToTopFAB buttonVisible={!selectionsActive && showScrollToTopFAB} onPress={scrollListToTop} />
    </>
  );
};
