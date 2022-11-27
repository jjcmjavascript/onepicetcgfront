import React, { createContext, useState } from "react";

const checkSession = async () => {
  return new Promise((res, rej) => {
    return res(true);
  });
};

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [isLoged, setLoged] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        isLoged,
        setLoged,
        checkSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };
