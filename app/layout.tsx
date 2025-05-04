import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import TabBar from "@/components/tab-bar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Love - 恋爱聊天",
  description: "与小伙伴聊天交友的平台",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col relative">
          <main className="flex-1 overflow-auto pb-16">{children}</main>
          <TabBar />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
