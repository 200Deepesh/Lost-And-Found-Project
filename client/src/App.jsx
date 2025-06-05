import { useEffect, useRef } from 'react'
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
import { getUserIdByToken } from './api/user'
import './App.css'
import { useShallow } from 'zustand/react/shallow'
import { useNavigate } from 'react-router'

function App() {

  const { setUserId, userId } = useUserStore(
    useShallow((state) => (
      {
        setUserId: state.setUserId,
        userId: state.userId,
      })));

  (async () => {
    console.log(userId);
    if (userId == null) {
      let id;
      id = await getUserIdByToken();
      setUserId(id);
      console.log('function is called');
    }
  })();


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path='/:page'
              element={
                (userId)
                  ? <LostAndFoundLayout />
                  : <Navigate to='../signin' replace={false} />
              } />

            <Route path='/user/:id' element={(!userId)
              ? <Navigate to='../signin' replace={false} />
              : <Profile />
            } />
          </Route>
          <Route element={(userId)
            ? <Navigate to='/' replace={false} />
            : <LoginAndSignupLayout />
          } >
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
          <Route path='/item/:id' element={<ItemsInfo />} />
          <Route path='/add/:initialStatus' element={<AddItem />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
