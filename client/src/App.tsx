import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom' // または適切なルーターコンポーネントをインポート

import AuthLayout from './components/layout/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
