import { UserInterface } from "./UserInterface";

export interface LoginInterface {
  email: string,
  password: string,
}

export interface RegisterInterface extends UserInterface {
  password: string,
  passwordConfirmation:string,
  email: string,
}

export interface UserSessionInterface {
  user_id: number,
  token: string
}
