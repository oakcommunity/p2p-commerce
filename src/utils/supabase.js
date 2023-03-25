import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// are you crazy? A key in a public repo?
// haha - these keys are public anyway
const supabaseUrl = "https://vgexlqtksrqetaheuyrk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZXhscXRrc3JxZXRhaGV1eXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk3MDg5ODYsImV4cCI6MTk5NTI4NDk4Nn0.pCqFIoLhFcKgeNZnxgym9fmHwrAZmuY2ZqZqQ-BPtGA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
