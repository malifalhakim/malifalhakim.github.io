import { createClient } from '@supabase/supabase-js'

export function getClient() {
    return createClient(
        process.env.PUBLIC_SUPABASE_URL!,
        process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    )
}