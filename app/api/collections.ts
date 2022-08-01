import { supabase } from '@app/lib/supabase';
import { ICollection } from '@app/types';

interface ICollectionAPI {
  fetchCollections: () => Promise<ICollection[]>;
  fetchCollectionDetails: (id: string) => Promise<ICollection>;
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
    const { data, error } = await supabase
      .from<ICollection>('collections')
      .select('*')
      .limit(1)
      .eq('id', id);

    if (error) {
      throw new Error(
        `Error fetching collection with ID ${id} - ${error.message}`,
      );
    }

    const collection = data[0];

    if (!collection) {
      throw new Error('No collection found.');
    }

    return collection;
  },
};
