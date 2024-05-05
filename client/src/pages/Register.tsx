import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

import authApi from '../api/authApi'

export default function Register() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのイベントをキャンセル
    e.preventDefault()
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

    // 新規登録APIを叩く
    try {
      const response = await authApi.register({ username, password, confirmPassword })
      localStorage.setItem('token', response.data.token)
      console.log('登録完了')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit}>
        <TextField fullWidth id='username' label='ユーザー名' margin='normal' name='username' required />
        <TextField fullWidth id='password' label='パスワード' margin='normal' name='password' required type='password' />
        <TextField fullWidth id='confirmPassword' label='確認用パスワード' margin='normal' name='confirmPassword' required type='password' />
        <LoadingButton
          sx={{
            mt: 2,
            mb: 2,
          }}
          fullWidth
          type='submit'
          loading={false}
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
