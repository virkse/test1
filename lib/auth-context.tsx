"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getServerToken,
  getStoredToken,
  setStoredToken,
  setUnauthorizedHandler,
  subscribeAuth,
} from "@/lib/api/companies";

type AuthContextValue = {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const token = useSyncExternalStore(
    subscribeAuth,
    getStoredToken,
    getServerToken,
  );

  const signOut = useCallback(() => {
    setStoredToken(null);
  }, []);

  const signIn = useCallback((next: string) => {
    setStoredToken(next);
  }, []);

  setUnauthorizedHandler(signOut);

  const value = useMemo(
    () => ({ token, signIn, signOut }),
    [token, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
