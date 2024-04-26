import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { TOKEN_SECRET_KEY } from '../../../config'
import { User } from '../models/user'
import { CustomRequest } from '../types'

// Bearerトークンをデコードする関数
const tokenDecode = (req: CustomRequest): JwtPayload | false => {
  // リクエストヘッダーからBearerトークンを取得
  const bearerHeader = req.headers['authorization']
  //bearerHeaderが存在する場合
  if (bearerHeader) {
    //Bearerトークンを取得
    const bearerToken = bearerHeader.split(' ')[1]
    try {
      //Bearerトークンをデコード
      const decodedToken = jwt.verify(bearerToken, TOKEN_SECRET_KEY) as JwtPayload
      return decodedToken // JwtPayload 型として返す
    } catch {
      return false
    }
  } else {
    return false
  }
}

// JWT認証を検証するためのミドルウェア
export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  // Bearerトークンをデコード
  const decodedToken = tokenDecode(req)
  //decodedTokenが存在する場合
  if (decodedToken) {
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(401).json({ message: '権限がありません' })
    }
    req.user = user
    next()
  } else {
    return res.status(401).json({ message: '権限がありません' })
  }
}
