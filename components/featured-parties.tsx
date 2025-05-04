"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Volume2 } from "lucide-react"

// 派对类型定义
type Party = {
  id: string
  title: string
  location: string
  tags: string[]
  onlineCount: number
  avatars: string[]
}

// 派对数据
const PARTIES: Party[] = [
  {
    id: "party1",
    title: "闲聊喝茶",
    location: "上海 面基",
    tags: ["闲聊", "交友"],
    onlineCount: 9,
    avatars: ["/images/avatar-1.png", "/images/avatar-2.png", "/images/avatar-3.png", "/images/avatar-4.png"],
  },
  {
    id: "party2",
    title: "五一搭子请进",
    location: "上海",
    tags: ["旅行", "五一"],
    onlineCount: 6,
    avatars: ["/images/avatar-3.png", "/images/avatar-4.png", "/images/avatar-1.png", "/images/avatar-2.png"],
  },
  {
    id: "party3",
    title: "周末剧本杀",
    location: "北京 面基",
    tags: ["游戏", "剧本杀"],
    onlineCount: 8,
    avatars: ["/images/avatar-2.png", "/images/avatar-1.png", "/images/avatar-4.png", "/images/avatar-3.png"],
  },
]

export default function FeaturedParties() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {PARTIES.map((party, index) => (
        <motion.div
          key={party.id}
          className="rounded-xl overflow-hidden relative bg-gray-900 p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-2">
              <Volume2 size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-400 text-sm">闲聊喝茶</span>
            </div>

            <h3 className="text-white text-lg font-bold">{party.location}</h3>

            <div className="flex items-center mt-4">
              <div className="flex -space-x-2">
                {party.avatars.slice(0, 4).map((avatar, i) => (
                  <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-900">
                    <Image src={avatar || "/placeholder.svg"} alt="用户头像" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-gray-400 text-sm ml-2">{party.onlineCount}人在线</span>

              <Button asChild className="ml-auto bg-white/20 hover:bg-white/30 text-white" size="sm">
                <Link href={`/party/${party.id}`}>进入</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
