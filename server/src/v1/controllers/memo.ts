import { Request, Response } from 'express'

import { Memo } from '../models/memo'

export const create = async (req: Request, res: Response) => {
  console.log(req)
  try {
    const memoCount = await Memo.find().countDocuments()
    console.log('memoCount', memoCount)
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    })
    return res.status(200).json(memo)
  } catch (error) {
    return res.status(500).json(error)
  }
}
