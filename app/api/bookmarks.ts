import { supabase } from '@app/lib/supabase';
import { IBookmark } from '@app/types';

interface IBookmarksAPI {
  fetchAllBookmarks: () => Promise<IBookmark[]>;
  fetchBookmarkByID: (id: string) => Promise<IBookmark>;
  fetchBookmarksByCollection: (collectionId: string) => Promise<IBookmark[]>;
}

export const BookmarksAPI: IBookmarksAPI = {
  fetchAllBookmarks: async () => {
    const { body, error } = await supabase
      .from('bookmarks')
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching all bookmarks - ${error.message}`);
    }

    // TODO figure out issue with `created_at` when properly typed
    return body as unknown as IBookmark[];
  },
  fetchBookmarkByID: async (id: string) => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('id', id);

    if (error) {
      throw new Error(
        `Error fetching bookmark with ID: ${id} - ${error.message}`,
      );
    }

    return data[0] as IBookmark;
  },
  fetchBookmarksByCollection: async (collectionId: string) => {
    let { data: collections, error } = await supabase
      .from('collections')
      .select('*')
      .limit(1)
      .eq('id', collectionId);

    if (error) {
      throw new Error(
        `Error fetching collection with ID ${collectionId} - ${error.message}`,
      );
    }

    const collection = collections?.[0];

    const bookmarks = await Promise.all(
      collection.bookmarks.map(BookmarksAPI.fetchBookmarkByID),
    );

    return bookmarks;
  },
};
