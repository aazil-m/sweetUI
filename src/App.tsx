import "./styles/tokens.css";
import React from "react";
import Dashboard from "./pages/Dashboard";
import { Card } from "./components/Card";
import { Button } from "./components/Button";
import { AuthProvider, useAuth, signOut } from "./auth/AuthProvider";
import { RoleProvider, useRole } from "./auth/roles";
import { InventoryPanel } from "./admin/InventoryPanel";

// lazy sign-in form
const SignInForm = React.lazy(() =>
  import("./auth/SignInForm").then(m => ({ default: m.SignInForm }))
);

function Shell() {
  const { isAuthed, loading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (loading || roleLoading) {
    return <div style={{ padding: "var(--sweet-space-4)" }}>Loading…</div>;
  }

  if (!isAuthed) {
    return (
      <div
        style={{
          background: "var(--sweet-surface)",
          minHeight: "100vh",
          padding: "var(--sweet-space-4)",
          fontFamily: "var(--sweet-font-family)",
        }}
      >
        <h1
          style={{
            color: "var(--sweet-primary)",
            fontSize: "var(--sweet-text-lg)",
            marginBottom: "var(--sweet-space-3)",
          }}
        >
          SweetUI — Sign in
        </h1>
        <React.Suspense fallback={<div>Loading sign-in…</div>}>
          <SignInForm />
        </React.Suspense>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--sweet-surface)",
        minHeight: "100vh",
        padding: "var(--sweet-space-4)",
        fontFamily: "var(--sweet-font-family)",
        display: "grid",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "var(--sweet-primary)", fontSize: "var(--sweet-text-lg)" }}>
          SweetUI — Dashboard
        </h1>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>

      {role === "admin" && <InventoryPanel />}

      <Dashboard />

      <Card title="Token-driven Components" style={{ marginTop: "var(--sweet-space-3)" }}>
        <div style={{ display: "flex", gap: "var(--sweet-gap)" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <Shell />
      </RoleProvider>
    </AuthProvider>
  );
}
