import dotenv from 'dotenv'
import type { Express } from 'express'
import express from 'express'
import mongoose from 'mongoose'

import authRouter from './src/v1/routes/auth'
dotenv.config({ path: './.env.local' })

const app: Express = express()
const port = 3001
const URL = process.env.MONGODB_URI

if (!URL) {
  throw new Error('The MongoDB URI is not defined.')
}

// JSON データを受け取れるようにする
app.use(express.json())
// ユーザー新規登録API
app.use('/api/v1', authRouter)

// port 3001 でサーバーを起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// MongoDB に接続
mongoose
  .connect(URL)
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })
