import {
  TArticle, TComment, TProfile, TTags, TUser,
} from '../types/types';

export type TAPINewUser = {
  user: {
    username: string;
    email: string;
    password: string;
    nickname?: string;
  }
};

export type TAPIAuth = {
  user: {
    email: string;
    username: string;
    bio?: string;
    image?: string;
    token: string;
    nickname: string
  };
};

export type TAPILoginUser = {
  user: {
    email: string;
    password: string;
  }
};

export type TAPIUser = {
  user: TUser;
};

export type TAPIPatchUserData = {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
  nickname?: string;
};

export type TAPIPatchUser = {
  user: TAPIPatchUserData;
};

export type TAPIArticles = {
  articles: Array<TArticle>,
  articlesCount: number,
};

export type TAPIParamsObject = {
  limit?: number,
  offset?: number,
  tag?: string,
  favorited?: string,
  author?: string
};

export type TAPIArticle = {
  article: TArticle;
};

export type TAPIPatchArticleData = {
  title?: string | null;
  description?: string | null;
  body?: string | null;
  tagList?: TTags;
  link?: string | null;
};

export type TAPITags = {
  tags: TTags;
};

export type TAPIComment = {
  comment: TComment;
};
export type TAPIComments = {
  comments: Array<TComment>;
};

export type TAPIProfile = {
  profile: TProfile;
};

export type TAPIErrors = {
  [error: string]: string;
};
export type TAPIError = {
  errors: TAPIErrors;
  statusCode: number;
};
