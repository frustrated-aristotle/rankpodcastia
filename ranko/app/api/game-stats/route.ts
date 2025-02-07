import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const gameId = searchParams.get("gameId")

  if (!gameId) {
    return NextResponse.json({ error: "Game ID is required" }, { status: 400 })
  }

  const { data, error } = await supabase.from("game_results").select("winner, created_at").eq("game_id", gameId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Process the data to get the count and last selected time for each winner
  const stats = data.reduce((acc: any, curr: any) => {
    if (!acc[curr.winner]) {
      acc[curr.winner] = { count: 0, last_selected: curr.created_at }
    }
    acc[curr.winner].count++
    acc[curr.winner].last_selected =
      new Date(curr.created_at) > new Date(acc[curr.winner].last_selected)
        ? curr.created_at
        : acc[curr.winner].last_selected
    return acc
  }, {})

  // Convert to array and sort by count
  const sortedStats = Object.entries(stats)
    .map(([winner, data]: [string, any]) => ({ winner, ...data }))
    .sort((a, b) => b.count - a.count)

  return NextResponse.json({ success: true, data: sortedStats })
}

