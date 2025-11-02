import type { SupabaseClient } from "@supabase/supabase-js";
import type { Api } from "./api";
import type { Sweet, Id, SearchParams } from "./types";
import { supabase as sharedClient } from "../auth/supabaseClient";

/** Map DB row → Sweet (coerce numeric to number) */
function mapSweet(row: any): Sweet {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: typeof row.price === "string" ? Number(row.price) : row.price,
    quantity: row.quantity,
  };
}

export class SupabaseApi implements Api {
  private sb: SupabaseClient;

  // Prefer the shared client (carries the auth session). url/anonKey kept only for test overrides.
  constructor(_url?: string, _anonKey?: string, sb?: SupabaseClient) {
    this.sb = sb ?? sharedClient;
  }

  /** READ */
  async listSweets(): Promise<Sweet[]> {
    const { data, error } = await this.sb
      .from("sweets")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapSweet);
  }

  async searchSweets(q: SearchParams): Promise<Sweet[]> {
    let query = this.sb.from("sweets").select("*");

    if (q.name) query = query.ilike("name", `%${q.name}%`);
    if (q.category) query = query.eq("category", q.category);
    if (q.minPrice != null) query = query.gte("price", Number(q.minPrice));
    if (q.maxPrice != null) query = query.lte("price", Number(q.maxPrice));

    const { data, error } = await query.order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapSweet);
  }

  /** ADMIN CRUD (guarded by RLS) */
  async createSweet(data: Omit<Sweet, "id">): Promise<Sweet> {
    const { data: rows, error } = await this.sb
      .from("sweets")
      .insert({
        name: data.name,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return mapSweet(rows);
  }

  async updateSweet(id: Id, patch: Partial<Omit<Sweet, "id">>): Promise<Sweet> {
    const { data, error } = await this.sb
      .from("sweets")
      .update(patch)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return mapSweet(data);
  }

  async deleteSweet(id: Id): Promise<void> {
    const { error } = await this.sb.from("sweets").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }

  /** TRANSACTIONS via RPC (RLS-safe) */
  async purchase(id: Id, qty = 1): Promise<Sweet> {
    const { data, error } = await this.sb
      .rpc("purchase_sweet", { sweet_id: Number(id), qty })
      .single();

    if (error) throw new Error(error.message);
    return mapSweet(data);
  }

  async restock(id: Id, qty: number): Promise<Sweet> {
    const { data, error } = await this.sb
      .rpc("restock_sweet", { sweet_id: Number(id), qty })
      .single();

    if (error) throw new Error(error.message);
    return mapSweet(data);
  }
}



    