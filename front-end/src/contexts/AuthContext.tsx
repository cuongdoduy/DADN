import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

// Define the AuthContext state type
interface AuthContextType {
  isAuthenticated: boolean | null;
  handleLogin: () => void;
  handleLogout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that provides the authentication state
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const refreshToken = Cookies.get("refresh_token");
    setIsAuthenticated(refreshToken ? true : false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication state
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
