import React from 'react';
import { useTheme } from 'styled-components/native';

import { BookmarksAPI } from '@app/api/bookmarks';
import { useShareIntent } from '@app/hooks/useShareIntent';
import { IBookmark } from '@app/types';

export const AddBookmarkScreen = () => {
  const { colours } = useTheme();

  const addNewBookmark = async (bookmark: Omit<IBookmark, 'id'>) => {
    try {
      await BookmarksAPI.addBookmark(bookmark);
    } catch (error) {
      // TODO update with more graceful errors when implemented
      console.error(error);
    }
  };

  // const { newBookmarkDetails, loadingNewBookmarkDetails } = useShareIntent(addNewBookmark);

  return <></>;
};
