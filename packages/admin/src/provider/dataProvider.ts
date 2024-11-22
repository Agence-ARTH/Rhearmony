import { supabaseDataProvider } from "ra-supabase";
import { supabaseClient } from "./supabaseClient";

const instanceUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const dataProvider = supabaseDataProvider({
    instanceUrl,
    apiKey,
    supabaseClient,
});
