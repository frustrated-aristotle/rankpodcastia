import GameComponent from "@/components/GameComponent"

export default function GamePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <GameComponent gameId={params.id} />
    </div>
  )
}

