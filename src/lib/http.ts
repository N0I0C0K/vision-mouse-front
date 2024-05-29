import axios, { HttpStatusCode, AxiosError } from 'axios'
import { toast } from 'sonner'
export const baseUrl = '127.0.0.1:5555'
export const httpBaseUrl = 'http://' + baseUrl
const webScoketBaseUrl = `ws://${baseUrl}`
export const http = axios.create({
  baseURL: httpBaseUrl,
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

export const webSocketUrl = {
  landMark: webScoketBaseUrl + '/flow/landMark/feed',
  mouseAction: webScoketBaseUrl + '/flow/mouseAction/feed',
}
