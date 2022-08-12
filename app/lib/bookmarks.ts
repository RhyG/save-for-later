export const generateBookmarkWithPreviewDetails = (
  details: any,
  user_id?: string,
) => {
  if (!user_id) {
    return;
  }

  const { title, description, url, images } = details;

  const bookmark = {
    title,
    description,
    url,
    preview_image: images[0] ?? '',
    number_of_opens: 0,
    collections: [],
    user_id,
  };

  return bookmark;
};
