import { AES } from 'crypto-js'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
dotenv.config({ path: './.env.local' })

const SECRET_KEY = process.env.SECRET_KEY
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY

const router = express.Router()

//ユーザー新規登録API
router.post(
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

export default router
