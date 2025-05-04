"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, Edit, Camera, LogOut } from "lucide-react"

// 模拟用户数据
const USER = {
  id: "me",
  name: "我的昵称",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "这是我的个人简介，可以编辑修改。",
  gender: "保密",
  age: 25,
  location: "北京",
  tags: ["音乐", "电影", "旅行", "美食", "阅读"],
}

export default function ProfilePage() {
  const [user, setUser] = useState(USER)

  return (
    <div>
      {/* 头部 */}
      <div className="relative h-48 bg-gradient-to-r from-cyan-500 to-blue-500">
        <Link href="/profile/settings" className="absolute top-4 right-4 bg-white/70 rounded-full p-2">
          <Settings size={20} />
        </Link>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative w-32 h-32">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              fill
              className="rounded-full border-4 border-white object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-2 text-white">
              <Camera size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 用户信息 */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-500 mt-1">ID: {user.id}</p>

        <div className="flex justify-center mt-4">
          <Button asChild variant="outline" size="sm" className="mr-2">
            <Link href="/profile/edit">
              <Edit size={16} className="mr-1" />
              编辑资料
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <LogOut size={16} className="mr-1" />
            退出登录
          </Button>
        </div>

        <div className="mt-6 text-left">
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="text-lg font-semibold mb-2">个人简介</h2>
            <p className="text-gray-700">{user.bio}</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="text-lg font-semibold mb-2">基本信息</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-500">性别</p>
                <p>{user.gender}</p>
              </div>
              <div>
                <p className="text-gray-500">年龄</p>
                <p>{user.age}岁</p>
              </div>
              <div>
                <p className="text-gray-500">所在地</p>
                <p>{user.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">兴趣标签</h2>
            <div className="flex flex-wrap gap-2">
              {user.tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
