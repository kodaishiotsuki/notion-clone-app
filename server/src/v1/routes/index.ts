import express from 'express'

import authRouter from './auth'
import memoRouter from './memo'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/memo', memoRouter)

export default router
