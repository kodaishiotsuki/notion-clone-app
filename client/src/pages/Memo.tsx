import { DeleteOutlineOutlined, StarBorderOutlined } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import memoApi from '../api/memoApi'

export default function Memo() {
  const { memoId } = useParams()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId as string)
        console.log(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
      } catch (error) {
        alert(error)
      }
    }
    getMemo()
  }, [memoId])

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
          <DeleteOutlineOutlined />
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
        />
      </Box>
    </>
  )
}
