import Header from "@/components/Header"
import GameCard from "@/components/GameCard"

const games = [
  { id: "irritating", title: "En İtici Karakter", image: "/irritating.jpg" },
  // { id: "fav", title: "En Sevdiğin NPC", image: "/fav.jpg" },
  // { id: "intoxicating", title: "En Kafa Açan NPC", image: "/talk.jpg" },
]

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 rounded-lg">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </main>
  )
}

