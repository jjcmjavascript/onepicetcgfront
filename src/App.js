import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect } from 'react';
import Login from './modules/login';
import Home from './modules/home';
import NotFound from './utils/views/404';

import {SessionContext} from './utils/providers/sessionProvider'; 

function App() {
  const {isLoged , setLoged , checkSession } = React.useContext(SessionContext);

  useEffect(()=>{
    checkSession()
    .then(res => {
      setLoged(res);
    }); 
  },[]);
 
  const noLogedRoutes = () => {
    return <>
      <Route path="/" element={<Login/>}/>
      <Route path="*" element={<NotFound/>}/>
    </>
  }
  
  const logedRoutes = ()=>{
    return <>
        <Route path="/" element={<Home/>}/>
      </>
  }

  return (
      <BrowserRouter>
        <Routes>
          { isLoged ? logedRoutes() : noLogedRoutes()}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
