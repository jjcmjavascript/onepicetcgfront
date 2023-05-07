import { BrowserRouter, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { GlobalContext } from "./providers/global";
import LogedHeader from "./components/logedHeader";
import privateRoutes from "./routes/private";
import publicRoutes from "./routes/public";

function App() {
  const { isLoged, setLoged, checkSession } = useContext(GlobalContext);

  useEffect(() => {
    checkSession().then((res) => {
      setLoged(res);
    });
  }, [false]);

  return (
    <BrowserRouter>
      <LogedHeader />
      <Routes> {isLoged ? privateRoutes() : publicRoutes()} </Routes>
    </BrowserRouter>
  );
}

export default App;
