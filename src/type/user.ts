import { IScores } from './dice'
export interface IUser {
  username: string
  email: string
  isadmin: boolean
  uid: string
  scores: IScores
}

export interface IUserLogin {
  password: string
  username: string
  email: string
}
