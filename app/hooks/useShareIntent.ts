import { getLinkPreview } from 'link-preview-js';
import { useCallback, useEffect, useState } from 'react';
import ShareMenu from 'react-native-share-menu';

import { generateBookmarkWithPreviewDetails } from '@app/lib/bookmarks';
import { useAuth } from '@app/store/auth';
import { IBookmark } from '@app/types';

export const useShareIntent = (callback: (bookmark: Omit<IBookmark, 'id'>) => void) => {
  const session = useAuth(state => state.session);

  const [loadingNewBookmarkDetails, setLoadingNewBookmarkDetails] = useState(false);
  const [newBookmarkDetails, setNewBookmarkDetails] = useState<Omit<IBookmark, 'id'> | undefined>();

  const handleShare = useCallback(
    async (item: any) => {
      const { data } = item;

      if (data.length === 0) {
        return;
      }

      const sharedData = data[0]?.data ?? null;

      if (!sharedData) {
        console.error('Error with share', data);
        return;
      }

      setLoadingNewBookmarkDetails(true);

      const previewDetails = (await getLinkPreview(sharedData)) as unknown as IBookmark;

      const bookmarkFromPreview = generateBookmarkWithPreviewDetails(previewDetails, session?.user?.id);

      setNewBookmarkDetails(bookmarkFromPreview);

      if (bookmarkFromPreview) {
        callback(bookmarkFromPreview);
      }
    },
    [callback],
  );

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, [handleShare]);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  return { loadingNewBookmarkDetails, newBookmarkDetails };
};
