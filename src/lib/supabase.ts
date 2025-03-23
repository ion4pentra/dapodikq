import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the Supabase client with error handling
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn(
      "Supabase credentials missing. Using mock client for development.",
    );
    // Create a mock client for development that won't throw errors
    supabaseInstance = {
      auth: {
        signInWithPassword: async () => ({ data: {}, error: null }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
          error: null,
        }),
        resetPasswordForEmail: async () => ({ error: null }),
        updateUser: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            order: () => ({ data: [], error: null }),
          }),
          order: () => ({ data: [], error: null }),
        }),
        insert: () => ({
          select: () => ({ single: async () => ({ data: null, error: null }) }),
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
        }),
        delete: () => ({ eq: () => ({ error: null }) }),
      }),
    } as any;
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error);
  // Provide a fallback mock client
  supabaseInstance = {} as any;
}

export const supabase = supabaseInstance!;
