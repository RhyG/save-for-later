import { supabase } from '@app/lib/supabase';
import { IBookmark, ICollection } from '@app/types';

interface IBookmarksAPI {
  fetchAllBookmarks: () => Promise<IBookmark[]>;
  fetchBookmarkByID: (id: string) => Promise<IBookmark>;
  fetchBookmarksByCollection: (collectionId: string) => Promise<IBookmark[]>;
  deleteBookmark: (id: string) => Promise<void>;
  addBookmark: (bookmark: Omit<IBookmark, 'id'>) => Promise<IBookmark>;
}

export const BookmarksAPI: IBookmarksAPI = {
  fetchAllBookmarks: async () => {
    const { body, error } = await supabase
      .from<IBookmark>('bookmarks')
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching all bookmarks - ${error.message}`);
    }

    // TODO figure out issue with `created_at` when properly typed
    return body;
  },
  fetchBookmarkByID: async (id: string) => {
    const { data, error } = await supabase.from<IBookmark>('bookmarks').select('*').eq('id', id);

    if (error) {
      throw new Error(`Error fetching bookmark with ID: ${id} - ${error.message}`);
    }

    return data[0];
  },
  fetchBookmarksByCollection: async (collectionId: string) => {
    let { data: collections, error } = await supabase
      .from<ICollection>('collections')
      .select('*')
      .limit(1)
      .eq('id', collectionId);

    if (error) {
      throw new Error(`Error fetching collection with ID ${collectionId} - ${error.message}`);
    }

    const collection = collections?.[0];

    if (collection) {
      const bookmarks = await Promise.all(collection.bookmarks.map(BookmarksAPI.fetchBookmarkByID));

      return bookmarks;
    }

    return [];
  },
  deleteBookmark: async (id: string) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id);

    if (error) {
      throw new Error(`Error deleting bookmark with ID: ${id} - ${error.message}`);
    }
  },
  addBookmark: async (bookmark: Omit<IBookmark, 'id'>) => {
    const { data, error } = await supabase.from<IBookmark>('bookmarks').insert([bookmark]);

    if (error) {
      throw new Error(`Error adding bookmark - ${error.message}`);
    }

    const newBookmark = data[0];

    if (!newBookmark) {
      throw new Error('No bookmark returned from insert.');
    }

    return newBookmark;
  },
};
