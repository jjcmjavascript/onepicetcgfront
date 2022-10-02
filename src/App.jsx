import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect } from 'react';
import Login from './modules/login';
import NotFound from './views/404';
import Deck from './modules/decks/view/Index';

import { SessionContext } from './providers/session';
import LogedHeader from "./components/LogedHeader";

function App() {
  const { isLoged, setLoged, checkSession } = React.useContext(SessionContext);

  useEffect(() => {
    checkSession()
      .then(res => {
        setLoged(res);
      });
  }, []);

  const noLogedRoutes = () => {
    return <>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </>
  }

  const logedRoutes = () => {
    return <>
      <Route path="/" element={<Deck />} />
    </>
  }

  return (
    <BrowserRouter>
      <LogedHeader />
      <Routes>
        {isLoged ? logedRoutes() : noLogedRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
