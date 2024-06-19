import axios from 'axios';
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast';
import Register from './Pages/Register'
import Login from './Pages/Login'
import { UserContextProvider } from '../context/userContext';
//connection from backend
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </UserContextProvider>

    </>
  )
}

export default App
