import React, { createContext, useContext, useMemo, useState } from "react";
import { User } from "../types";

type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const AuthContextValue = useMemo(
    () => ({
      loading,
      setLoading,
      isSignedIn,
      setIsSignedIn,
      currentUser,
      setCurrentUser,
    }),
    [loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser],
  );

  return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) throw new Error("useAuthContextはAuthProvider内で使用してください");

  return context;
};
