"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search, Plus, Bell } from "lucide-react"
import { motion } from "framer-motion"

// 模拟聊天列表数据
const CHAT_LIST = [
  {
    id: "1",
    name: "小雨",
    avatar: "/images/avatar-1.png",
    lastMessage: "今天天气真好，你有什么计划吗？",
    time: "14:30",
    unread: 0,
  },
  {
    id: "2",
    name: "阳阳",
    avatar: "/images/avatar-2.png",
    lastMessage: "周末要不要一起去打篮球？",
    time: "昨天",
    unread: 2,
  },
  {
    id: "3",
    name: "小晴",
    avatar: "/images/avatar-3.png",
    lastMessage: "我刚看了一部很棒的电影，推荐给你！",
    time: "周二",
    unread: 0,
  },
  {
    id: "4",
    name: "小明",
    avatar: "/images/avatar-4.png",
    lastMessage: "这个问题我研究了一下，可以这样解决...",
    time: "周一",
    unread: 0,
  },
  {
    id: "system",
    name: "系统通知",
    avatar: "/images/logo.png",
    lastMessage: "「Love新手福利」温馨提醒...",
    time: "13:40",
    unread: 1,
  },
  {
    id: "official",
    name: "官方号消息",
    avatar: "/images/logo.png",
    lastMessage: "欢迎来到Love！魂淡君已经...",
    time: "13:39",
    unread: 1,
  },
  {
    id: "soul",
    name: "Love空间站",
    avatar: "/images/logo.png",
    lastMessage: "[活动] Hi~欢迎来到Love...",
    time: "12:00",
    unread: 1,
  },
]

export default function ChatListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredChats = CHAT_LIST.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <Image src="/images/user-avatar.png" alt="头像" fill className="rounded-full object-cover" />
            </div>
            <span>通讯录</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-theme border-b-2 border-theme px-4 py-2">聊天</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="p-4 bg-white shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索备注、昵称或者聊天记录"
              className="pl-10 bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* 聊天列表 */}
      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"}>
        {filteredChats.map((chat) => (
          <motion.div key={chat.id} variants={item}>
            <Link href={`/chat/${chat.id}`} className="block touch-feedback">
              <div className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100">
                <div className="relative w-12 h-12 mr-3">
                  <Image
                    src={chat.avatar || "/placeholder.svg"}
                    alt={chat.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="48px"
                  />
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      {chat.unread}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{chat.lastMessage}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
