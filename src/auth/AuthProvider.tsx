import React from "react";
import { getSession, onAuthChange, signOut as supaSignOut } from "./auth";

type AuthState = { isAuthed: boolean; loading: boolean };
const AuthCtx = React.createContext<AuthState>({ isAuthed: false, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = React.useState<AuthState>({ isAuthed: false, loading: true });

  React.useEffect(() => {
    getSession().then((s) => setState({ isAuthed: !!s, loading: false }));
    return onAuthChange((isAuthed) => setState({ isAuthed, loading: false }));
  }, []);

  return <AuthCtx.Provider value={state}>{children}</AuthCtx.Provider>;
};

export function useAuth() {
  return React.useContext(AuthCtx);
}

export async function signOut() {
  await supaSignOut();
}
