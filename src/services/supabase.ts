import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPAURL || "";
const supabaseKey = process.env.SUPAKEY || "";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase