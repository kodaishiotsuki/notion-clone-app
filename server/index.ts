import AES from 'crypto-js/aes'
import dotenv from 'dotenv'
import express from 'express'
import type { Express, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { User } from './src/v1/models/user'
dotenv.config({ path: './.env.local' })

const app: Express = express()
const port = 3001

const URL = process.env.MONGODB_URI
const SECRET_KEY = process.env.SECRET_KEY
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY

if (!URL) {
  throw new Error('The MongoDB URI is not defined.')
}

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

//ユーザー新規登録API
app.post('/register', async (req: Request, res: Response) => {
  // パスワードの受け取り
  const password = req.body.password

  try {
    // パスワードの暗号化
    req.body.password = AES.encrypt(password, SECRET_KEY as string)

    // ユーザーの新規登録
    const user = await User.create(req.body)

    // JWTの生成
    const token = jwt.sign(
      {
        id: user._id,
      },
      TOKEN_SECRET_KEY as string,
      {
        expiresIn: '24h',
      },
    )
    return res.status(200).json({ user, token })
  } catch (error) {
    return res.status(500).json(error)
  }
})
