import axiosClient from './axiosClient'

// ユーザー登録用のパラメーター型を定義
// interface RegisterParams {
//   username: string
//   password: string
//   confirmPassword?: string
// }

const memoApi = {
  create: () => axiosClient.post('/memo/create'),
  getAll: () => axiosClient.get('/memo/getAll'),
  getOne: (memoId: string) => axiosClient.get(`/memo/${memoId}`),
}

export default memoApi
