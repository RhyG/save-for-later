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
  created_at?: Date;
}

export interface ICollection {
  id: string;
  created_at: string;
  bookmarks: string[];
  bookmark_count: number;
  name: string;
  user_id: string;
  icon: string;
}
