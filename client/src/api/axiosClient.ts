import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api/v1'
const getToken = () => localStorage.getItem('token')

const axiosClient = axios.create({
  baseURL: BASE_URL,
})

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  // headers を設定
  config.headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

// APIを叩いた後に後処理を行う
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    throw error
  },
)

export default axiosClient
