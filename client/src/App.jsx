import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { selectMode, selectToken, selectUser, setToken, setUser, setUserNotifications } from './state/socialSlice'
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import SinglePostPage from './pages/SinglePostPage'
import Profile from './pages/Profile'
import ResetPasswordForm from './pages/RestPasswordForm'
import SignupCard from './pages/SignupCard'
import SignInCard from './pages/SignInCard'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import UpdateProfile from './components/UpdateProfile'
import Chat from './pages/Chat'
import Skelton from './components/Skelton'
import { socket } from './socket'
import { getAllNotifications } from './api/notifications'

const App = () => {

  const mode = useSelector(selectMode)
  const user = useSelector(selectUser)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [currentChat, setCurrentChat] = useState('')

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const logoutUser = () => {
    axios.get('http://localhost:4000/users/logout')
    .then(res => {    
        dispatch(setToken(''))
    })
    .catch(err => {
      console.log(err)
    }
    )
  };

  const checkTokenExpirationAndLogout = () => {
    if (token && isTokenExpired(token)) {
      logoutUser();
    }
  };

  useEffect(() => {
    checkTokenExpirationAndLogout();

    const interval = setInterval(() => {
      checkTokenExpirationAndLogout();
    }, 3600000 ); 

    return () => clearInterval(interval); 
  }, []);

  const getCurrentUser = async () => {
    await axios.get('http://localhost:4000/users/current-user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        dispatch(setUser(res.data.user))
    })
    .catch(err => {
        console.log(err)
    })
  }

  useEffect(()=>{
    console.log(token);
    if (token && token.length > 0) {
      getCurrentUser()
    }
  }, [token])


  const y = 10

  useEffect(() => {
    getAllNotifications(token, dispatch, user)
    socket.on('new message notification', (message) => {
        console.log('notif message', message);
        getAllNotifications(token, dispatch, user)            
    })

    socket.on('last message', (message) => {
      console.log('message', message);
      getAllNotifications(token, dispatch, user)            
    })

    socket.on('logout', (message) => {
      console.log('aaag user logged out');
      dispatch(setUserNotifications([]))
    })

    return () => {
        socket.off('new message notification')
        socket.off('last message')
        socket.off('logout')
    }
}, [])

  return (
    <div className={`text-wrap text-2xl text-center h-full ${mode === 'dark'? 'bg-grey-900 ': 'bg-grey-50'} min-h-screen h-full`}>
      <Router>
      {token && token.length > 0 && 
        <Header 
          currentChat={currentChat} 
          setCurrentChat={setCurrentChat} 
        />
      }
        <Routes>
          <Route path='/' element={token && token.length > 0 ? <Home setCurrentChat={setCurrentChat} /> : <Navigate to={"/login"}/>} />
          <Route 
            path='/chat' 
            element = {token && token.length > 0 ? 
            <Chat 
              currentChat={currentChat} 
              setCurrentChat={setCurrentChat} 
            /> 
            : 
              <Navigate to={"/login"} />
            } 
        />
          <Route path='post/:postId' element={token && token.length > 0 ? <SinglePostPage /> : <Navigate to={"/login"}/>} />
          <Route path='profile/:userName' element={token && token.length > 0 ? <Profile /> : <Navigate to={"/login"}/>} />
          <Route path='/edit-profile' element={token && token.length > 0 ? <UpdateProfile /> : <Navigate to={"/login"}/>} />
          <Route path='/reset-password' element={<ResetPasswordForm />} />
          <Route path='/register' element={!token.length > 0 ? <SignupCard /> : <Navigate to={"/"} />} />
          <Route path='/login' element={!token.length > 0 ? <SignInCard /> : <Navigate to={"/"} />} />
          <Route path='/skl' element={token && token.length > 0 ? <Skelton /> : <Navigate to={"/"} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App