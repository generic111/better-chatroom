import './App.css';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Home from './pages/homepage/Home.jsx';
import { Navigate, Route, Routes, useActionData } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Forum from './pages/forum/ForumHome.jsx';

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='h-screen flex items-center justify-center'>
      {/* <Signin /> */}
      {/* <Signup /> */}
      {/* <Home /> */}
      <Routes>
        <Route path = '/' element = {authUser ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path = '/signin' element = {authUser ? <Navigate to="/"/> : <Signin/>} />
        <Route path = '/signup' element = {authUser ? <Navigate to="/"/> : <Signup/>} />
        <Route path = '/forum' element = {authUser ? <Forum /> : <Navigate to="/signin" />} />
      </Routes>
      <div><Toaster/></div>
    </div>
  )
}

export default App
