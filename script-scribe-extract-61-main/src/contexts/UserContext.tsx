
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User type
type User = {
  email: string;
  name?: string;
  isLoggedIn: boolean;
} | null;

// Context type
type UserContextType = {
  user: User;
  login: (email: string, name?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name?: string) => {
    const userData = { email, name, isLoggedIn: true };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user?.isLoggedIn,
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
