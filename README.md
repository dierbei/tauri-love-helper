# Love - 恋爱聊天APP

一个基于 Vite 和 Tauri 开发的跨平台聊天应用，提供 AI 驱动的聊天体验。

## 功能特点

- 💬 流畅的实时对话体验
- 🎨 现代化的用户界面
- 📱 支持移动端和桌面端

## 技术栈

- **前端框架**: Vite
- **UI 组件**: Radix UI + Tailwind CSS
- **桌面端**: Tauri 2.0
- **AI 对话**: DeepSeek API
- **开发语言**: TypeScript

## 开始使用

### 环境要求

- Node.js 18+ 
- Rust 1.70+

### 安装步骤

1. 克隆项目
```bash
git clone git@github.com:dierbei/tauri-love-helper.git
cd tauri-love-helper
```

2. 启动开发服务器
```bash
npm run build
npm install --save-dev @tauri-apps/cli
npm run tauri dev
```

### 构建应用

```bash
# 构建 Web 版本
npm run build

# 构建桌面应用
npm run tauri build

# 构建 Android 应用
npm run tauri android build -- --target aarch64
```

### Android 构建要求

- Android SDK
- Android NDK
- Java Development Kit (JDK) 17+
- Android Studio (用于调试)

确保已设置以下环境变量：
- `ANDROID_HOME` 或 `ANDROID_SDK_ROOT`
- `JAVA_HOME`
- `NDK_HOME`

## 许可证

[MIT License](LICENSE)

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。