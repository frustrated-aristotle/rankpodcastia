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
  const [initialized, setInitialized] = useState(false) // Track if the pair has been initialized
  const games = [
    { id: "irritating", title: "En İtici Karakter", image: "/irritating.jpg" },
    { id: "fav", title: "En Sevdiğin NPC", image: "/fav.jpg" },
    { id: "intoxicating", title: "En Kafa Açan NPC", image: "/talk.jpg" },
  ]
  const currentGame = games.find(game => game.id === gameId)

  useEffect(() => {
    if (remainingCharacters.length > 1 && !initialized) {
      const shuffled = [...remainingCharacters].sort(() => Math.random() - 0.5)
      setCurrentPair([shuffled[0], shuffled[1]])
      setInitialized(true) // Mark as initialized after the first pair is set
    } else if (remainingCharacters.length === 1) {
      setWinner(remainingCharacters[0])
    }
  }, [remainingCharacters, initialized]) // Make sure useEffect only runs when needed

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
    console.log("Selected:", selected.name);
    if (currentPair) {
      const [leftCharacter, rightCharacter] = currentPair;
      console.log("Current pair: "+leftCharacter.name+" vs "+rightCharacter.name)
      // Determine which character was selected and which was eliminated
      const eliminated = selected === leftCharacter ? rightCharacter : leftCharacter;
      console.log("Eliminated: "+eliminated.name)
      // Remove the eliminated character from the remaining characters
      const newRemainingCharacters = remainingCharacters.filter((char) => char !== eliminated);
      console.log("Remaining characters: "+newRemainingCharacters.map((char) => char.name).join(", "))
      // If there are still characters left, prepare the next pair
      if (newRemainingCharacters.length > 1) {
        // Keep the selected character on the left
        const newLeftCharacter = selected;
  
        // Randomly select a new character for the right side (excluding the selected one)
        const remainingOptions = newRemainingCharacters.filter((char) => char !== newLeftCharacter);
        const newRightCharacter = remainingOptions[Math.floor(Math.random() * remainingOptions.length)];
  
        // Set the new pair
        setCurrentPair([newLeftCharacter, newRightCharacter]);
        console.log("New pair: "+newLeftCharacter.name+" vs "+newRightCharacter.name)
      } else if (newRemainingCharacters.length === 1) {
        // If only one character remains, set it as the winner
        setWinner(newRemainingCharacters[0]);
      }
  
      // Update the remaining characters
      setRemainingCharacters(newRemainingCharacters);
    }
  };

  const shareOnTwitter = () => {
    const text = `${currentGame ? currentGame.title: ""} : ${winner?.name}! Seninki ne?`
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
        <div className="bg-white p-8 rounded-xl shadow-xl w-full md:w-1/2 border-2 border-purple-200 hover:shadow-2xl transition-shadow duration-300">
  <h3 className="text-3xl font-bold text-purple-900 mb-6">Popüler Seçimler</h3>
  
  <div className="mb-8">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={stats.slice(0, 5)}>
        <XAxis dataKey="winner" stroke="#9B4DFF" />
        <YAxis stroke="#9B4DFF" />
        <Tooltip contentStyle={{ backgroundColor: "#9B4DFF", color: "#fff" }} />
        <Bar dataKey="count" fill="#9B4DFF" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <ul className="space-y-4">
    {stats.slice(0, 5).map((stat, index) => (
      <li key={index} className="flex items-center justify-between text-lg font-medium text-purple-700 hover:text-purple-900 transition-all duration-200">
        <span>{stat.winner}</span>
        <span className="text-xl font-semibold text-purple-800">{stat.count} kez</span>
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
      <h2 className="text-3xl font-bold text-purple-800 mb-8">
        {currentGame ? currentGame.title : "Oyun Seçildi"}
      </h2>
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
                    className="w-48 h-48 mx-auto rounded-lg shadow-md mb-4 object-cover"
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
