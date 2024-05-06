import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material'
import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import memoApi from '../../api/memoApi'
import assets from '../../assets'
import { memoSelector, setMemo } from '../../redux/features/memoSlice'
import { userSelector } from '../../redux/features/userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export default function Sidebar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { memoId } = useParams()
  const user = useAppSelector(userSelector)
  const memos = useAppSelector(memoSelector)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll()
        dispatch(setMemo({ value: res.data }))
      } catch (error) {
        alert(error)
      }
    }
    getMemos()
  }, [dispatch])

  //メモIDからアクティブなメモのインデックスを取得
  useEffect(() => {
    const activeIndex = memos.findIndex((memo) => memo._id === memoId)
    setActiveIndex(activeIndex)
  }, [navigate, memoId, memos])

  //メモを追加
  const addMemo = async () => {
    try {
      const res = await memoApi.create()
      const newMemos = [res.data, ...memos]
      dispatch(setMemo({ value: newMemos }))
      navigate(`/memo/${res.data._id}`)
    } catch (error) {
      alert(error)
    }
  }

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
            <IconButton onClick={addMemo}>
              <AddBoxOutlined fontSize='small' />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((memo, index) => (
          <ListItemButton
            sx={{
              pl: '20px',
            }}
            component={Link}
            to={`/memo/${memo._id}`}
            key={memo._id}
            selected={activeIndex === index}
          >
            <Typography>
              {memo.title} {memo.icon}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
