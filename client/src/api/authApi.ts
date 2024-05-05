import axiosClient from './axiosClient'

// ユーザー登録用のパラメーター型を定義
interface RegisterParams {
  username: string
  password: string
  confirmPassword?: string
}

const authApi = {
  register: (params: RegisterParams) => axiosClient.post('/auth/register', params),
  login: (params: RegisterParams) => axiosClient.post('/auth/login', params),
}

export default authApi
