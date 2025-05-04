"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Mic, Gift, ImageIcon, Smile } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"

// 派对数据
const PARTIES = {
  party1: {
    id: "party1",
    title: "闲聊喝茶",
    location: "上海 面基",
    tags: ["闲聊", "交友"],
    onlineCount: 9,
    members: [
      { id: "1", name: "小雨", avatar: "/images/avatar-1.png", isHost: true },
      { id: "2", name: "阳阳", avatar: "/images/avatar-2.png", isHost: false },
      { id: "3", name: "小晴", avatar: "/images/avatar-3.png", isHost: false },
      { id: "4", name: "小明", avatar: "/images/avatar-4.png", isHost: false },
      { id: "5", name: "用户5", avatar: "/images/user-avatar.png", isHost: false },
      { id: "6", name: "用户6", avatar: "/images/avatar-1.png", isHost: false },
      { id: "7", name: "用户7", avatar: "/images/avatar-2.png", isHost: false },
      { id: "8", name: "用户8", avatar: "/images/avatar-3.png", isHost: false },
      { id: "9", name: "用户9", avatar: "/images/avatar-4.png", isHost: false },
    ],
    messages: [
      { id: "m1", userId: "1", content: "大家好，欢迎来到闲聊喝茶派对~", timestamp: "14:30" },
      { id: "m2", userId: "2", content: "你们平时喜欢喝什么茶？", timestamp: "14:31" },
      { id: "m3", userId: "3", content: "我比较喜欢乌龙茶，口感清香", timestamp: "14:32" },
      { id: "m4", userId: "4", content: "我喜欢普洱，醇厚回甘", timestamp: "14:33" },
      { id: "m5", userId: "system", content: "用户5加入了派对", timestamp: "14:35" },
    ],
  },
  party2: {
    id: "party2",
    title: "五一搭子请进",
    location: "上海",
    tags: ["旅行", "五一"],
    onlineCount: 6,
    members: [
      { id: "3", name: "小晴", avatar: "/images/avatar-3.png", isHost: true },
      { id: "4", name: "小明", avatar: "/images/avatar-4.png", isHost: false },
      { id: "1", name: "小雨", avatar: "/images/avatar-1.png", isHost: false },
      { id: "2", name: "阳阳", avatar: "/images/avatar-2.png", isHost: false },
      { id: "5", name: "用户5", avatar: "/images/user-avatar.png", isHost: false },
      { id: "6", name: "用户6", avatar: "/images/avatar-1.png", isHost: false },
    ],
    messages: [
      { id: "m1", userId: "3", content: "大家好，五一有什么出行计划吗？", timestamp: "15:30" },
      { id: "m2", userId: "4", content: "我打算去杭州玩几天", timestamp: "15:31" },
      { id: "m3", userId: "1", content: "我想去苏州，有一起的吗？", timestamp: "15:32" },
      { id: "m4", userId: "2", content: "我也想去苏州！可以一起啊", timestamp: "15:33" },
    ],
  },
  party3: {
    id: "party3",
    title: "周末剧本杀",
    location: "北京 面基",
    tags: ["游戏", "剧本杀"],
    onlineCount: 8,
    members: [
      { id: "2", name: "阳阳", avatar: "/images/avatar-2.png", isHost: true },
      { id: "1", name: "小雨", avatar: "/images/avatar-1.png", isHost: false },
      { id: "4", name: "小明", avatar: "/images/avatar-4.png", isHost: false },
      { id: "3", name: "小晴", avatar: "/images/avatar-3.png", isHost: false },
      { id: "5", name: "用户5", avatar: "/images/user-avatar.png", isHost: false },
      { id: "6", name: "用户6", avatar: "/images/avatar-1.png", isHost: false },
      { id: "7", name: "用户7", avatar: "/images/avatar-2.png", isHost: false },
      { id: "8", name: "用户8", avatar: "/images/avatar-3.png", isHost: false },
    ],
    messages: [
      { id: "m1", userId: "2", content: "周末有人一起玩剧本杀吗？", timestamp: "16:30" },
      { id: "m2", userId: "1", content: "我想玩！有什么推荐的本子吗？", timestamp: "16:31" },
      { id: "m3", userId: "4", content: "《十字路口》不错，悬疑向的", timestamp: "16:32" },
      { id: "m4", userId: "3", content: "我也想参加，第一次玩需要准备什么吗？", timestamp: "16:33" },
    ],
  },
}

export default function PartyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 加载派对数据
    const partyData = PARTIES[params.id as keyof typeof PARTIES]
    if (partyData) {
      setMessages(partyData.messages)
      setMembers(partyData.members)
      setIsLoaded(true)
    }
  }, [params.id])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: `m${messages.length + 1}`,
      userId: "5", // 当前用户ID
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const partyData = PARTIES[params.id as keyof typeof PARTIES]
  if (!partyData) {
    return <div className="p-4">派对不存在</div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-900 text-white">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="font-medium">{partyData.title}</h1>
          <p className="text-xs text-gray-300">
            {partyData.location} · {partyData.onlineCount}人在线
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-white">
          邀请
        </Button>
      </div>

      {/* 聊天内容 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const sender = members.find((m) => m.id === msg.userId) || { name: "系统", avatar: "/images/logo.png" }
          const isSystem = msg.userId === "system"

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center">
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">{msg.content}</span>
              </div>
            )
          }

          return (
            <motion.div
              key={msg.id}
              className="flex items-start gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={sender.avatar || "/placeholder.svg"}
                  alt={sender.name}
                  fill
                  className="rounded-full object-cover"
                />
                {sender.isHost && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-3 h-3 border-2 border-white"></div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium">{sender.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{msg.timestamp}</span>
                </div>
                <div className="bg-white p-2 rounded-lg mt-1 shadow-sm">{msg.content}</div>
              </div>
            </motion.div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 在线成员列表 */}
      <div className="p-2 border-t bg-white">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center flex-shrink-0">
              <div className="relative w-10 h-10">
                <Image
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
                {member.isHost && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-3 h-3 border-2 border-white"></div>
                )}
              </div>
              <span className="text-xs mt-1 whitespace-nowrap">{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSendMessage} className="border-t p-2 flex items-center bg-white">
        <Button type="button" variant="ghost" size="icon">
          <Smile size={20} />
        </Button>

        <Button type="button" variant="ghost" size="icon">
          <ImageIcon size={20} />
        </Button>

        <Button type="button" variant="ghost" size="icon">
          <Gift size={20} />
        </Button>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="发送消息..."
          className="flex-1 mx-2 bg-gray-100"
        />

        <Button type="button" variant="ghost" size="icon">
          <Mic size={20} />
        </Button>

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className={message.trim() ? "bg-theme hover:bg-theme/90" : ""}
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  )
}
