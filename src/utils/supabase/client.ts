import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vuzkoqluazlvhmpleqvj.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1emtvcWx1YXpsdmhtcGxlcXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NjMzODMsImV4cCI6MjEwMDQzOTM4M30.G9JaKiQiIOeCyQMOX-xKcMI_txuw_L-8E3J0BWrtwqk'

  return createBrowserClient(
    url,
    key
  )
}
