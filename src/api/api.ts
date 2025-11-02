import type { Sweet, Id, SearchParams } from "./types";

export interface Api {
  listSweets(): Promise<Sweet[]>;
  searchSweets(q: SearchParams): Promise<Sweet[]>;
  createSweet(data: Omit<Sweet, "id">): Promise<Sweet>;          // admin
  updateSweet(id: Id, data: Partial<Omit<Sweet,"id">>): Promise<Sweet>; // admin
  deleteSweet(id: Id): Promise<void>;                              // admin
  purchase(id: Id, qty?: number): Promise<Sweet>;                  // auth
  restock(id: Id, qty: number): Promise<Sweet>;                    // admin
}

export const NotImplemented: Api = new Proxy({} as Api, {
  get() { throw new Error("API not wired yet"); }
});
