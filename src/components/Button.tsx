import React from "react";
import "../styles/tokens.css";

type ButtonVariant = "primary" | "success" | "warning";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  style,
  ...rest
}) => {
  const background = {
    primary: "var(--sweet-primary)",
    success: "var(--sweet-success)",
    warning: "var(--sweet-warning)",
  }[variant];

  const color = variant === "warning" ? "black" : "white";

  return (
    <button
      {...rest}
      style={{
        background,
        color,
        border: "1px solid transparent",
        borderRadius: "var(--sweet-radius-sm)",
        padding: "8px 16px",
        cursor: "pointer",
        fontFamily: "var(--sweet-font-family)",
        fontSize: "var(--sweet-text-sm)",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
