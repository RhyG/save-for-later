import { IBookmark } from '@app/types';

export const generateBookmarkWithPreviewDetails = (
  details: any, // TODO Correctly type this
  // user_id?: string,
): Omit<IBookmark, 'id' | 'user_id'> | undefined => {
  const { title, description, url, images, siteName } = details;

  const bookmark = {
    title: title ?? siteName,
    description,
    url,
    preview_image: images[0] ?? '',
    number_of_opens: 0,
    collections: [],
  };

  return bookmark;
};
