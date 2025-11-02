import React from "react";
import { api, type Sweet } from "../api";

export const InventoryPanel: React.FC<{
  onAfterChange?: (s: Sweet) => void;
  onAfterCreate?: (s: Sweet) => void;
}> = ({ onAfterChange, onAfterCreate }) => {
  const [restockId, setRestockId] = React.useState<number | "">("");
  const [restockQty, setRestockQty] = React.useState<number | "">("");
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState<number | "">("");
  const [quantity, setQuantity] = React.useState<number | "">("");
  const [msg, setMsg] = React.useState<string | null>(null);

  async function doRestock(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const id = Number(restockId);
    const qty = Number(restockQty);
    if (!id || !qty) return setMsg("Provide valid id and qty");
    try {
      const s = await api.restock(id, qty);
      onAfterChange?.(s);
      setMsg(`Restocked #${id} by ${qty}. New qty: ${s.quantity}`);
      setRestockQty("");
    } catch (e: any) { setMsg(e.message || String(e)); }
  }

  async function doCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!name || !category || price === "" || quantity === "") return setMsg("Fill all fields");
    try {
      const s = await api.createSweet({
        name, category,
        price: Number(price),
        quantity: Number(quantity)
      });
      onAfterCreate?.(s);
      setMsg(`Created ${s.name} (#${s.id})`);
      setName(""); setCategory(""); setPrice(""); setQuantity("");
    } catch (e: any) { setMsg(e.message || String(e)); }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 10px",
    border: "1px solid rgba(0,0,0,.15)", borderRadius: 8
  };

  return (
    <div style={{
      background: "#fff",
      boxShadow: "var(--sweet-elevation-1)",
      borderRadius: "var(--sweet-radius-md)",
      padding: "var(--sweet-space-3)"
    }}>
      <h3 style={{ marginBottom: 8, color: "var(--sweet-primary)" }}>Inventory (admin)</h3>

      {msg && (
        <div role="alert" style={{ background: "var(--sweet-warning)", color: "#000",
          padding: 8, borderRadius: 8, marginBottom: 12 }}>
          {msg}
        </div>
      )}

      {/* Restock */}
      <form onSubmit={doRestock}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "end" }}>
        <div>
          <label>Sweet ID</label>
          <input style={inputStyle} type="number"
            value={restockId}
            onChange={e => setRestockId(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
        <div>
          <label>Qty</label>
          <input style={inputStyle} type="number"
            value={restockQty}
            onChange={e => setRestockQty(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
        <button type="submit"
          style={{ padding: "10px 14px", borderRadius: 8, border: "none",
            background: "var(--sweet-success)", color: "#fff", cursor: "pointer" }}>
          Restock
        </button>
      </form>

      <hr style={{ margin: "16px 0", border: 0, height: 1, background: "rgba(0,0,0,.06)" }} />

      {/* Create */}
      <form onSubmit={doCreate}
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr .8fr .8fr auto", gap: 12, alignItems: "end" }}>
        <div>
          <label>Name</label>
          <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <input style={inputStyle} value={category} onChange={e => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Price</label>
          <input style={inputStyle} type="number" step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
        <div>
          <label>Qty</label>
          <input style={inputStyle} type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
        <button type="submit"
          style={{ padding: "10px 14px", borderRadius: 8, border: "none",
            background: "var(--sweet-primary)", color: "#fff", cursor: "pointer" }}>
          Add sweet
        </button>
      </form>
    </div>
  );
};
