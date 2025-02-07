"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface Character {
  name: string
  description: string
  image: string
}

interface CharacterSelectionProps {
  characters: Character[]
  nickname: string
  gameId: string
  onReplay: () => void
}

export default function CharacterSelection({ characters, nickname, gameId, onReplay }: CharacterSelectionProps) {
  const [remainingCharacters, setRemainingCharacters] = useState(characters)
  const [currentPair, setCurrentPair] = useState<[Character, Character] | null>(null)
  const [winner, setWinner] = useState<Character | null>(null)
  const [stats, setStats] = useState<{ winner: string; count: number; last_selected: string }[]>([])

  useEffect(() => {
    if (remainingCharacters.length > 1) {
      const shuffled = [...remainingCharacters].sort(() => Math.random() - 0.5)
      setCurrentPair([shuffled[0], shuffled[1]])
    } else if (remainingCharacters.length === 1) {
      setWinner(remainingCharacters[0])
    }
  }, [remainingCharacters])

  useEffect(() => {
    if (winner) {
      saveResult()
      fetchStats()
    }
  }, [winner])

  const saveResult = async () => {
    if (winner) {
      try {
        const response = await fetch("/api/save-result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId, nickname, winner: winner.name }),
        })
        if (!response.ok) {
          console.error("Failed to save result")
        }
      } catch (error) {
        console.error("Error saving result:", error)
      }
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/game-stats?gameId=${gameId}`)
      if (response.ok) {
        const { data } = await response.json()
        setStats(data)
      } else {
        console.error("Failed to fetch stats")
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleSelection = (selected: Character) => {
    if (currentPair) {
      const [first, second] = currentPair
      const eliminated = selected === first ? second : first
      setRemainingCharacters((prev) => prev.filter((char) => char !== eliminated))
    }
  }

  const shareOnTwitter = () => {
    const text = `${gameId} oyununda mükemmel karakterimi buldum: ${winner?.name}! Charming Games'de sen de kendini keşfet!`
    const url = "https://charminggames.com" // Replace with your actual website URL
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  if (winner) {
    return (
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">Tebrikler, {nickname}!</h2>
          <p className="text-xl text-purple-600 mb-6">Mükemmel {gameId} karakterin:</p>
          <div className="mb-8">
            <img
              src={winner.image || "/placeholder.svg"}
              alt={winner.name}
              className="w-64 h-64 mx-auto rounded-lg shadow-md mb-4 object-cover"
            />
            <p className="text-3xl font-bold text-purple-900 mb-2">{winner.name}</p>
            <p className="text-lg text-purple-700">{winner.description}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={onReplay}
              className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-lg"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={shareOnTwitter}
              className="bg-blue-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-300 text-lg"
            >
              Twitter'da Paylaş
            </button>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2">
          <h3 className="text-2xl font-semibold text-purple-800 mb-6">Popüler Seçimler</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.slice(0, 5)}>
              <XAxis dataKey="winner" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <ul className="mt-6">
            {stats.slice(0, 5).map((stat, index) => (
              <li key={index} className="text-lg text-purple-600 mb-2">
                {stat.winner}: {stat.count} kez
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-8">Seçimini Yap</h2>
        {currentPair && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {currentPair.map((character, index) => (
              <motion.div
                key={character.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/2"
              >
                <button
                  onClick={() => handleSelection(character)}
                  className="w-full bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    className="w-full h-256 md:h-512 mx-auto rounded-lg shadow-md mb-4 object-cover"
                  />
                  <h3 className="text-2xl font-semibold text-purple-800 mb-2">{character.name}</h3>
                  <p className="text-lg text-purple-600">{character.description}</p>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}