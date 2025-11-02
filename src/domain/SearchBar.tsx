import React from "react";
import "../styles/tokens.css";

export type SearchParams = {
  name: string;
  category: string;
  minPrice?: number | "";
  maxPrice?: number | "";
};

type Props = {
  value: SearchParams;
  onChange: (next: SearchParams) => void;
};

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  const set = (patch: Partial<SearchParams>) => onChange({ ...value, ...patch });

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 120px 120px",
      gap: "var(--sweet-gap)",
      alignItems: "end",
    }}>
      <div>
        <label style={{ fontSize: "var(--sweet-text-sm)" }}>Name</label>
        <input
          aria-label="name"
          value={value.name}
          onChange={(e) => set({ name: e.target.value })}
          style={{ width: "100%", padding: "8px", borderRadius: "var(--sweet-radius-sm)" }}
        />
      </div>
      <div>
        <label style={{ fontSize: "var(--sweet-text-sm)" }}>Category</label>
        <input
          aria-label="category"
          value={value.category}
          onChange={(e) => set({ category: e.target.value })}
          style={{ width: "100%", padding: "8px", borderRadius: "var(--sweet-radius-sm)" }}
        />
      </div>
      <div>
        <label style={{ fontSize: "var(--sweet-text-sm)" }}>Min ₹</label>
        <input
          aria-label="minPrice"
          type="number"
          value={value.minPrice ?? ""}
          onChange={(e) => set({ minPrice: e.target.value === "" ? "" : Number(e.target.value) })}
          style={{ width: "100%", padding: "8px", borderRadius: "var(--sweet-radius-sm)" }}
        />
      </div>
      <div>
        <label style={{ fontSize: "var(--sweet-text-sm)" }}>Max ₹</label>
        <input
          aria-label="maxPrice"
          type="number"
          value={value.maxPrice ?? ""}
          onChange={(e) => set({ maxPrice: e.target.value === "" ? "" : Number(e.target.value) })}
          style={{ width: "100%", padding: "8px", borderRadius: "var(--sweet-radius-sm)" }}
        />
      </div>
    </div>
  );
};
