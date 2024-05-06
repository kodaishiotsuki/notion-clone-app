import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import memoApi from '../api/memoApi'

export default function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const createMemo = async () => {
    try {
      setLoading(true)
      const res = await memoApi.create()
      console.log(res.data)
      navigate(`/memo/${res.data._id}`)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton variant='outlined' color='success' loading={loading} onClick={createMemo}>
        最初のメモを作成
      </LoadingButton>
    </Box>
  )
}
