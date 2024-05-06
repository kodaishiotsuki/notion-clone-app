import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material'
import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import memoApi from '../../api/memoApi'
import assets from '../../assets'
import { userSelector } from '../../redux/features/userSlice'
import { useAppSelector } from '../../redux/hooks'

export default function Sidebar() {
  const navigate = useNavigate()
  const user = useAppSelector(userSelector)

  //ログアウト処理
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll()
        console.log(res.data)
      } catch (error) {
        alert(error)
      }
    }
    getMemos()
  }, [])

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width: 250,
        height: '100vh',
      }}
    >
      <List
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box
          sx={{
            paddingTop: '10px',
          }}
        ></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box
          sx={{
            paddingTop: '10px',
          }}
        ></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlined fontSize='small' />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton
          sx={{
            pl: '20px',
          }}
          component={Link}
          to='/memo'
        >
          <Typography>仮置きのメモ</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
