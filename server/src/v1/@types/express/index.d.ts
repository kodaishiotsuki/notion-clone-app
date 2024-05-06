import { User } from '../../models/user' // 正しいパスを確認してください

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
