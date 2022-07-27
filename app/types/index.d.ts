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

export interface IBookmark {
  url: string;
  collections: collection[];
  id: string;
  user_id: string;
  title: string;
  description: string;
  preview_image?: string;
  user_title?: string;
  number_of_opens: number;
}

export type Collection = {
  id: string;
  createdAt: string;
  bookmarks: string[];
  bookmarkCount: number;
  name: string;
  userID: string;
};
