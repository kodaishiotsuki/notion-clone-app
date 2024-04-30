import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api/v1'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
