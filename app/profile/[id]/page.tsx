"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle, Heart, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

// 模拟数据
const PROFILES = {
  "1": {
    id: "1",
    name: "小雨",
    avatar: "/images/avatar-1.png",
    age: 24,
    gender: "female",
    tags: ["阅读", "旅行", "音乐", "写作", "电影"],
    description:
      "喜欢安静的午后，一本书，一杯茶，一段音乐。热爱旅行，去过很多地方，最喜欢的城市是京都。平时喜欢写点小文章，记录生活的点滴。",
    photos: ["/images/photo-1.jpg", "/images/photo-2.jpg", "/images/photo-3.jpg"],
  },
  "2": {
    id: "2",
    name: "阳阳",
    avatar: "/images/avatar-2.png",
    age: 26,
    gender: "male",
    tags: ["健身", "摄影", "美食", "旅行", "篮球"],
    description:
      "热爱生活，喜欢尝试新事物，期待与你分享生活的美好。每周健身三次，喜欢拍照记录生活，对美食有独特的鉴赏能力。",
    photos: ["/images/photo-4.jpg", "/images/photo-5.jpg", "/images/photo-6.jpg"],
  },
  "3": {
    id: "3",
    name: "小晴",
    avatar: "/images/avatar-3.png",
    age: 23,
    gender: "female",
    tags: ["绘画", "电影", "咖啡", "摄影", "旅行"],
    description: "艺术系学生，喜欢在咖啡馆画画，周末常去看电影。梦想是环游世界，用画笔记录下每一个美好的瞬间。",
    photos: ["/images/photo-1.jpg", "/images/photo-3.jpg", "/images/photo-5.jpg"],
  },
  "4": {
    id: "4",
    name: "小明",
    avatar: "/images/avatar-4.png",
    age: 25,
    gender: "male",
    tags: ["编程", "游戏", "篮球", "电影", "音乐"],
    description: "程序员，业余时间喜欢打篮球和玩游戏。喜欢科幻电影和摇滚音乐，周末经常和朋友一起打球。",
    photos: ["/images/photo-2.jpg", "/images/photo-4.jpg", "/images/photo-6.jpg"],
  },
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const profile = PROFILES[params.id as keyof typeof PROFILES]

  if (!profile) {
    return <div className="p-4">用户不存在</div>
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div>
      <div className="relative h-72 sm:h-80 md:h-96">
        <Image src={profile.avatar || "/placeholder.svg"} alt={profile.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/70 rounded-full p-2 z-10 shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <motion.div
        className="p-4 -mt-16 relative z-10"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-500">
                {profile.age}岁 · {profile.gender === "female" ? "女生" : "男生"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "border-red-500" : ""}
              >
                <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : ""} />
              </Button>
              <Button asChild className="bg-theme hover:bg-theme/90">
                <Link href={`/chat/${profile.id}`}>
                  <MessageCircle size={20} className="mr-2" />
                  聊天
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {profile.tags.map((tag) => (
              <span key={tag} className="text-sm bg-theme-light text-theme px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">关于我</h2>
            <p className="text-gray-700">{profile.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">相册</h2>
            <div className="grid grid-cols-3 gap-2">
              {profile.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-md overflow-hidden hover-card cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`${profile.name}的照片${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="w-full" onClick={() => router.push(`/chat/${profile.id}`)}>
              <Share2 size={18} className="mr-2" />
              分享个人主页
            </Button>
          </div>
        </div>
      </motion.div>

      {/* 照片预览模态框 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full max-w-3xl max-h-[80vh]">
            <Image
              src={selectedPhoto || "/placeholder.svg"}
              alt="照片预览"
              width={1200}
              height={800}
              className="object-contain w-full h-full"
            />
            <button
              className="absolute top-4 right-4 bg-white/20 rounded-full p-2"
              onClick={() => setSelectedPhoto(null)}
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
