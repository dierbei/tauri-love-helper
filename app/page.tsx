import RecommendedProfiles from "@/components/recommended-profiles"
import MatchingCards from "@/components/matching-cards"
import FeaturedParties from "@/components/featured-parties"
import { Search } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Love" width={32} height={32} className="mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Love
          </h1>
        </div>
        <div className="flex items-center">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <Search className="w-5 h-5" />
            "adasdasdasdasdasdasd"
          </button>
        </div>
      </div>

      {/* 匹配卡片区域 */}
      <div className="mb-8">
        <MatchingCards />
      </div>

      {/* 精选派对区域 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <span className="w-1 h-5 bg-theme rounded-full mr-2"></span>
          精选派对
          <span className="ml-auto text-sm text-gray-500">派对大厅 &gt;</span>
        </h2>
        <FeaturedParties />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <span className="w-1 h-5 bg-theme rounded-full mr-2"></span>
          推荐
        </h2>
        <RecommendedProfiles />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <span className="w-1 h-5 bg-theme rounded-full mr-2"></span>
          热门
        </h2>
        <RecommendedProfiles filter="popular" />
      </div>
    </div>
  )
}
