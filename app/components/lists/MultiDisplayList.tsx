import React from 'react';

import { IBookmark } from '@app/types';

import { DisplayType } from './ListDisplayToggleButton';
import { GridList } from './grid-list/GridList';
import { RowList } from './row-list/RowList';

export type ListProps = {
  data: IBookmark[];
  loadingBookmarks: boolean;
  onItemLongPress?: (item: IBookmark) => void;
};

type Props = {
  currentListDisplayType: DisplayType;
} & ListProps;

export const MultiDisplayList = ({
  currentListDisplayType,
  ...listProps
}: Props) => {
  return (
    <>
      {currentListDisplayType === 'grid' ? (
        <GridList {...listProps} />
      ) : (
        <RowList {...listProps} />
      )}
    </>
  );
};
