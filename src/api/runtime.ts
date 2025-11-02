import type { Api } from "./api";
import { MockApi } from "./api.mock";
import { SupabaseApi } from "./api.supabase";

let api: Api = MockApi;

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (url && key) {
  api = new SupabaseApi(url, key);
}

export { api };
