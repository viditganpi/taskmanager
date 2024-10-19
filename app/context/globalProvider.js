"use client";

import React, { createContext, useContext, useReducer, useState } from "react";
import themes from "./themes";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];

  return (
    <GlobalContext.Provider value={theme}>
      <GlobalContextUpdate.Provider value={setSelectedTheme}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);