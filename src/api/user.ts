import axios, { AxiosResponse } from 'axios'
import { configureAxios } from './helpers'

import { IUser, IUserLogin } from '@/type/user'

const base_URL = import.meta.env.VITE_API_BASE_URL

export async function addUser(user: IUserLogin): Promise<IUser> {
  const response = await axios.post(`${base_URL}/user`, user)
  return response.data as IUser
}

export async function deleteUser(user: IUser): Promise<void> {
  const axiosInstance = configureAxios()
  await axiosInstance.delete(`${base_URL}/user/${user.uid}`)
}

export async function updateUser(user: IUser): Promise<AxiosResponse> {
  const axiosInstance = configureAxios()
  const response = await axiosInstance.put(`${base_URL}/user/${user.uid}`, {
    email: user.email,
    username: user.username,
  })
  return response
}

export async function getUserById(id: string): Promise<IUser> {
  const axiosInstance = configureAxios()

  const response = await axiosInstance.get(`${base_URL}/${id}`)
  return response.data as IUser
}

export async function getAllUsers(): Promise<IUser[]> {
  const axiosInstance = configureAxios()

  const response = await axiosInstance.get(`${base_URL}/user/all`)
  return response.data as IUser[]
}
