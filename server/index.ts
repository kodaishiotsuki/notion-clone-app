import AES from 'crypto-js/aes'
import dotenv from 'dotenv'
import express from 'express'
import { body, validationResult } from 'express-validator'
import type { Express, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { User } from './src/v1/models/user'

dotenv.config({ path: './.env.local' })

const app: Express = express()

// JSON データを受け取れるようにする
app.use(express.json())

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
app.post(
  '/register',
  body('username').isLength({ min: 8 }).withMessage('ユーザー名は8文字以上である必要があります'),
  body('password').isLength({ min: 8 }).withMessage('パスワードは8文字以上である必要があります'),
  body('confirmPassword').isLength({ min: 8 }).withMessage('確認パスワードは8文字以上である必要があります'),
  body('username').custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('ユーザー名はすでに使用されています')
      }
    })
  }),
  (req: express.Request, res: express.Response, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  async (req: Request, res: Response) => {
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
  },
)
