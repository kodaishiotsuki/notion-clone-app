import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

// スライスの状態の型を定義
interface UserState {
  value: {
    username?: string
  }
}

// その型を使用して初期状態を定義
const initialState: UserState = {
  value: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.value = action.payload.value // アクションのペイロードに基づいて状態を更新
    },
  },
})

export const { setUser } = userSlice.actions

export const userSelector = (state: RootState) => state.user.value

export default userSlice.reducer
