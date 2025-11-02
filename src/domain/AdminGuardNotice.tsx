import React from "react";

export const AdminGuardNotice: React.FC = () => (
  <div
    role="alert"
    style={{
      padding: "var(--sweet-space-2)",
      borderRadius: "var(--sweet-radius-sm)",
      background: "var(--sweet-warning)",
      color: "black",
    }}
  >
    Admin access required to view this section.
  </div>
);
