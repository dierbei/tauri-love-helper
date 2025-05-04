"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, MessageCircle, User, Home } from "lucide-react"
import { useEffect, useState } from "react"

export default function TabBar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 处理滚动隐藏/显示底部导航栏
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const tabs = [
    { name: "星球", path: "/", icon: Home },
    { name: "广场", path: "/square", icon: Globe },
    {
      name: "发布",
      path: "/publish",
      icon: () => (
        <div className="w-12 h-12 rounded-full bg-theme flex items-center justify-center -mt-5 shadow-lg">
          <span className="text-white text-xs">发布瞬间</span>
        </div>
      ),
    },
    { name: "聊天", path: "/chat", icon: MessageCircle },
    { name: "自己", path: "/profile", icon: User },
  ]

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 border-t border-gray-200 flex justify-between items-center px-2 py-1 transition-transform duration-300 tab-bar pb-safe z-50 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.path
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`flex flex-col items-center justify-center py-1 touch-feedback ${
              isActive ? "text-theme" : "text-gray-500"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-xs mt-1">{tab.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
