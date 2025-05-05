export interface User {
  id: string;
  name: string;
  avatar: string;
  gender: 'male' | 'female';
  age: number;
  description: string;
  tags: string[];
  images: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'emoji';
}

export interface ChatPreview {
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

export interface SocialPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  createdAt: Date;
  likes: number;
  comments: Comment[];
}