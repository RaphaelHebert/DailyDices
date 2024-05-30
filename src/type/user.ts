export interface IUser {
  username: string
  email: string
  isAdmin: boolean
  uid: string
}

export interface IUserLogin {
  password: string
  username: string
  email: string
}
