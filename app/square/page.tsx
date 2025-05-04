"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Heart, MessageCircle, Search, Share2, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

// 模拟广场数据
const SQUARE_POSTS = [
  {
    id: "1",
    userId: "1",
    userName: "小雨",
    userAvatar: "/images/avatar-1.png",
    content: "今天去了一家新开的咖啡馆，环境很不错，推荐给大家~",
    images: ["/images/post-1.jpg"],
    likes: 42,
    comments: 8,
    time: "2小时前",
    isLiked: false,
  },
  {
    id: "2",
    userId: "3",
    userName: "小晴",
    userAvatar: "/images/avatar-3.png",
    content: "分享一幅我最近画的水彩画，希望大家喜欢！",
    images: ["/images/post-2.jpg", "/images/post-3.jpg"],
    likes: 78,
    comments: 15,
    time: "昨天",
    isLiked: true,
  },
  {
    id: "3",
    userId: "2",
    userName: "阳阳",
    userAvatar: "/images/avatar-2.png",
    content: "周末爬山拍的照片，风景真的太美了！下次一定要再去。",
    images: ["/images/post-4.jpg", "/images/post-4.jpg", "/images/post-4.jpg"],
    likes: 56,
    comments: 12,
    time: "3天前",
    isLiked: false,
  },
]

export default function SquarePage() {
  const [posts, setPosts] = useState(SQUARE_POSTS)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

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
    <div className="pb-4">
      {/* 头部 */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b header-bar">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            广场
          </h1>
          <div className="flex space-x-3">
            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
              <Search size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* 帖子列表 */}
      <motion.div className="space-y-6" variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"}>
        {posts.map((post) => (
          <motion.div key={post.id} className="border-b pb-4 bg-white" variants={item}>
            {/* 用户信息 */}
            <div className="flex items-center p-4">
              <Link href={`/profile/${post.userId}`} className="touch-feedback">
                <div className="relative w-10 h-10 mr-3">
                  <Image
                    src={post.userAvatar || "/placeholder.svg"}
                    alt={post.userName}
                    fill
                    className="rounded-full object-cover"
                    sizes="40px"
                  />
                </div>
              </Link>

              <div>
                <Link href={`/profile/${post.userId}`}>
                  <h3 className="font-medium">{post.userName}</h3>
                </Link>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>

            {/* 内容 */}
            <div className="px-4 mb-3">
              <p>{post.content}</p>
            </div>

            {/* 图片 */}
            <div
              className={`px-4 mb-4 grid ${
                post.images.length === 1 ? "grid-cols-1" : post.images.length === 2 ? "grid-cols-2" : "grid-cols-3"
              } gap-2`}
            >
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    post.images.length === 1 ? "aspect-video" : "aspect-square"
                  } bg-gray-100 rounded-md overflow-hidden hover-card cursor-pointer`}
                  onClick={() => setSelectedPhoto(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${post.userName}的图片${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>

            {/* 操作栏 */}
            <div className="flex justify-around px-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={post.isLiked ? "text-red-500" : ""}
              >
                <Heart size={18} className={`mr-1 ${post.isLiked ? "fill-red-500" : ""}`} />
                {post.likes}
              </Button>

              <Button variant="ghost" size="sm" asChild>
                <Link href={`/square/post/${post.id}`}>
                  <MessageCircle size={18} className="mr-1" />
                  {post.comments}
                </Link>
              </Button>

              <Button variant="ghost" size="sm">
                <Share2 size={18} className="mr-1" />
                分享
              </Button>
            </div>
          </motion.div>
        ))}
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
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPhoto(null)
              }}
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
