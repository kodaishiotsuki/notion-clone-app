import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material'
import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'

import assets from '../../assets'

export default function Sidebar() {
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
              UserName
            </Typography>
            <IconButton>
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
      </List>
    </Drawer>
  )
}
