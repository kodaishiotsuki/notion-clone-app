import { AES, enc } from 'crypto-js'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { SECRET_KEY, TOKEN_SECRET_KEY } from '../../../config'
import { User } from '../models/user'

// ユーザー新規登録API
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

// ログインAPI
export const login = async (req: Request, res: Response) => {
  // ユーザー名とパスワードの受け取り
  const { username, password } = req.body

  try {
    // ユーザーの検索
    const user = await User.findOne({ username: username })

    // ユーザーが存在しない場合
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            path: 'username',
            msg: 'ユーザー名が存在しません',
          },
        ],
      })
    }

    // パスワードの復号化
    const bytes = AES.decrypt(user.password, SECRET_KEY as string)
    // 復号化したパスワードの取得
    const originalPassword = bytes.toString(enc.Utf8)

    // パスワードが一致しない場合
    if (password !== originalPassword) {
      return res.status(401).json({
        errors: [
          {
            path: 'password',
            msg: 'パスワードが一致しません',
          },
        ],
      })
    }

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
