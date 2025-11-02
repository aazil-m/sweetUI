import type { Api } from "./api";
import type { Sweet, Id, SearchParams } from "./types";

let store: Sweet[] = [
  { id: 1, name: "Gulab Jamun", category: "Indian", price: 0.5, quantity: 5 },
  { id: 2, name: "Baklava",     category: "Arabic", price: 1.2, quantity: 12 }
];

function matches(s: Sweet, q: SearchParams) {
  if (q.name && !s.name.toLowerCase().includes(q.name.toLowerCase())) return false;
  if (q.category && s.category !== q.category) return false;
  if (q.minPrice != null && s.price < q.minPrice) return false;
  if (q.maxPrice != null && s.price > q.maxPrice) return false;
  return true;
}

export const MockApi: Api = {
  async listSweets() { return structuredClone(store); },
  async searchSweets(q) { return store.filter(s => matches(s, q)); },
  async createSweet(data) {
    const id = Math.max(...store.map(s => Number(s.id))) + 1;
    const sweet = { id, ...data };
    store.push(sweet);
    return structuredClone(sweet);
  },
  async updateSweet(id, data) {
    const i = store.findIndex(s => String(s.id) === String(id));
    if (i === -1) throw new Error("Not found");
    store[i] = { ...store[i], ...data };
    return structuredClone(store[i]);
  },
  async deleteSweet(id) {
    store = store.filter(s => String(s.id) !== String(id));
  },
  async purchase(id, qty = 1) {
    const i = store.findIndex(s => String(s.id) === String(id));
    if (i === -1) throw new Error("Not found");
    if (store[i].quantity < qty) throw new Error("Insufficient stock");
    store[i].quantity -= qty;
    return structuredClone(store[i]);
  },
  async restock(id, qty) {
    const i = store.findIndex(s => String(s.id) === String(id));
    if (i === -1) throw new Error("Not found");
    store[i].quantity += qty;
    return structuredClone(store[i]);
  }
};
