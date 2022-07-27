import { useEffect, useReducer } from 'react';

import { supabase } from '@app/lib/supabase';
import { useAuth } from '@app/store/auth';
import { Collection as CollectionType } from '@app/types';

type UseCollectionsReturnType = {
  fetchCollections: () => Promise<void>;
  addCollection: (name: string) => Promise<void>;
  collections: CollectionType[];
  error: string | undefined;
  loading: boolean;
};

const DEFAULT_STATE = {
  data: [],
  error: undefined,
  loading: false,
};

const fetchData = async () => {
  const result = await supabase
    .from('collections')
    .select()
    .order('created_at', { ascending: false });

  return result;
};

export type ReducerState = {
  data: CollectionType[];
  error: undefined | string;
  loading: boolean;
};

export type ReducerAction =
  | { type: 'FETCH_DATA' }
  | { type: 'DATA_FETCHED'; data: CollectionType[] }
  | { type: 'ERROR_FETCHING_DATA'; error: string }
  | { type: 'COLLECTION_ADDED'; data: CollectionType[] };

const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, loading: true };
    case 'DATA_FETCHED':
      return { ...state, loading: false, data: action.data };
    case 'ERROR_FETCHING_DATA':
      return { ...state, error: action.error };
    case 'COLLECTION_ADDED':
      const updatedCollections = [...action.data, ...state.data];
      return { ...state, data: updatedCollections };
  }
};

export const useCollections = (): UseCollectionsReturnType => {
  const session = useAuth(state => state.session);

  const [{ data, error, loading }, dispatch] = useReducer(
    reducer,
    DEFAULT_STATE,
  );

  const fetchCollections = async () => {
    dispatch({ type: 'FETCH_DATA' });
    const result = await fetchData();

    if (result.error) {
      return;
    }

    if (result.data) {
      dispatch({ type: 'DATA_FETCHED', data: result.data });
    }
  };

  const addCollection = async (name: string) => {
    dispatch({ type: 'FETCH_DATA' });

    const newCollection = {
      name,
      bookmarks: [],
      user_id: session?.user?.id,
    };

    const result = await supabase
      .from('collections')
      .insert([{ ...newCollection }]);

    if (result.error) {
      // TODO Add action to handle errors when adding a collection
      console.log('ERROR ADDING COLLECTION', error);
      return;
    }

    if (result.data) {
      dispatch({ type: 'COLLECTION_ADDED', data: result.data });
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return {
    fetchCollections,
    addCollection,
    collections: data,
    error,
    loading,
  };
};
