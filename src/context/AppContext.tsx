import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Message, SocialPost, ChatPreview } from '../types';
import { mockUsers, mockChatPreviews, mockSocialPosts } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  users: User[];
  chatPreviews: ChatPreview[];
  socialPosts: SocialPost[];
  messages: Record<string, Message[]>;
  updateUser: (user: User) => void;
  sendMessage: (userId: string, content: string) => Promise<void>;
  addSocialPost: (post: Omit<SocialPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
}

const defaultUser: User = {
  id: 'current-user',
  name: '我(鲁班八号)',
  avatar: '/images/user-avatar.png',
  gender: 'male',
  age: 28,
  description: '一桥飞架南北，天堑变通途',
  tags: ['真实', '善良', '健康', '快乐'],
  images: [
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>(mockChatPreviews);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(mockSocialPosts);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  useEffect(() => {
    const initialMessages: Record<string, Message[]> = {};
    users.forEach(user => {
      initialMessages[user.id] = [];
    });
    setMessages(initialMessages);
  }, [users]);

  const updateUser = (user: User) => {
    setCurrentUser(user);
  };

  const sendMessage = async (userId: string, content: string): Promise<void> => {
    // Add user message to local state
    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: userId,
      content,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), userMessage]
    }));

    // Update chat preview
    setChatPreviews(prev => 
      prev.map(preview => 
        preview.userId === userId 
          ? {...preview, lastMessage: content, timestamp: new Date()} 
          : preview
      )
    );

    try {
      // Fetch previous messages for the user to maintain context
      const messageHistory = [...(messages[userId] || []), userMessage];
      
      // Prepare the conversation context for DeepSeek
      const conversationContext = messageHistory.map(message => ({
        role: message.senderId === currentUser.id ? 'user' : 'assistant',
        content: message.content
      }));

      // Add your prompt (system message) to ensure DeepSeek maintains context
      const systemPrompt = `模拟平时和朋友聊天或者来搭讪的人，你是一个${users.find(u => u.id === userId)?.name}，年龄${users.find(u => u.id === userId)?.age}岁。你的兴趣爱好包括${users.find(u => u.id === userId)?.tags?.join('、')}。你的性格特点：${users.find(u => u.id === userId)?.description}。请以亲切、自然的方式与用户聊天，符合你的人设和性格特点。保持对话轻松愉快，不要出现心里活动、表情、动作，就是真实和人聊天。`;

      // Send the conversation context to DeepSeek API along with the system prompt
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-60c22bf8b1a44a7cbffef1ef6584813a`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversationContext
          ]
        })
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Add AI response to local state
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: userId,
        receiverId: currentUser.id,
        content: aiResponse,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => ({
        ...prev,
        [userId]: [...(prev[userId] || []), aiMessage]
      }));

      // Update chat preview with AI response
      setChatPreviews(prev => 
        prev.map(preview => 
          preview.userId === userId 
            ? {...preview, lastMessage: aiResponse, timestamp: new Date()} 
            : preview
        )
      );
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);

      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: userId,
        receiverId: currentUser.id,
        content: '网络似乎有问题，稍后再试一下吧~',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => ({
        ...prev,
        [userId]: [...(prev[userId] || []), fallbackMessage]
      }));
    }
  };

  const addSocialPost = (post: Omit<SocialPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      ...post,
      createdAt: new Date(),
      likes: 0,
      comments: []
    };

    setSocialPosts(prev => [newPost, ...prev]);
  };

  const toggleLike = (postId: string) => {
    setSocialPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? {...post, likes: post.likes + 1} 
          : post
      )
    );
  };

  const addComment = (postId: string, content: string) => {
    setSocialPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                userId: currentUser.id,
                userName: currentUser.name,
                userAvatar: currentUser.avatar,
                content,
                createdAt: new Date()
              }
            ]
          };
        }
        return post;
      })
    );
  };

  const value = {
    currentUser,
    users,
    chatPreviews,
    socialPosts,
    messages,
    updateUser,
    sendMessage,
    addSocialPost,
    toggleLike,
    addComment
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
