import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface Memo {
  _id: string
  title: string
  icon?: string // オプショナルプロパティ
}

// スライスの状態の型を定義
interface MemoState {
  value: Memo[]
}

// その型を使用して初期状態を定義
const initialState: MemoState = {
  value: [],
}

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<MemoState>) => {
      state.value = action.payload.value // アクションのペイロードに基づいて状態を更新
    },
    // addMemo: (state, action: PayloadAction<Memo>) => {
    //   state.value.push(action.payload)
    // },
  },
})

export const { setMemo } = memoSlice.actions

export const memoSelector = (state: RootState) => state.memo.value

export default memoSlice.reducer
