"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Save } from "lucide-react"

// 模拟用户数据
const USER = {
  id: "me",
  name: "鲁班八号",
  avatar: "/images/user-avatar.png?height=200&width=200",
  bio: "这是我的个人简介，可以编辑修改。",
  gender: "保密",
  age: 25,
  location: "北京",
  tags: ["音乐", "电影", "旅行", "美食", "阅读"],
}

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState(USER)
  const [newTag, setNewTag] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setUser((prev) => ({ ...prev, gender: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !user.tags.includes(newTag.trim())) {
      setUser((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setUser((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSave = () => {
    // 这里应该有保存到服务器的逻辑
    alert("设置已保存")
    router.push("/profile")
  }

  return (
    <div className="p-4">
      {/* 头部 */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">个人设置</h1>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name">昵称</Label>
          <Input id="name" name="name" value={user.name} onChange={handleChange} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="bio">个人简介</Label>
          <Textarea id="bio" name="bio" value={user.bio} onChange={handleChange} className="mt-1" rows={4} />
        </div>

        <div>
          <Label>性别</Label>
          <RadioGroup value={user.gender} onValueChange={handleGenderChange} className="mt-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="男" id="male" />
              <Label htmlFor="male">男</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="女" id="female" />
              <Label htmlFor="female">女</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="保密" id="secret" />
              <Label htmlFor="secret">保密</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="age">年龄</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={user.age.toString()}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location">所在地</Label>
          <Input id="location" name="location" value={user.location} onChange={handleChange} className="mt-1" />
        </div>

        <div>
          <Label>兴趣标签</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.tags.map((tag) => (
              <div key={tag} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                <span className="text-sm">{tag}</span>
                <button className="ml-2 text-gray-500 hover:text-red-500" onClick={() => removeTag(tag)}>
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="添加新标签"
              className="mr-2"
            />
            <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
              添加
            </Button>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save size={16} className="mr-2" />
          保存设置
        </Button>
      </div>
    </div>
  )
}
