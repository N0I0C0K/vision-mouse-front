import axios from 'axios'
export const baseUrl = '127.0.0.1:5555'

export const http = axios.create({
  baseURL: `http://${baseUrl}`,
})
