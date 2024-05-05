import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import authApi from '../api/authApi'

export default function Register() {
  const navigate = useNavigate()
  const [userNameErrText, setUserNameErrText] = useState<string>('')
  const [passwordErrText, setPasswordErrText] = useState<string>('')
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのイベントをキャンセル
    e.preventDefault()
    setUserNameErrText('')
    setPasswordErrText('')
    setConfirmPasswordErrText('')

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

    const confirmPasswordValue = data.get('confirmPassword')
    let confirmPassword = ''
    if (typeof confirmPasswordValue === 'string') {
      confirmPassword = confirmPasswordValue.trim()
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
    if (confirmPassword === '') {
      error = true
      setConfirmPasswordErrText('確認用パスワードを入力してください')
    }
    if (password !== confirmPassword) {
      error = true
      setConfirmPasswordErrText('パスワードが一致しません')
    }

    if (error) {
      return
    }

    setLoading(true)

    // 新規登録APIを叩く
    try {
      const response = await authApi.register({ username, password, confirmPassword })
      setLoading(false)
      localStorage.setItem('token', response.data.token)
      console.log('登録完了')
      navigate('/')
    } catch (error: unknown) {
      // エラー応答が AxiosError であり、データが含まれているか確認
      if (error instanceof AxiosError && error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors // エラー応答の詳細にアクセス
        errors.forEach((err: { path: string; msg: string }) => {
          if (err.path === 'username') {
            setUserNameErrText(err.msg)
          } else if (err.path === 'password') {
            setPasswordErrText(err.msg)
          } else if (err.path === 'confirmPassword') {
            setConfirmPasswordErrText(err.msg)
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
        <TextField
          fullWidth
          id='confirmPassword'
          label='確認用パスワード'
          margin='normal'
          name='confirmPassword'
          required
          type='password'
          helperText={confirmPasswordErrText}
          error={confirmPasswordErrText !== ''}
          disabled={loading}
        />
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
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to='/login'>
        ログインはこちら
      </Button>
    </>
  )
}
