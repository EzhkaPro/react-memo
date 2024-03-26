import { createContext, useState } from "react";

const initialState = {
  easyMode: false,
  level: null,
  setLevel: () => {},
  setEasyMode: () => {},
};

export const GameContext = createContext(initialState);

export const GameProvider = ({ children }) => {
  const [easyMode, setEasyMode] = useState(false);

  return <GameContext.Provider value={{ easyMode, setEasyMode }}>{children}</GameContext.Provider>;
};
