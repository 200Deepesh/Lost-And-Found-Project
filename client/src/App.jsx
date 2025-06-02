import { useEffect } from 'react'
import Layout from './layouts/Layout'
import Home from './components/Home'
import LostAndFoundLayout from './layouts/LostAndFoundLayout'
import LoginAndSignupLayout from './layouts/LoginAndSignupLayout'
import Signup from './components/Signup'
import Signin from './components/Signin'
import ItemsInfo from './components/ItemsInfo'
import AddItem from './components/AddItem'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { getCookies } from './api/cookies'
import { useUserStore } from './store'
import Profile from './components/Profile'
import './App.css'

function App() {
  const id = getCookies('_id')
  const setUserId = useUserStore((state) => state.setUserId)
  useEffect(() => {
    if (id) setUserId(id)
  })


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path='/:page'
              element={(!id)
                ? <Navigate to='../signin' replace={true}/>
                : <LostAndFoundLayout />
              } />

          </Route>
          <Route element={<LoginAndSignupLayout />}>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
          <Route path='/item/:id' element={<ItemsInfo />} />
          <Route path='/add/:initialStatus' element={<AddItem />} />
          <Route path='/user/:id' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
