import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserHandle } from "../types";

export async function getUser() {
  // vamos a usar INTERCEPTORS
  // const token = localStorage.getItem('AUTH_TOKEN')

  try {
    // vamos a usar INTERCEPTORS
    // const { data } = await api.get('/user', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    const { data } = await api.get<User>('/user')
    return data
    
  } catch (error) {
    if(isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error)
    }
  }
}

// export async function updateProfile(formData: ProfileForm) {
export async function updateProfile(formData: User) {
  try {
    const { data } = await api.patch<string>('/user', formData)
    return data // Perfil Actualizado Correctamente
    
  } catch (error) {
    if(isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function uploadImage(file: File) {
  let formData = new FormData()
  formData.append('file', file)
  try {
    const { data: { image } }: {data: {image: string}} = await api.post('/user/image', formData)

    return image
  } catch (error) {
    if(isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {
    const { data } = await api.get<UserHandle>(`/${handle}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error)
    }
  }
}