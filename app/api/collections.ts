import { supabase } from '@app/lib/supabase';
import { ICollection } from '@app/types';

interface ICollectionAPI {
  fetchCollections: () => Promise<ICollection[]>;
  fetchCollectionDetails: (id: string) => Promise<ICollection>;
  addCollection: (name: string, icon: string, user_id: string) => Promise<ICollection>;
  updateCollectionName: (id: string, newName: string) => Promise<ICollection>;
  updateCollectionIcon: (id: string, newIcon: string) => Promise<ICollection>;
  removeBookmarkFromCollection: (collectionId: string, bookmarkId: string) => Promise<void>;
  addBookmarkToCollection: (collectionId: string, bookmarkId: string) => Promise<void>;
  deleteCollection: (collectionId: string) => Promise<void>;
  fetchTotalNumberOfCollections: () => Promise<number>;
}

export const CollectionAPI: ICollectionAPI = {
  fetchCollections: async () => {
    const { data, error } = await supabase
      .from<ICollection>('collections')
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching collections - ${error.message}`);
    }

    return data;
  },
  fetchCollectionDetails: async (id: string) => {
    const { data, error } = await supabase.from<ICollection>('collections').select('*').limit(1).eq('id', id);

    if (error) {
      throw new Error(`Error fetching collection with ID ${id} - ${error.message}`);
    }

    const collection = data[0];

    if (!collection) {
      throw new Error('No collection found.');
    }

    return collection;
  },
  addCollection: async (name: string, icon: string, user_id: string) => {
    const newCollectionDetails = {
      name,
      icon,
      bookmarks: [],
      user_id,
    };

    const { error, data } = await supabase.from<ICollection>('collections').insert([{ ...newCollectionDetails }]);

    if (error) {
      throw new Error(`Error adding collection - ${error.message}`);
    }

    const newCollection = data[0];

    if (!newCollection) {
      throw new Error('Collection not created.');
    }

    return newCollection;
  },
  updateCollectionName: async (id: string, newName: string) => {
    const { error, data } = await supabase.from<ICollection>('collections').update({ name: newName }).eq('id', id);

    if (error) {
      throw new Error(`Error updating collection name - ${error.message}`);
    }

    const newCollection = data[0];

    if (!newCollection) {
      throw new Error('Collection not created.');
    }

    return newCollection;
  },
  updateCollectionIcon: async (id: string, newIcon: string) => {
    const { error, data } = await supabase.from<ICollection>('collections').update({ icon: newIcon }).eq('id', id);

    if (error) {
      throw new Error(`Error updating collection name - ${error.message}`);
    }

    const newCollection = data[0];

    if (!newCollection) {
      throw new Error('Collection not created.');
    }

    return newCollection;
  },
  removeBookmarkFromCollection: async (collectionId: string, bookmarkId: string) => {
    const collectionToUpdate = await CollectionAPI.fetchCollectionDetails(collectionId);

    if (!collectionToUpdate) {
      throw new Error('Collection not found');
    }

    const updatedBookmarks = collectionToUpdate.bookmarks.filter(id => id !== bookmarkId);

    const { error } = await supabase
      .from('collections')
      .update({
        bookmarks: updatedBookmarks,
        bookmark_count: updatedBookmarks.length,
      })
      .eq('id', collectionId);

    if (error) {
      throw new Error(`Error removing bookmark from collection - ${error}`);
    }
  },
  addBookmarkToCollection: async (collectionId: string, bookmarkId: string) => {
    const collection = await CollectionAPI.fetchCollectionDetails(collectionId);

    const { bookmarks, bookmark_count } = collection;

    const updatedBookmarks = [...bookmarks, bookmarkId];

    await supabase
      .from('collections')
      .update({
        bookmarks: updatedBookmarks,
        bookmark_count: bookmark_count + 1,
      })
      .eq('id', collectionId);
  },
  deleteCollection: async (collectionId: string) => {
    const { error } = await supabase.from('collections').delete().eq('id', collectionId);

    if (error) {
      throw new Error(`Error deleting collection - ${error.message}`);
    }
  },
  fetchTotalNumberOfCollections: async () => {
    const collections = await CollectionAPI.fetchCollections();

    return collections.length;
  },
};
