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
import './App.css';

function App() {

  const { setUserId, userId } = useUserStore(
    useShallow((state) => (
      {
        setUserId: state.setUserId,
        userId: state.userId,
      })));

    let id = getCookies('userId');
    console.log(id);

  
  useEffect(() => {
    (async () => {
      id = await getUserIdByToken();
      setUserId(id);
    })();
  }, [])
  


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path='/:page'
              element={
                (id)
                  ? <LostAndFoundLayout />
                  : <Navigate to='../signin' replace={false} />
              } />

            <Route path='/user/:id' element={(!id)
              ? <Navigate to='../signin' replace={false} />
              : <Dashboard />
            } />
          </Route>
          <Route element={(id)
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
