import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  const { gameId, nickname, winner } = await request.json()

  // Get the current timestamp
  const created_at = new Date().toISOString()

  const { data, error } = await supabase
    .from("game_results")
    .insert([
      {
        game_id: gameId,
        nickname,
        winner,
        created_at, // Explicitly include the timestamp
      },
    ])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}

