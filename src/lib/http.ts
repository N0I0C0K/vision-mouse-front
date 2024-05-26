import axios, { HttpStatusCode, AxiosError } from 'axios'
import { toast } from 'sonner'
export const baseUrl = '127.0.0.1:5555'

export const http = axios.create({
  baseURL: `http://${baseUrl}`,
  validateStatus: (status) => {
    return true
  },
})

http.interceptors.response.use(
  async (resp) => {
    return resp
  },
  async (err: AxiosError) => {
    console.log(err)
    toast.error('Unknown error', { description: err.message })
    return Promise.reject(err)
  }
)
