import { useQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { BookmarksAPI } from '@app/api/bookmarks';
import { IBookmark } from '@app/types';

export const useBookmarks = () => {
  const result = useQuery<IBookmark[], string>(['bookmarks'], BookmarksAPI.fetchAllBookmarks, {
    onError: error => console.error(error),
  });

  const deleteBookmark = async (id: string) => {
    Alert.alert('Delete bookmark?', 'This will permanently delete the bookmark and remove it from any collections.', [
      {
        text: 'Delete',
        onPress: async () => {
          await BookmarksAPI.deleteBookmark(id);
          result.refetch();
        },
        style: 'destructive',
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return { ...result, deleteBookmark };
};
