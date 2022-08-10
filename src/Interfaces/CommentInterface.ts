import { UserInterface } from "./UserInterface";

export interface CommentInterface {
  id: string,
  user: UserInterface,
  created_at: string,
  updated_at: string,
  content: string,
}
