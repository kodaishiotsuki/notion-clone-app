import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import notionLogo from '../../assets/images/notion-logo.png'

export default function AuthLayout() {
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
