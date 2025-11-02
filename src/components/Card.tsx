import React from "react";
import "../styles/tokens.css";

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ title, children, style }) => (
  <div
    style={{
      background: "#fff",                          // 👈 white card on light surface
      boxShadow: "var(--sweet-elevation-1)",
      borderRadius: "var(--sweet-radius-md)",
      padding: "var(--sweet-space-3)",
      ...style,
    }}
  >
    {title && (
      <h2
        style={{
          fontSize: "var(--sweet-text-md)",
          marginBottom: "var(--sweet-space-2)",
          color: "var(--sweet-primary)",
          fontFamily: "var(--sweet-font-family)",
        }}
      >
        {title}
      </h2>
    )}
    {children}
  </div>
);
