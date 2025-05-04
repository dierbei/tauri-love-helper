"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void
}

export default function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [isInitializing, setIsInitializing] = useState(false)

  useEffect(() => {
    // 检查浏览器是否支持语音识别
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
    }
  }, [])

  const toggleRecording = async () => {
    if (!isSupported) {
      toast({
        title: "不支持语音输入",
        description: "您的浏览器不支持语音识别功能",
        variant: "destructive",
      })
      return
    }

    if (isRecording) {
      stopRecording()
      return
    }

    try {
      setIsInitializing(true)

      // 请求麦克风权限
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // 创建语音识别实例
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = "zh-CN"
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
        stopRecording()
      }

      recognition.onerror = (event) => {
        console.error("语音识别错误:", event.error)
        toast({
          title: "语音识别失败",
          description: `错误: ${event.error}`,
          variant: "destructive",
        })
        stopRecording()
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      // 开始录音
      recognition.start()
      setIsRecording(true)

      // 显示提示
      toast({
        title: "开始录音",
        description: "请说话...",
      })
    } catch (error) {
      console.error("语音识别初始化失败:", error)
      toast({
        title: "无法访问麦克风",
        description: "请确保您已授予麦克风访问权限",
        variant: "destructive",
      })
    } finally {
      setIsInitializing(false)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  if (!isSupported) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() =>
          toast({
            title: "不支持语音输入",
            description: "您的浏览器不支持语音识别功能",
            variant: "destructive",
          })
        }
      >
        <MicOff size={20} className="text-gray-400" />
      </Button>
    )
  }

  if (isInitializing) {
    return (
      <Button type="button" variant="ghost" size="icon" disabled>
        <Loader2 size={20} className="animate-spin" />
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleRecording}
      className={isRecording ? "voice-recording text-red-500" : ""}
    >
      <Mic size={20} />
    </Button>
  )
}
