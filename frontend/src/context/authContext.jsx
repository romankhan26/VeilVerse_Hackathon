import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setUser as storeUser } from "../utils/auth";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use your hook directly here (not inside another function)
  const { user: fetchedUser, isLoading, error } = useCurrentUser();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    if (error) {
      console.error("Error fetching user:", error);
    }

    if (fetchedUser) {
      setUser(fetchedUser);
      storeUser(fetchedUser); // Save to local storage
    }

    setLoading(isLoading);
  }, [fetchedUser, isLoading, error]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
