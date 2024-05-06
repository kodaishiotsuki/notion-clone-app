import axiosClient from './axiosClient'

const memoApi = {
  create: () => axiosClient.post('/memo/create'),
  getAll: () => axiosClient.get('/memo/getAll'),
  getOne: (memoId: string) => axiosClient.get(`/memo/${memoId}`),
  update: (memoId: string, params: any) => axiosClient.put(`/memo/${memoId}`, params),
}

export default memoApi
