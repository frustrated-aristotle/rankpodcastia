import Link from "next/link"
import Image from "next/image"

interface GameCardProps {
  id: string
  title: string
  image: string
}

export default function GameCard({ id, title, image }: GameCardProps) {
  return (
    <Link href={`/game/${id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold text-purple-800 mb-2">{title}</h2>
          <p className="text-purple-600">Macerana başla!</p>
        </div>
      </div>
    </Link>
  )
}

