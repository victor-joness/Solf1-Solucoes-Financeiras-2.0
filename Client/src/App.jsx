import {React} from 'react'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import {ToastContainer} from "react-toastify";

function App() {
  return(
    <div className='app'>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
