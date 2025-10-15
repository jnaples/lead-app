import { createContext, useContext, useState } from "react";

const CreditContext = createContext();

export function CreditsProvider({ children }) {
  const [credits, setCredits] = useState(1);

  return (
    <CreditContext.Provider value={{ credits, setCredits }}>
      {children}
    </CreditContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCredits must be used within a Credits Provider");
  }
  return context;
}
