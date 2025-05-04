"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

// 匹配类型定义
type MatchType = {
  id: string
  title: string
  description: string
  remainingCount: number
  bgColor: string
  icon: string
  buttonText: string
  buttonLink: string
}

// 匹配数据
const MATCH_TYPES: MatchType[] = [
  {
    id: "soul",
    title: "灵魂匹配",
    description: "今日剩余20次",
    remainingCount: 20,
    bgColor: "from-blue-400 to-cyan-300",
    icon: "/images/match-soul.png",
    buttonText: "开始匹配",
    buttonLink: "/match/soul",
  },
  {
    id: "voice",
    title: "语音匹配",
    description: "今日剩余3次",
    remainingCount: 3,
    bgColor: "from-purple-400 to-pink-300",
    icon: "/images/match-voice.png",
    buttonText: "开始匹配",
    buttonLink: "/match/voice",
  },
  {
    id: "bar",
    title: "蒙面酒馆",
    description: "今日剩余3次",
    remainingCount: 3,
    bgColor: "from-purple-500 to-pink-400",
    icon: "/images/match-bar.png",
    buttonText: "进入酒馆",
    buttonLink: "/match/bar",
  },
  {
    id: "cute",
    title: "萌面匹配",
    description: "剩余13次",
    remainingCount: 13,
    bgColor: "from-purple-400 to-indigo-300",
    icon: "/images/match-cute.png",
    buttonText: "开始匹配",
    buttonLink: "/match/cute",
  },
  {
    id: "group",
    title: "群聊派对",
    description: "上海 面基",
    remainingCount: 9,
    bgColor: "from-pink-500 to-purple-400",
    icon: "/images/match-group.png",
    buttonText: "进入派对",
    buttonLink: "/match/group",
  },
  {
    id: "fun",
    title: "趣群组",
    description: "一群人懂你",
    remainingCount: 0,
    bgColor: "from-cyan-400 to-teal-300",
    icon: "/images/match-fun.png",
    buttonText: "查看群组",
    buttonLink: "/match/fun",
  },
]

export default function MatchingCards() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3">
      {MATCH_TYPES.map((match, index) => (
        <motion.div
          key={match.id}
          className={`rounded-xl overflow-hidden relative bg-gradient-to-br ${match.bgColor} p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-white text-lg font-bold">{match.title}</h3>
            <p className="text-white/80 text-sm">{match.description}</p>

            <div className="mt-auto pt-4">
              <Button asChild className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-sm" size="sm">
                <Link href={match.buttonLink}>{match.buttonText}</Link>
              </Button>
            </div>
          </div>

          {/* 装饰图标 */}
          <div className="absolute bottom-2 right-2 w-16 h-16 opacity-80">
            <Image
              src={match.icon || "/images/ghost.png"}
              alt={match.title}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* 装饰元素 */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-6 right-6 w-1 h-1 bg-white/30 rounded-full"></div>
        </motion.div>
      ))}
    </div>
  )
}
