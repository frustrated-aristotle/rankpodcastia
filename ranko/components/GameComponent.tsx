"use client"

import { useState } from "react"
import NicknameForm from "./NicknameForm"
import CharacterSelection from "./CharacterSelection"

const mockCharacters = {
  irritating: [
    { name: "Glenn", description: "Katlet sen, boşver gitsin aldırma", image: "/glenn.png" },
    { name: "Derbaş Dermanhan", description: "Bana hiçbir şey olmaz adam", image: "/derbas.png" },
    {name: "Reyhan",description: "Ölüm",image: "/reyhan.png",},
    { name: "Cico", description: "Esnaf Gnome", image: "/cico.png" },//+
    { name: "Anancı Timsah", description: "Dandik Kertik", image: "/kertik.jpg" },//+
    { name: "Special Force", description: "Kızıl Kader'in operasyon ekibi", image: "/specialforce.jpg" },//+
    { name: "Yaşlı Büyücü", description: "Gözü yok, ejderha bilen yaşlı büyücü", image: "/buyucu.jpg" },//+
    { name: "Korsan Kabasaka", description: "Yarrrrrrr, ravvvvvv", image: "/kabasakaa.jpg" },//+
    { name: "Yusuf Abi", description: "Tavşanlı'nın marulu", image: "/yusuf.png" },//+
    { name: "Kara Malek", description: "Sen mutluluk masalında kara bir Malek", image: "/karamalek.png" },//+
    { name: "Hakan Meyvecioğlu", description: "Viyyuuuuuuuğğğğğğaaaarrr", image: "/hakan.jpg" },//+
    { name: "SevilŞuleNihan", description: "Annanecim", image: "/sevil.png" },//+
    { name: "Juan Bueono", description: "Yauv", image: "/juan.jpg" },
    { name: "Bahubali", description: "Kaplanlı zorba", image: "/bahubali.png" },
    { name: "Sertaç", description: "Peltek berber", image: "/sertac.png" },
    { name: "Canısı Abi", description: "Woflgang'in katili", image: "/canisi.png" },
  
  ],
  favnpc: [
    { name: "Glenn", description: "Katlet sen, boşver gitsin aldırma", image: "/glenn.png" },
    { name: "Derbaş Dermanhan", description: "Bana hiçbir şey olmaz adam", image: "/derbas.png" },
    {name: "Reyhan",description: "Ölüm",image: "/reyhan.png",},
    { name: "Cico", description: "Esnaf Gnome", image: "/cico.png" },//+
    { name: "Anancı Timsah", description: "Dandik Kertik", image: "/kertik.jpg" },//+
    { name: "Special Force", description: "Kızıl Kader'in operasyon ekibi", image: "/specialforce.jpg" },//+
    { name: "Yaşlı Büyücü", description: "Gözü yok, ejderha bilen yaşlı büyücü", image: "/buyucu.jpg" },//+
    { name: "Korsan Kabasaka", description: "Yarrrrrrr, ravvvvvv", image: "/kabasakaa.jpg" },//+
    { name: "Yusuf Abi", description: "Tavşanlı'nın marulu", image: "/yusuf.png" },//+
    { name: "Kara Malek", description: "Sen mutluluk masalında kara bir Malek", image: "/karamalek.png" },//+
    { name: "Hakan Meyvecioğlu", description: "Viyyuuuuuuuğğğğğğaaaarrr", image: "/hakan.jpg" },//+
    { name: "SevilŞuleNihan", description: "Annanecim", image: "/sevil.png" },//+
    { name: "Juan Bueono", description: "Yauv", image: "/juan.jpg" },
    { name: "Bahubali", description: "Kaplanlı zorba", image: "/bahubali.png" },
    { name: "Sertaç", description: "Peltek berber", image: "/sertac.png" },
    { name: "Canısı Abi", description: "Woflgang'in katili", image: "/canisi.png" },
  
   ],
   intoxicating: [
    { name: "Glenn", description: "Katlet sen, boşver gitsin aldırma", image: "/glenn.png" },
    { name: "Derbaş Dermanhan", description: "Bana hiçbir şey olmaz adam", image: "/derbas.png" },
    { name: "Reyhan",description: "Ölüm",image: "/reyhan.png",},
    { name: "Cico", description: "Esnaf Gnome", image: "/cico.png" },//+
    { name: "Anancı Timsah", description: "Dandik Kertik", image: "/kertik.jpg" },//+
    { name: "Special Force", description: "Kızıl Kader'in operasyon ekibi", image: "/specialforce.jpg" },//+
    { name: "Yaşlı Büyücü", description: "Gözü yok, ejderha bilen yaşlı büyücü", image: "/buyucu.jpg" },//+
    { name: "Korsan Kabasaka", description: "Yarrrrrrr, ravvvvvv", image: "/kabasakaa.jpg" },//+
    { name: "Yusuf Abi", description: "Tavşanlı'nın marulu", image: "/yusuf.png" },//+
    { name: "Kara Malek", description: "Sen mutluluk masalında kara bir Malek", image: "/karamalek.png" },//+
    { name: "Hakan Meyvecioğlu", description: "Viyyuuuuuuuğğğğğğaaaarrr", image: "/hakan.jpg" },//+
    { name: "SevilŞuleNihan", description: "Annanecim", image: "/sevil.png" },//+
    { name: "Juan Bueono", description: "Yauv", image: "/juan.jpg" },
    { name: "Bahubali", description: "Kaplanlı zorba", image: "/bahubali.png" },
    { name: "Sertaç", description: "Peltek berber", image: "/sertac.png" },
    { name: "Canısı Abi", description: "Woflgang'in katili", image: "/canisi.png" },
   ],
}

export default function GameComponent({ gameId }: { gameId: string }) {
  const [nickname, setNickname] = useState("")
  const [gameStarted, setGameStarted] = useState(false)

  const handleNicknameSubmit = (submittedNickname: string) => {
    setNickname(submittedNickname)
    setGameStarted(true)
  }

  const handleReplay = () => {
    setGameStarted(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        {!gameStarted ? (
          <NicknameForm onSubmit={handleNicknameSubmit} />
        ) : (
          <CharacterSelection
            characters={mockCharacters[gameId as keyof typeof mockCharacters]}
            nickname={nickname}
            gameId={gameId}
            onReplay={handleReplay}
          />
        )}
      </div>
    </div>
  )
}

