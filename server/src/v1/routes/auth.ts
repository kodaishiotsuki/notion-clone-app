import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { login, register } from '../controllers/user'
import { verifyToken } from '../handlers/tokenHandler'
import { validate } from '../handlers/validation'
import { User } from '../models/user'
import { CustomRequest } from '../types'

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
  validate,
  register,
)

//ログインAPI
router.post(
  '/login',
  body('username').isLength({ min: 8 }).withMessage('ユーザー名は8文字以上である必要があります'),
  body('password').isLength({ min: 8 }).withMessage('パスワードは8文字以上である必要があります'),
  validate,
  login,
)

//JWTの検証API
router.post('/verify-token', verifyToken, (req: CustomRequest, res: Response) => {
  return res.status(200).json({ user: req.user })
})

export default router
