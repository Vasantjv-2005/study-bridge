import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://iyqqfeellpairnqouctk.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5cXFmZWVsbHBhaXJucW91Y3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjEwOTgsImV4cCI6MjA2NDc5NzA5OH0.dEdhOUCPvL8Ik2M717FjhUaer3nEFIi5kf5LgjqgQyc"

export const supabase = createClient(supabaseUrl, supabaseKey)

// Client-side singleton
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }
  return supabaseClient
}
