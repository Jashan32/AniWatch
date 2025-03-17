import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  function handleLogin() {
    setIsLogInOpen(true);
  }

  return (
    <AuthContext.Provider value={{ isLogInOpen, setIsLogInOpen, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
