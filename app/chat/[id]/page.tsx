"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Smile, Trash2, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import ChatLoadingBubble from "@/components/chat-loading-bubble"
import VoiceInputButton from "@/components/voice-input-button"
import { useChatHistory } from "@/hooks/use-chat-history"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

// 模拟数据
const PROFILES = {
  "1": {
    id: "1",
    name: "小雨",
    avatar: "/images/avatar-1.png",
  },
  "2": {
    id: "2",
    name: "阳阳",
    avatar: "/images/avatar-2.png",
  },
  "3": {
    id: "3",
    name: "小晴",
    avatar: "/images/avatar-3.png",
  },
  "4": {
    id: "4",
    name: "小明",
    avatar: "/images/avatar-4.png",
  },
}

// 表情列表
const EMOJIS = ["😊", "😂", "❤️", "👍", "🎉", "🌹", "🤔", "😘", "😍", "🥰"]

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const profile = PROFILES[params.id as keyof typeof PROFILES]

  // 使用聊天历史钩子
  const { history, isLoading: isLoadingHistory, saveMessage, clearHistory } = useChatHistory(params.id)

  // 转换历史记录为AI SDK格式
  const initialMessages = isFirstLoad
    ? []
    : history.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
      }))

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      profileId: params.id,
    },
    initialMessages:
      initialMessages.length > 0
        ? initialMessages
        : [
            {
              id: "welcome",
              role: "assistant",
              content: `你好，我是${profile?.name}，很高兴认识你！`,
            },
          ],
  })

  // 处理滚动隐藏/显示头部
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages-container")
    if (!chatContainer) return

    const handleScroll = () => {
      const currentScrollTop = chatContainer.scrollTop

      if (currentScrollTop > lastScrollY && currentScrollTop > 50) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollTop)
    }

    chatContainer.addEventListener("scroll", handleScroll, { passive: true })
    return () => chatContainer.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // 当历史记录加载完成时，设置初始消息
  useEffect(() => {
    if (!isLoadingHistory && isFirstLoad && history.length > 0) {
      setIsFirstLoad(false)
    }
  }, [isLoadingHistory, history, isFirstLoad])

  // 保存新消息到历史记录
  useEffect(() => {
    if (messages.length > 0 && !isLoadingHistory) {
      const lastMessage = messages[messages.length - 1]

      // 检查这条消息是否已经在历史记录中
      const existsInHistory = history.some((msg) => msg.id === lastMessage.id)

      if (!existsInHistory && lastMessage.id !== "welcome") {
        saveMessage({
          id: lastMessage.id,
          role: lastMessage.role as "user" | "assistant" | "system",
          content: lastMessage.content,
          timestamp: Date.now(),
        })
      }
    }
  }, [messages, history, isLoadingHistory, saveMessage])

  const insertEmoji = (emoji: string) => {
    const textarea = document.querySelector('input[name="message"]') as HTMLInputElement
    if (textarea) {
      const start = textarea.selectionStart || 0
      const end = textarea.selectionEnd || 0
      const newValue = textarea.value.substring(0, start) + emoji + textarea.value.substring(end)

      // 手动更新input值
      handleInputChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>)

      // 聚焦并设置光标位置
      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length
      }, 0)
    }

    // 隐藏表情选择器
    setShowEmojis(false)
  }

  // 处理语音输入
  const handleVoiceInput = (transcript: string) => {
    if (transcript) {
      handleInputChange({ target: { value: transcript } } as React.ChangeEvent<HTMLInputElement>)
      toast({
        title: "语音识别成功",
        description: `已识别: "${transcript}"`,
      })
    }
  }

  // 处理清除历史
  const handleClearHistory = () => {
    clearHistory()
    // 重新加载页面以刷新聊天
    router.refresh()
    toast({
      title: "已清除聊天记录",
      description: "所有聊天历史已被删除",
    })
  }

  // 自定义提交处理
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    handleSubmit(e)
  }

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!profile) {
    return <div className="p-4">用户不存在</div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <div
        className={`flex items-center justify-between p-4 border-b bg-white/90 header-bar transition-transform duration-300 z-10 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-3 touch-feedback">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                fill
                className="rounded-full object-cover"
                sizes="32px"
                priority
              />
            </div>
            <span className="font-medium">{profile.name}</span>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="touch-feedback">
              <Trash2 size={18} className="text-gray-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>清除聊天记录</AlertDialogTitle>
              <AlertDialogDescription>
                确定要清除与{profile.name}的所有聊天记录吗？此操作无法撤销。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearHistory} className="bg-theme hover:bg-theme/90">
                确认清除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* 聊天内容 */}
      <div
        id="chat-messages-container"
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        style={{
          backgroundImage: "url('/images/bg-pattern.png')",
          backgroundSize: "200px",
          backgroundOpacity: "0.05",
        }}
      >
        {isLoadingHistory ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme"></div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => {
              const isUser = message.role === "user"
              const showTimestamp = true // 可以根据需要调整显示时间戳的逻辑

              return (
                <motion.div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {!isUser && (
                    <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                      <Image
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="32px"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      isUser
                        ? "bg-theme text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {message.content}
                    {showTimestamp && (
                      <div className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-gray-500"}`}>
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="relative w-8 h-8 ml-2 flex-shrink-0">
                      <Image
                        src="/images/user-avatar.png"
                        alt="我"
                        fill
                        className="rounded-full object-cover"
                        sizes="32px"
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}

        {isLoading && <ChatLoadingBubble avatar={profile.avatar} name={profile.name} />}

        <div ref={messagesEndRef} />
      </div>

      {/* 表情选择器 */}
      <AnimatePresence>
        {showEmojis && (
          <motion.div
            className="p-2 border-t grid grid-cols-10 gap-2 bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                className="text-xl p-2 hover:bg-gray-100 rounded touch-feedback"
                onClick={() => insertEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 输入框 */}
      <form onSubmit={handleFormSubmit} className="border-t p-2 flex items-center bg-white pb-safe">
        <Button type="button" variant="ghost" size="icon" onClick={() => setShowEmojis(!showEmojis)}>
          <Smile size={20} />
        </Button>

        <VoiceInputButton onTranscript={handleVoiceInput} />

        <Button type="button" variant="ghost" size="icon">
          <ImageIcon size={20} />
        </Button>

        <Input
          name="message"
          value={input}
          onChange={handleInputChange}
          placeholder="输入消息..."
          className="flex-1 mx-2 bg-gray-100"
          autoComplete="off"
        />

        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className={input.trim() ? "bg-theme hover:bg-theme/90" : ""}
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  )
}
