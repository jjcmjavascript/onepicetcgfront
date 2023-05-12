import { createContext, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const checkSession = async () => {
<<<<<<< HEAD
  return new Promise((res, rej) => {
    return res(false);
=======
  return new Promise((res) => {
    return res(true);
>>>>>>> 15c8a658331758a1e9c9c4565359229b4321d608
  });
};

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isLoged, setLoged] = useState(false);

  const actions = {
    swalError: (title, html) => {
      Swal.fire({
        title: title,
        html: html,
        icon: "error",
      });
    },
    swalSuccess: (title, html) => {
      Swal.fire({
        title: title,
        html: html,
        icon: "success",
      });
    },
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoged,
        setLoged,
        checkSession,
        actions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
