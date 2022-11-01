import { useQuery } from '@tanstack/react-query';

import { BookmarksAPI } from '@app/api/bookmarks';
import { CollectionAPI } from '@app/api/collections';

export const useAccountStats = () => {
  const { data: collections } = useQuery(['collections_amount'], CollectionAPI.fetchTotalNumberOfCollections);
  const { data: bookmarks } = useQuery(['bookmarks_amount'], BookmarksAPI.fetchTotalNumberOfBookmarks);

  console.log(collections);

  console.log({
    numberOfCollections: collections ?? 0,
    numberOfBookmarks: bookmarks ?? 0,
  });

  return {
    numberOfCollections: collections ?? 0,
    numberOfBookmarks: bookmarks ?? 0,
  };
};
