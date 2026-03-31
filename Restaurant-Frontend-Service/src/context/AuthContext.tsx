import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Owner } from "../types/auth.types";
import { TOKEN_KEY } from "../utils/constants";

interface AuthContextType {
  token: string | null;
  owner: Owner | null;
  setAuthData: (token: string, owner: Owner) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedOwner = localStorage.getItem("restaurant_owner_data");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedOwner) {
      setOwner(JSON.parse(savedOwner));
    }
  }, []);

  const setAuthData = (newToken: string, newOwner: Owner) => {
    setToken(newToken);
    setOwner(newOwner);

    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem("restaurant_owner_data", JSON.stringify(newOwner));
  };

  const logout = () => {
    setToken(null);
    setOwner(null);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("restaurant_owner_data");
  };

  const value = useMemo(
    () => ({
      token,
      owner,
      setAuthData,
      logout,
    }),
    [token, owner]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};