import { AES } from 'crypto-js'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { SECRET_KEY, TOKEN_SECRET_KEY } from '../../../config'
import { User } from '../models/user'

export const register = async (req: Request, res: Response) => {
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
}
