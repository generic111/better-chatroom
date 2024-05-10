import './App.css';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Home from './pages/homepage/Home.jsx';
import { Navigate, Route, Routes, useActionData } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Forum from './pages/forum/ForumHome.jsx';
import NavBar from './pages/homepage/NavBar.jsx';

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='h-screen items-center justify-center'>
      <div className='top-0 w-screen'>
        <NavBar user={authUser}/>
      </div>
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
