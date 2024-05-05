import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import authApi from '../api/authApi'

export default function Login() {
  const navigate = useNavigate()
  const [userNameErrText, setUserNameErrText] = useState<string>('')
  const [passwordErrText, setPasswordErrText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのイベントをキャンセル
    e.preventDefault()
    setUserNameErrText('')
    setPasswordErrText('')

    const data = new FormData(e.currentTarget)

    // FormDataから値を取得し、string型であることを確認
    const usernameValue = data.get('username')
    let username = ''
    if (typeof usernameValue === 'string') {
      username = usernameValue.trim()
    }

    const passwordValue = data.get('password')
    let password = ''
    if (typeof passwordValue === 'string') {
      password = passwordValue.trim()
    }

    let error = false

    if (username === '') {
      error = true
      setUserNameErrText('ユーザー名を入力してください')
    }
    if (password === '') {
      error = true
      setPasswordErrText('パスワードを入力してください')
    }

    if (error) {
      return
    }

    setLoading(true)

    // 新規登録APIを叩く
    try {
      const response = await authApi.login({ username, password })
      setLoading(false)
      localStorage.setItem('token', response.data.token)
      console.log('ログイン完了')
      navigate('/')
    } catch (error: unknown) {
      // エラー応答が AxiosError であり、データが含まれているか確認
      if (error instanceof AxiosError && error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors // エラー応答の詳細にアクセス
        console.log(errors)
        errors.forEach((err: { path: string; msg: string }) => {
          if (err.path === 'username') {
            setUserNameErrText(err.msg)
          } else if (err.path === 'password') {
            setPasswordErrText(err.msg)
          }
        })
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField fullWidth id='username' label='ユーザー名' margin='normal' name='username' required helperText={userNameErrText} error={userNameErrText !== ''} disabled={loading} />
        <TextField fullWidth id='password' label='パスワード' margin='normal' name='password' required type='password' helperText={passwordErrText} error={passwordErrText !== ''} disabled={loading} />

        <LoadingButton
          sx={{
            mt: 2,
            mb: 2,
          }}
          fullWidth
          type='submit'
          loading={loading}
          color='primary'
          variant='contained'
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to='/register'>
        新規登録はこちら
      </Button>
    </>
  )
}
