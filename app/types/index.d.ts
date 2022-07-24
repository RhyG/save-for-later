export type Bookmark = {
  url: string;
  collections: collection[];
  id: string;
};

export type Collection = {
  id: string;
  bookmarks: Bookmark[];
  bookmarkCount: number;
  name: string;
};
