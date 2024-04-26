import mongoose, { Document } from 'mongoose'

// User の型定義をインターフェースとして作成
interface IUser extends Document {
  username: string
  password: string
}

// Mongoose のスキーマを作成
const userSchema = new mongoose.Schema({
  username: {
    type: String, // 型を指定する
    required: true, // 必須カラムかどうか
    unique: true, // 一意かどうか
  },
  password: {
    type: String, // 型を指定する
    required: true, // 必須カラムかどうか
  },
})

// モデルを作成
export const User = mongoose.model<IUser>('User', userSchema)
