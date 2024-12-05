import { IScores } from './dice'

export interface ILoginInput {
  email: string
  password: string
}

export interface ILoginResponse {
  status: string
  message: string
  data: string
}

export interface JwtPayload {
  exp: number
  email: string
  username: string
  scores: IScores
  uid: string
}
