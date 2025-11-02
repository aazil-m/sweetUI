import React from "react";
import { supabase } from "./supabaseClient";

export type UserRole = "user" | "admin" | null;

export async function fetchRole(): Promise<UserRole> {
  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData.session?.user?.id;
  if (!uid) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", uid)
    .maybeSingle();

  if (error) throw error;
  return (data?.role as UserRole) ?? "user";
}

type RoleState = { role: UserRole; loading: boolean; error?: string };

const RoleContext = React.createContext<RoleState>({
  role: null,
  loading: true,
});

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = React.useState<RoleState>({ role: null, loading: true });

  React.useEffect(() => {
    let cancelled = false;
    fetchRole()
      .then((role) => !cancelled && setState({ role, loading: false }))
      .catch((e: any) =>
        !cancelled && setState({ role: null, loading: false, error: e.message || String(e) })
      );
    return () => {
      cancelled = true;
    };
  }, []);

  return <RoleContext.Provider value={state}>{children}</RoleContext.Provider>;
};

export function useRole() {
  return React.useContext(RoleContext);
}
