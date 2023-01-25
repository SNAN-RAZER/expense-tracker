import React from 'react'
import 'antd/dist/reset.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import NonProtectedRoute from './auth/NonProtectedRoute';

const App = () => {
  return (
    <div className="App">
       <Router>

            <Routes>
                
              <Route element={<ProtectedRoute />}>
               <Route path="/" element={<Home /> } exact/>

               </Route>

               <Route element ={<NonProtectedRoute />} >
                <Route path='/login' exact element={<Login />} />
                <Route path='/register' exact element={<Register />} />
               
                </Route>
                </Routes>
       </Router>
    </div>
  )
}

export default App