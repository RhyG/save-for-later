import create from 'zustand';

import AsyncStorage from '@app/modules/AsyncStorage';
import { IBookmark } from '@app/types';

interface ILocalLinksState {
  localLinks: IBookmark[];
  setLocalLinks: (links: IBookmark[]) => void;
  loadingLocalLinks: boolean;
  addLink: (link: IBookmark) => void;
  removeLink: (id: string) => void;
}

export const useLocalLinks = create<ILocalLinksState>(set => ({
  localLinks: [],
  loadingLocalLinks: false,
  setLocalLinks: async (links: IBookmark[]) => {
    set(() => ({ loadingLocalLinks: true }));

    await AsyncStorage.setItem('links', { links });

    set(() => ({
      localLinks: links,
      loadingLocalLinks: false,
    }));
  },
  addLink: async (link: IBookmark) => {
    set(({ localLinks }) => {
      const newLinks = [link, ...localLinks];

      AsyncStorage.setItem('links', { links: newLinks });

      return { localLinks: newLinks };
    });
  },
  removeLink: async (id: string) => {
    set(({ localLinks }) => {
      const newLinks = localLinks.filter(link => link.id !== id);

      AsyncStorage.setItem('links', { links: newLinks });

      return { localLinks: newLinks };
    });
  },
}));
