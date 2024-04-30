import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <>
      <Box component='form'>
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
