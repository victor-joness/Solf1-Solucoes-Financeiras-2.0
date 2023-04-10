import {React} from 'react'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from './Pages/Dashboard/Dashboard';
import AuthPage from './Pages/AuthPage/AuthPage';

//rotas de login
import HomeLogin from "./Pages/Dashboard/HomeLogin/HomeLogin";


import {ToastContainer} from "react-toastify";
import NotFound from './Pages/NotFound/NotFound';
import Perfil from './Pages/Dashboard/Perfil/Perfil';

function App() {
  return(
    <div className='app'>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<AuthPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/home-login' element={<HomeLogin/>}/>
            <Route path='/perfil' element={<Perfil/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
