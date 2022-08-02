import { useQuery } from '@tanstack/react-query';

import { CollectionAPI } from '@app/api/collections';
import { useAuth } from '@app/store/auth';
import { ICollection } from '@app/types';

export const useCollections = () => {
  const session = useAuth(state => state.session);

  const queryResult = useQuery<ICollection[], string>(
    ['collections'],
    CollectionAPI.fetchCollections,
  );

  const addCollection = async (name: string, icon: string) => {
    const newCollection = await CollectionAPI.addCollection(
      name,
      icon,
      session?.user?.id ?? '',
    );

    return newCollection;
  };

  return {
    addCollection,
    ...queryResult,
  };
};
