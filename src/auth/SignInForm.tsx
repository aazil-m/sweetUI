import React from "react";
import { signIn, signUp } from "./auth";
import "../styles/tokens.css";

export const SignInForm: React.FC = () => {
  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") await signIn(email, password);
      else await signUp(email, password);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--sweet-surface)",
        fontFamily: "var(--sweet-font-family)",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          background: "#fff",
          boxShadow: "var(--sweet-elevation-2)",
          borderRadius: "var(--sweet-radius-lg)",
          padding: "var(--sweet-space-4)",
          width: "100%",
          maxWidth: 420,
        }}
      >
        <h2
          style={{
            color: "var(--sweet-primary)",
            fontSize: "var(--sweet-text-lg)",
            marginBottom: "var(--sweet-space-3)",
          }}
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </h2>

        {error && (
          <div
            role="alert"
            style={{
              background: "var(--sweet-warning)",
              color: "#000",
              padding: 10,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        <label style={{ display: "block", marginBottom: 6 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: "var(--sweet-radius-sm)",
            marginBottom: "var(--sweet-space-2)",
            fontSize: "var(--sweet-text-sm)",
          }}
        />

        <label style={{ display: "block", marginBottom: 6 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: "var(--sweet-radius-sm)",
            marginBottom: "var(--sweet-space-3)",
            fontSize: "var(--sweet-text-sm)",
          }}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button
            disabled={loading}
            type="submit"
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: "var(--sweet-radius-md)",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: "var(--sweet-primary)",
              color: "#fff",
              fontWeight: 600,
              transition: "transform 0.1s ease, opacity 0.2s ease",
              opacity: loading ? 0.6 : 1,
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </button>

          <button
            type="button"
            onClick={() =>
              setMode(mode === "signin" ? "signup" : "signin")
            }
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: "var(--sweet-radius-md)",
              border: "1px solid rgba(0,0,0,0.15)",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              transition: "transform 0.1s ease, background 0.2s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            {mode === "signin" ? "Create account" : "Use existing"}
          </button>
        </div>
      </form>
    </div>
  );
};
