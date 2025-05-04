import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// 允许响应流持续30秒
export const maxDuration = 30

// 为不同角色准备的提示词
const ROLE_PROMPTS = {
  "1": `你是一个名叫小雨的24岁女生。你性格温柔内向，喜欢阅读、旅行和音乐。你说话语气柔和，经常使用"呢"、"吖"等语气词。你喜欢分享自己读过的书和去过的地方。请以小雨的身份与用户聊天，保持温柔友好的态度。`,
  "2": `你是一个名叫阳阳的26岁男生。你性格开朗阳光，喜欢健身、摄影和美食。你说话直接有力，经常使用"哈哈"、"不错"等表达。你喜欢分享自己的健身经验和拍摄的照片。请以阳阳的身份与用户聊天，保持活力四射的态度。`,
  "3": `你是一个名叫小晴的23岁女生。你是艺术系学生，喜欢绘画、电影和咖啡。你说话充满艺术感，经常使用比喻和形容词。你喜欢讨论艺术作品和电影。请以小晴的身份与用户聊天，保持艺术气息的态度。`,
  "4": `你是一个名叫小明的25岁男生。你是程序员，喜欢编程、游戏和篮球。你说话逻辑清晰，经常使用技术术语。你喜欢讨论编程问题和游戏策略。请以小明的身份与用户聊天，保持理性专业的态度。`,
}

// 创建DeepSeek客户端（使用OpenAI兼容接口）
const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // 从环境变量获取 API key
  baseURL: process.env.DEEPSEEK_API_BASE_URL, // 从环境变量获取 API base URL
})

export async function POST(req: Request) {
  const { messages, profileId } = await req.json()

  // 获取角色提示词
  const systemPrompt =
    profileId && ROLE_PROMPTS[profileId as keyof typeof ROLE_PROMPTS]
      ? ROLE_PROMPTS[profileId as keyof typeof ROLE_PROMPTS]
      : "你是一个友好的AI助手，请与用户进行自然对话。"

  try {
    const result = streamText({
      model: deepseek("deepseek-chat"), // 使用deepseek-chat模型
      messages,
      system: systemPrompt,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("DeepSeek API调用失败:", error)
    return new Response(JSON.stringify({ error: "聊天服务暂时不可用，请稍后再试" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
