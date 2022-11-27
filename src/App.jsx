import { BrowserRouter, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { SessionContext } from "./providers/session";
import LogedHeader from "./components/logedHeader";
import privateRoutes from "./routes/private";
import publicRoutes from "./routes/public";

function App() {
  const { isLoged, setLoged, checkSession } = React.useContext(SessionContext);

  useEffect(() => {
    checkSession().then((res) => {
      setLoged(res);
    });
  }, []);

  return (
    <BrowserRouter>
      <LogedHeader />
      <Routes> {isLoged ? privateRoutes() : publicRoutes()} </Routes>
    </BrowserRouter>
  );
}

export default App;
