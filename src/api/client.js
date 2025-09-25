import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_KEY,
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
});

export default client