import { useQuery } from '@tanstack/react-query';

import { BookmarksAPI } from '@app/api/bookmarks';
import { IBookmark } from '@app/types';

export const useBookmarks = () => {
  const result = useQuery<IBookmark[], string>(
    ['bookmarks'],
    BookmarksAPI.fetchAllBookmarks,
    {
      onError: error => console.error(error),
    },
  );

  const deleteBookmark = async (id: string) => {
    await BookmarksAPI.deleteBookmark(id);
    result.refetch();
  };

  return { ...result, deleteBookmark };
};
