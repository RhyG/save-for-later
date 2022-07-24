import { getLinkPreview } from 'link-preview-js';
import { useEffect, useState } from 'react';
import shortid from 'shortid';

import { testData } from '@app/lib/test-data';
import { ILink } from '@app/models';
import { useLocalLinks } from '@app/store/localLinks';

export const useGetBookmarks = (): void => {
  const setLocalLinks = useLocalLinks(state => state.setLocalLinks);

  useEffect(() => {
    (async () => {
      const previews: ILink[] = [];

      for await (const { url } of testData) {
        try {
          const {
            description,
            images,
            siteName,
            title,
            url: URL,
          } = (await getLinkPreview(url!)) as unknown as ILink;

          const id = shortid.generate();
          const preview: ILink = {
            id,
            description,
            images,
            siteName,
            title,
            url: URL,
            collections: [],
            numberOfOpens: 0,
          };
          previews.push(preview);
        } catch (error) {
          console.error(error);
          continue;
        }
      }
      setLocalLinks(previews);
    })();
  }, []);
};
