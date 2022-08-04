import { useQuery } from '@tanstack/react-query';

import { CollectionAPI } from '@app/api/collections';
import { ICollection } from '@app/types';

export const useCollections = () =>
  useQuery<ICollection[], string>(
    ['collections'],
    CollectionAPI.fetchCollections,
  );
