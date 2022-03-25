export interface ArticleShape {
  author: object;
  _id: string;
  category: string;
  comments: [];
  content: string;
  createdAt: Date;
  description: string;
  imageArticle: string;
  like: [];
  tags: string[];
  title: string;
  unlike: [];
  updatedAt: Date;
  visible: Boolean;
  __v: number;
}

export interface TagsShape {
  id: number;
  category: string;
  allTags: string[];
}

export interface UseFetchApiShape {
  loading: boolean;
  apiData: any;
  error: boolean | string;
}
