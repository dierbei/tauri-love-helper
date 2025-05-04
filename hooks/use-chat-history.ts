"use client"

import { useState, useEffect } from "react"

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
}

export interface ChatHistory {
  profileId: string
  messages: ChatMessage[]
  lastUpdated: number
}

export function useChatHistory(profileId: string) {
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 加载聊天历史
  useEffect(() => {
    const loadHistory = () => {
      try {
        setIsLoading(true)
        const storedHistories = localStorage.getItem("chat_histories")
        if (storedHistories) {
          const histories: Record<string, ChatHistory> = JSON.parse(storedHistories)
          if (histories[profileId]) {
            setHistory(histories[profileId].messages)
          }
        }
      } catch (error) {
        console.error("加载聊天历史失败:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [profileId])

  // 保存消息到历史记录
  const saveMessage = (message: ChatMessage) => {
    try {
      // 更新本地状态
      setHistory((prev) => {
        const newHistory = [...prev, message]

        // 更新localStorage
        const storedHistories = localStorage.getItem("chat_histories")
        const histories: Record<string, ChatHistory> = storedHistories ? JSON.parse(storedHistories) : {}

        histories[profileId] = {
          profileId,
          messages: newHistory,
          lastUpdated: Date.now(),
        }

        localStorage.setItem("chat_histories", JSON.stringify(histories))

        return newHistory
      })
    } catch (error) {
      console.error("保存聊天消息失败:", error)
    }
  }

  // 清除历史记录
  const clearHistory = () => {
    try {
      setHistory([])

      const storedHistories = localStorage.getItem("chat_histories")
      if (storedHistories) {
        const histories: Record<string, ChatHistory> = JSON.parse(storedHistories)
        delete histories[profileId]
        localStorage.setItem("chat_histories", JSON.stringify(histories))
      }
    } catch (error) {
      console.error("清除聊天历史失败:", error)
    }
  }

  return {
    history,
    isLoading,
    saveMessage,
    clearHistory,
  }
}
