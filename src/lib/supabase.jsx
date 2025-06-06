import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Les variables d'environnement Supabase ne sont pas définies !");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
