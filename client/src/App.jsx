import { useState } from 'react'
import Layout from './layouts/Layout'
import Home from './components/Home'
import Navbar from './components/Navbar'
import LostAndFoundLayout from './layouts/LostAndFoundLayout'
import LoginAndSignupLayout from './layouts/LoginAndSignupLayout'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { BrowserRouter, Routes, Route } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/:page' element={<LostAndFoundLayout />} />
          </Route>
          <Route element={<LoginAndSignupLayout />}>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
