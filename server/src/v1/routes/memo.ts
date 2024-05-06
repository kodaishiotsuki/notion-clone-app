import express from 'express'

import { create, getAll } from '../controllers/memo'
import { verifyToken } from '../handlers/tokenHandler'

const router = express.Router()

//メモを作成
router.post('/create', verifyToken, create)

//ログインユーザーのメモを取得
router.get('/getAll', verifyToken, getAll)

export default router
