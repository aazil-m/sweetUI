// src/pages/Dashboard.tsx
import React from "react";
import { api, type Sweet } from "../api";
import { SweetCard } from "../domain/SweetCard";
import { SearchBar, type SearchParams } from "../domain/SearchBar";

export default function Dashboard() {
  const [items, setItems] = React.useState<Sweet[]>([]);
  const [q, setQ] = React.useState<SearchParams>({ name: "", category: "", minPrice: "", maxPrice: "" });

  React.useEffect(() => { api.listSweets().then(setItems); }, []);

  async function onSearch() {
    const res = await api.searchSweets({
      name: q.name || undefined,
      category: q.category || undefined,
      minPrice: q.minPrice === "" ? undefined : Number(q.minPrice),
      maxPrice: q.maxPrice === "" ? undefined : Number(q.maxPrice),
    });
    setItems(res);
  }

  return (
    <div>
      <SearchBar value={q} onChange={(next) => setQ(next)} />
      <button onClick={onSearch} style={{ marginTop: 12 }}>Search</button>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {items.map(s => (
          <SweetCard
            key={s.id}
            sweet={s}
            onPurchase={async (id) => {
              const updated = await api.purchase(id, 1);
              setItems(prev => prev.map(p => p.id === id ? updated : p));
            }}
          />
        ))}
      </div>
    </div>
  );
}
