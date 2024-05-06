import { DeleteOutlineOutlined, StarBorderOutlined } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import memoApi from '../api/memoApi'
import { memoSelector, setMemo } from '../redux/features/memoSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export default function Memo() {
  const { memoId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const memos = useAppSelector(memoSelector)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId as string)
        setTitle(res.data.title)
        setDescription(res.data.description)
      } catch (error) {
        alert(error)
      }
    }
    getMemo()
  }, [memoId])

  let timer: number
  const timeout = 1000

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId as string, { title: newTitle })
      } catch (error) {
        alert(error)
      }
    }, timeout)
  }
  const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId as string, { description: newDescription })
      } catch (error) {
        alert(error)
      }
    }, timeout)
  }

  const deleteMemo = async () => {
    try {
      await memoApi.delete(memoId as string)
      const newMemos = memos.filter((memo) => memo._id !== memoId)
      // 削除したメモが最後のメモだった場合はメモ一覧に遷移
      if (newMemos.length === 0) {
        navigate('/memo')
      } else {
        navigate(`/memo/${newMemos[0]._id}`)
      }
      dispatch(setMemo({ value: newMemos }))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color='error'>
          <DeleteOutlineOutlined onClick={deleteMemo} />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <TextField
          value={title}
          placeholder='無題'
          variant='outlined'
          fullWidth
          sx={{
            '.MuiOutlinedInput-input ': { padding: 0 },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '1.5rem', fontWeight: 700 },
          }}
          onChange={updateTitle}
        />
        <TextField
          value={description}
          placeholder='追加'
          variant='outlined'
          fullWidth
          sx={{
            '.MuiOutlinedInput-input ': { padding: 0 },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '1rem' },
          }}
          onChange={updateDescription}
        />
      </Box>
    </>
  )
}
