import Image from "next/image"

interface ChatLoadingBubbleProps {
  avatar: string
  name: string
}

export default function ChatLoadingBubble({ avatar, name }: ChatLoadingBubbleProps) {
  return (
    <div className="flex justify-start">
      <div className="relative w-8 h-8 mr-2 flex-shrink-0">
        <Image src={avatar || "/placeholder.svg"} alt={name} fill className="rounded-full object-cover" />
      </div>
      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[70%]">
        <div className="flex space-x-2 items-center h-6">
          <div className="typing-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="text-xs text-gray-500">{name}正在输入...</span>
        </div>
      </div>
    </div>
  )
}
