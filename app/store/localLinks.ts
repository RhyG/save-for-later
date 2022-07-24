import create from 'zustand';

import { ILink } from '@app/models';
import AsyncStorage from '@app/modules/AsyncStorage';

interface ILocalLinksState {
  localLinks: ILink[];
  setLocalLinks: (links: ILink[]) => void;
  loadingLocalLinks: boolean;
  addLink: (link: ILink) => void;
  removeLink: (id: string) => void;
}

export const useLocalLinks = create<ILocalLinksState>(set => ({
  localLinks: [],
  loadingLocalLinks: false,
  setLocalLinks: async (links: ILink[]) => {
    set(() => ({ loadingLocalLinks: true }));

    await AsyncStorage.setItem('links', { links });

    set(() => ({
      localLinks: links,
      loadingLocalLinks: false,
    }));
  },
  addLink: async (link: ILink) => {
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
