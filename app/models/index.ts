export interface ILink {
  id: string;
  url: string;
  image?: string;
  images: string[];
  collections: ICollection[];
  numberOfOpens: number;
  title: string;
  description: string;
  siteName?: string;
}

export interface ICollection {
  id: string;
  createdAt: string;
  links: ILink[];
}

export type Bookmark = {
  url: string;
  collections: ICollection[];
  id: string;
};
