// src/App.tsx
import "./styles/tokens.css";
import React from "react";
import Dashboard from "./pages/Dashboard"; // ← make sure the file exists
import { Card } from "./components/Card";
import { Button } from "./components/Button";

export default function App() {
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
        SweetUI — Dashboard
      </h1>

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
