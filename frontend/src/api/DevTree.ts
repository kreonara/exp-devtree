import { isAxiosError } from "axios";
import api from "../config/axios";
import type { ProfileForm, User } from "../types";

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

export async function updateProfile(formData: ProfileForm) {
  try {
    const { data } = await api.patch<string>('/user', formData)
    return data // Perfil Actualizado Correctamente
    
  } catch (error) {
    if(isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error)
    }
  }
}