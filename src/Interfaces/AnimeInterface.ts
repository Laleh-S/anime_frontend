import { CommentInterface } from "./CommentInterface";

export interface BasicAnimeInterface {
  title: string,
  original_title: string,
  image?: string ,
  director: string,
  producer: string,
  release_date: string,
  description: string,
}

export interface AnimeInterface extends BasicAnimeInterface {
  id: string,
  user: any
  comments: [CommentInterface]
}




