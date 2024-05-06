import { CssBaseline } from '@mui/material'
import { blue } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // または適切なルーターコンポーネントをインポート
import './App.css'

import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Memo from './pages/Memo'
import Register from './pages/Register'

function App() {
  const theme = createTheme({
    palette: {
      primary: blue,
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route path='/' element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path='memo' element={<Home />} />
              <Route path='memo/:memoId' element={<Memo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
