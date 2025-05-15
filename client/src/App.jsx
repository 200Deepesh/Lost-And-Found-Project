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
import './App.css'

function App() {

  const setUserId = useUserStore((state) => state.setUserId)
  const userId = useUserStore((state) => state.userId)
  useEffect(() => {
    const id = getCookies('emailId')
    if (id) setUserId(id)
    console.log(userId)
  })


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path='/:page'
              element={(!userId)
                ? <Navigate to='../signin' replace={true}/>
                : <LostAndFoundLayout />
              } />

          </Route>
          <Route element={<LoginAndSignupLayout />}>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
          <Route path='/item/:id' element={<ItemsInfo />} />
          <Route path='/add/:type' element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
