import './App.css';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Home from './pages/homepage/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* <Signin /> */}
      {/* <Signup /> */}
      {/* <Home /> */}
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/signin' element = {<Signin/>} />
        <Route path = '/signup' element = {<Signup/>} />
      </Routes>
      <div><Toaster/></div>
    </div>
  )
}

export default App
