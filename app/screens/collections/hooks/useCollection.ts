import { useQuery } from '@tanstack/react-query';

import { BookmarksAPI } from '@app/api/bookmarks';
import { CollectionAPI } from '@app/api/collections';
import { IBookmark, ICollection } from '@app/types';

const EMPTY_ARRAY: IBookmark[] = [];

type UseCollectionValue = {
  collectionInformation?: ICollection;
  errorFetchingCollection: string | null;
  loadingCollection: boolean;
  bookmarks: IBookmark[];
  errorFetchingBookmarks: string | null;
  loadingBookmarks: boolean;
  fetchCollection: () => void;
  fetchBookmarks: () => void;
  removeBookmarkFromCollection: (id: string) => Promise<void>;
};

/**
 * Returns collection details
 * @param id {string} Collection ID
 * @returns {UseCollectionValue} collection data and bookmarks for the collection.
 */
export const useCollection = (id: string): UseCollectionValue => {
  const {
    data: collectionInformation,
    error: errorFetchingCollection,
    isLoading: loadingCollection,
    refetch: fetchCollection,
  } = useQuery<ICollection, string>(['collection', id], () => CollectionAPI.fetchCollectionDetails(id));

  const {
    data: bookmarks = EMPTY_ARRAY,
    error: errorFetchingBookmarks,
    isLoading: loadingBookmarks,
    refetch: fetchBookmarks,
  } = useQuery<IBookmark[], string>(['collection-bookmarks', id], () => BookmarksAPI.fetchBookmarksByCollection(id));

  const removeBookmarkFromCollection = async (bookmarkId: string) => {
    await CollectionAPI.removeBookmarkFromCollection(collectionInformation?.id ?? '', bookmarkId);
  };

  return {
    collectionInformation,
    errorFetchingCollection,
    loadingCollection,
    bookmarks,
    errorFetchingBookmarks,
    loadingBookmarks,
    fetchCollection,
    fetchBookmarks,
    removeBookmarkFromCollection,
  };
};
