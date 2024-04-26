// types.d.ts
import { Request } from 'express'

import { User } from './models/user' // User モデルのパスを正しく設定してください。

export interface CustomRequest extends Request {
  user?: User
}
