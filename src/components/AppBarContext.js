import React, { createContext, useState } from "react";

export const AppBarContext = createContext();

export const AppBarProvider = ({ children }) => {
  const [secondElem, setSecondElem] = useState(null);

  return (
    <AppBarContext.Provider value={{ secondElem, setSecondElem }}>
      {children}
    </AppBarContext.Provider>
  );
};
