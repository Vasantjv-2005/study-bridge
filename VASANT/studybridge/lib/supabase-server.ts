import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://iyqqfeellpairnqouctk.supabase.co"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5cXFmZWVsbHBhaXJucW91Y3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjEwOTgsImV4cCI6MjA2NDc5NzA5OH0.dEdhOUCPvL8Ik2M717FjhUaer3nEFIi5kf5LgjqgQyc"

// Server-side client
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)
