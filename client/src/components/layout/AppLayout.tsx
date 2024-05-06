import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { setUser } from '../../redux/features/userSlice'
import { useAppDispatch } from '../../redux/hooks'
import authUtils from '../../utils/authUtils'
import Sidebar from '../common/Sidebar'

export default function AppLayout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  //JWTを持っているかどうかを確認
  useEffect(() => {
    const checkAuth = async () => {
      //認証チェック
      const user = await authUtils.isAuthenticated()
      if (!user) {
        navigate('/login')
      } else {
        //ユーザーを保存する
        dispatch(setUser({ value: user }))
      }
    }
    checkAuth()
  }, [navigate, dispatch])

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
