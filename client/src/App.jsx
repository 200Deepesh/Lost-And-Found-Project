import { useEffect } from 'react';
import Layout from './layouts/Layout';
import Home from './components/Home';
import LostAndFoundLayout from './layouts/LostAndFoundLayout';
import LoginAndSignupLayout from './layouts/LoginAndSignupLayout';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ItemsInfo from './components/ItemsInfo';
import AddItem from './components/AddItem';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { getCookies } from './api/cookies';
import { useUserStore } from './store';
import Dashboard from './components/Dashboard';
import { getUserIdByToken } from './api/user';
import { useShallow } from 'zustand/react/shallow';
import ProtectedRoutes from './components/ProtectedRoutes';
import './App.css';

function App() {

  const { setUserId, userId } = useUserStore(
    useShallow((state) => (
      {
        setUserId: state.setUserId,
        userId: state.userId,
      })));


  useEffect(() => {
    (async () => {
      const id = await getUserIdByToken();
      setUserId(id);
      console.log(userId);
    })();
  }, [])



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/:page' element={<LostAndFoundLayout />} />
              <Route path='/user/:id' element={<Dashboard />} />
            </Route>

          </Route>
          <Route element={<LoginAndSignupLayout />} >
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path='/item/:id' element={<ItemsInfo />} />
            <Route path='/add/:initialStatus' element={<AddItem />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
