import { Box, Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import notionLogo from '../../assets/images/notion-logo.png'
import authUtils from '../../utils/authUtils'

export default function AuthLayout() {
  const navigate = useNavigate()

  //JWTを持っているかどうかを確認
  useEffect(() => {
    const checkAuth = async () => {
      //認証チェック
      const isAuthenticated = await authUtils.isAuthenticated()
      if (isAuthenticated) {
        navigate('/')
      }
    }
    checkAuth()
  }, [navigate])

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={notionLogo} style={{ width: '100px', height: '100px', marginBottom: 3 }} alt='Notion Logo' />
          Notionクローン開発
        </Box>
        <Outlet />
      </Container>
    </div>
  )
}
