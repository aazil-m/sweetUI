import React from "react";
import "../styles/tokens.css";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export type Sweet = {
  id: number | string;
  name: string;
  category: string;
  price: number;     // per unit
  quantity: number;  // current stock
};

type Props = {
  sweet: Sweet;
  onPurchase?: (id: Sweet["id"]) => void;
};

export const SweetCard: React.FC<Props> = ({ sweet, onPurchase }) => {
  const outOfStock = sweet.quantity <= 0;

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--sweet-gap)" }}>
        <div>
          <div style={{ fontSize: "var(--sweet-text-md)", color: "var(--sweet-primary)" }}>
            {sweet.name}
          </div>
          <div style={{ fontSize: "var(--sweet-text-sm)", opacity: 0.8 }}>
            {sweet.category} • ₹{sweet.price.toFixed(2)}
          </div>
          <div style={{ marginTop: "var(--sweet-space-1)" }}>
            Stock: <strong data-testid="qty">{sweet.quantity}</strong>
          </div>
        </div>

        <div style={{ alignSelf: "center" }}>
          <Button
            variant={outOfStock ? "warning" : "primary"}
            disabled={outOfStock}
            aria-label="purchase"
            onClick={() => onPurchase?.(sweet.id)}
            style={outOfStock ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
          >
            {outOfStock ? "Out of stock" : "Purchase"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
