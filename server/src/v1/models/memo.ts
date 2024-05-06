import mongoose, { Document, Schema } from 'mongoose'

// User の型定義をインターフェースとして作成
interface IMemo extends Document {
  user: Schema.Types.ObjectId
  icon: string
  title: string
  description: string
  position: number
  favorite: boolean
  favoritePosition: number
}

// Mongoose のスキーマを作成
const memoSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
    default: '📝',
  },
  title: {
    type: String,
    default: '無題',
  },
  description: {
    type: String,
    default: '自由にメモを記入してください',
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
})

// モデルを作成
export const Memo = mongoose.model<IMemo>('Memo', memoSchema)
