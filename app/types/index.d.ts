export type Bookmark = {
  url: string;
  collections: collection[];
  id: string;
  userID: string;
  title: string;
  description: string;
  previewImage?: string;
  userTitle?: string;
  numberOfOpens: number;
};

export type Collection = {
  id: string;
  createdAt: string;
  bookmarks: string[];
  bookmarkCount: number;
  name: string;
  userID: string;
};
