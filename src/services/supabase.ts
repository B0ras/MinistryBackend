import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPAURL || "";
const supabaseKey = process.env.SUPAKEY || "";
const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })

export default supabase