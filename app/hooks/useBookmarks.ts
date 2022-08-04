import { useQuery } from '@tanstack/react-query';

import { BookmarksAPI } from '@app/api/bookmarks';
import { IBookmark } from '@app/types';

export const useBookmarks = () =>
  useQuery<IBookmark[], string>(['bookmarks'], BookmarksAPI.fetchAllBookmarks);
