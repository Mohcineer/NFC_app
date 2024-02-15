import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wpzpojflvjljlqtnmfmp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwenBvamZsdmpsamxxdG5tZm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2MDY2ODQsImV4cCI6MjAyMzE4MjY4NH0.A0jhyuLh4lnClqRlB1Dt3pxQg1hZsGEsYa4GkNb8hrg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})