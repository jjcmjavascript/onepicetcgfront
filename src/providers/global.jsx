import { createContext, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const checkSession = async () => {
  return new Promise((res) => {
    return res(true);
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
