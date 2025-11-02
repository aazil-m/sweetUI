import React from "react";
import "../styles/tokens.css";
import { Button } from "../components/Button";
import type { Id } from "./types";

type Props = {
  sweetId: Id;
  onPurchase: (id: Id) => void;
  onRestock?: (id: Id, amount: number) => void; // admin-only later
};

export const InventoryPanel: React.FC<Props> = ({ sweetId, onPurchase, onRestock }) => {
  const [qty, setQty] = React.useState(1);

  return (
    <div style={{ display: "flex", gap: "var(--sweet-gap)", alignItems: "center" }}>
      <Button onClick={() => onPurchase(sweetId)}>Purchase 1</Button>

      {onRestock && (
        <>
          <input
            aria-label="restock-qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            style={{ width: 80, padding: 8, borderRadius: "var(--sweet-radius-sm)" }}
          />
          <Button variant="success" onClick={() => onRestock(sweetId, qty)}>Restock</Button>
        </>
      )}
    </div>
  );
};
