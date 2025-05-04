"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type Profile = {
  id: string
  name: string
  avatar: string
  age: number
  gender: "male" | "female"
  tags: string[]
  description: string
}

// 模拟数据
const PROFILES: Profile[] = [
  {
    id: "1",
    name: "小雨",
    avatar: "/images/avatar-1.png",
    age: 24,
    gender: "female",
    tags: ["阅读", "旅行", "音乐"],
    description: "喜欢安静的午后，一本书，一杯茶，一段音乐。",
  },
  {
    id: "2",
    name: "阳阳",
    avatar: "/images/avatar-2.png",
    age: 26,
    gender: "male",
    tags: ["健身", "摄影", "美食"],
    description: "热爱生活，喜欢尝试新事物，期待与你分享生活的美好。",
  },
  {
    id: "3",
    name: "小晴",
    avatar: "/images/avatar-3.png",
    age: 23,
    gender: "female",
    tags: ["绘画", "电影", "咖啡"],
    description: "艺术系学生，喜欢在咖啡馆画画，周末常去看电影。",
  },
  {
    id: "4",
    name: "小明",
    avatar: "/images/avatar-4.png",
    age: 25,
    gender: "male",
    tags: ["编程", "游戏", "篮球"],
    description: "程序员，业余时间喜欢打篮球和玩游戏。",
  },
]

export default function RecommendedProfiles({ filter = "all" }: { filter?: string }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "male" | "female">("all")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProfiles = PROFILES.filter((profile) => {
    if (activeFilter === "all") return true
    return profile.gender === activeFilter
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className={activeFilter === "all" ? "bg-theme hover:bg-theme/90" : ""}
        >
          全部
        </Button>
        <Button
          variant={activeFilter === "female" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("female")}
          className={activeFilter === "female" ? "bg-theme hover:bg-theme/90" : ""}
        >
          女生
        </Button>
        <Button
          variant={activeFilter === "male" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("male")}
          className={activeFilter === "male" ? "bg-theme hover:bg-theme/90" : ""}
        >
          男生
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
      >
        {filteredProfiles.map((profile) => (
          <motion.div key={profile.id} variants={item}>
            <Link href={`/profile/${profile.id}`} className="block">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow hover-card">
                <div className="relative h-40 bg-gray-100">
                  <Image
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{profile.name}</h3>
                    <span className="text-sm text-gray-500">{profile.age}岁</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {profile.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-theme-light text-theme px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
