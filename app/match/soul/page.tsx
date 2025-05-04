"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

// 模拟匹配数据
const MATCH_PROFILES = [
  {
    id: "m1",
    name: "小雨",
    age: 24,
    avatar: "../../images/avatar-1.png",
    tags: ["阅读", "旅行", "音乐"],
    compatibility: 95,
  },
  {
    id: "m2",
    name: "小晴",
    age: 23,
    avatar: "/images/avatar-3.png",
    tags: ["绘画", "电影", "咖啡"],
    compatibility: 87,
  },
  {
    id: "m3",
    name: "阳阳",
    age: 26,
    avatar: "/images/avatar-2.png",
    tags: ["健身", "摄影", "美食"],
    compatibility: 82,
  },
  {
    id: "m4",
    name: "小明",
    age: 25,
    avatar: "/images/avatar-4.png",
    tags: ["编程", "游戏", "篮球"],
    compatibility: 78,
  },
]

export default function SoulMatchPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"right" | "left" | null>(null)
  const [isMatching, setIsMatching] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<(typeof MATCH_PROFILES)[0] | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const currentProfile = MATCH_PROFILES[currentIndex]

  const handleSwipe = (dir: "right" | "left") => {
    setDirection(dir)

    // 如果是喜欢，有机会匹配成功
    if (dir === "right" && Math.random() > 0.5) {
      setMatchedProfile(currentProfile)
      setIsMatching(true)
    } else {
      // 延迟切换到下一个卡片
      setTimeout(() => {
        if (currentIndex < MATCH_PROFILES.length - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          // 所有卡片都已经滑完
          setCurrentIndex(0) // 重新开始
        }
        setDirection(null)
      }, 300)
    }
  }

  if (!isLoaded) {
    return <div className="min-h-screen bg-gradient-to-b from-blue-400 to-cyan-300 p-4"></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-cyan-300 p-4">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="bg-white/20 rounded-full p-2">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">灵魂匹配</h1>
        <div className="w-10"></div> {/* 占位 */}
      </div>

      {/* 匹配卡片区域 */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <AnimatePresence>
          {!isMatching && currentProfile && (
            <motion.div
              key={currentProfile.id}
              className="absolute w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative h-80">
                <Image
                  src={currentProfile.avatar || "/placeholder.svg"}
                  alt={currentProfile.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-white text-2xl font-bold">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentProfile.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white/30 text-white px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">灵魂契合度</div>
                  <div className="text-lg font-bold text-theme">{currentProfile.compatibility}%</div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${currentProfile.compatibility}%` }}
                  ></div>
                </div>

                <div className="flex justify-center gap-6 mt-6">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-16 w-16 border-2 border-gray-300"
                    onClick={() => handleSwipe("left")}
                  >
                    <X size={30} className="text-gray-400" />
                  </Button>

                  <Button
                    size="lg"
                    className="rounded-full h-16 w-16 bg-gradient-to-r from-pink-500 to-red-500"
                    onClick={() => handleSwipe("right")}
                  >
                    <Heart size={30} className="text-white" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 没有更多卡片时显示 */}
        {!isMatching && !currentProfile && (
          <div className="text-center text-white">
            <p className="text-xl mb-4">今日匹配次数已用完</p>
            <Button onClick={() => router.back()} variant="outline" className="text-white border-white">
              返回首页
            </Button>
          </div>
        )}
      </div>

      {/* 匹配成功弹窗 */}
      <AnimatePresence>
        {isMatching && matchedProfile && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative mb-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                  <Heart size={40} className="text-white fill-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8">匹配成功！</h2>
              <p className="text-gray-600 mt-2">
                你与{matchedProfile.name}灵魂契合度高达{matchedProfile.compatibility}%
              </p>

              <div className="flex justify-center mt-6 space-x-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-pink-100">
                  <Image src="/images/user-avatar.png" alt="我" fill className="object-cover" />
                </div>
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-pink-100">
                  <Image
                    src={matchedProfile.avatar || "/placeholder.svg"}
                    alt={matchedProfile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  onClick={() => router.push(`/chat/${matchedProfile.id}`)}
                >
                  立即聊天
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsMatching(false)
                    setMatchedProfile(null)
                    setCurrentIndex((currentIndex + 1) % MATCH_PROFILES.length)
                  }}
                >
                  继续匹配
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
