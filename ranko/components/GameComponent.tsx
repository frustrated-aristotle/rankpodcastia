"use client"

import { useState } from "react"
import NicknameForm from "./NicknameForm"
import CharacterSelection from "./CharacterSelection"

const mockCharacters = {
  irritating: [
    { name: "Glenn", description: "Katlet sen, boşver gitsin aldırma", image: "/glenn.png" },
    { name: "Derbaş Dermanhan", description: "Bana hiçbir şey olmaz adam", image: "/derbas.png" },
    {
      name: "Reyhan",
      description: "Ölüm",
      image: "/reyhan.png",
    },
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
  // fav: [
  //   { name: "Astronot", description: "Uzayı keşfeden cesur kaşif", image: "/astronaut.jpg" },
  //   { name: "Uzaylı", description: "Başka bir gezegenden gelen ziyaretçi", image: "/alien.jpg" },
  //   { name: "Robot", description: "Uzay görevlerinde yardımcı olan yapay zeka", image: "/robot.jpg" },
  //   { name: "Uzay Kaptanı", description: "Uzay gemisinin lider komutanı", image: "/space-captain.jpg" },
  //   { name: "Kozmik Kaşif", description: "Galaksileri keşfeden maceraperest", image: "/cosmic-explorer.jpg" },
  // ],
  // intoxicating: [
  //   { name: "Aslan", description: "Ormanların güçlü kralı", image: "/lion.jpg" },
  //   { name: "Fil", description: "Büyük ve akıllı orman sakini", image: "/elephant.jpg" },
  //   { name: "Zürafa", description: "Uzun boylu ve zarif hayvan", image: "/giraffe.jpg" },
  //   { name: "Penguen", description: "Buzulların sevimli yüzücüsü", image: "/penguin.jpg" },
  //   { name: "Yunus", description: "Okyanusların neşeli akrobatı", image: "/dolphin.jpg" },
  // ],
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

