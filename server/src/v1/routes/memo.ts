import express from 'express'

import { create, getAll, getOne, update } from '../controllers/memo'
import { verifyToken } from '../handlers/tokenHandler'

const router = express.Router()

//メモを作成
router.post('/create', verifyToken, create)

// ログインユーザーのメモを全て取得
router.get('/getAll', verifyToken, getAll)

// ログインユーザーのメモを1つ取得
router.get('/:memoId', verifyToken, getOne)

// メモを更新
router.put('/:memoId', verifyToken, update)

export default router
