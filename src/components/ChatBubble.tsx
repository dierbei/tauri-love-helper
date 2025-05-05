import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface ChatBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showAvatar: boolean;
  avatar: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isCurrentUser, 
  showAvatar,
  avatar
}) => {
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { 
    addSuffix: true,
    locale: zhCN
  });

  // 处理消息中的表情符号
  const formatMessage = (content: string) => {
    // 简单的表情符号替换
    const emojis: Record<string, string> = {
      ':\\)': '😊',
      ':\\(': '😔',
      ':D': '😁',
      ';\\)': '😉',
      ':P': '😜',
      '<3': '❤️'
    };
    
    let formattedContent = content;
    Object.entries(emojis).forEach(([code, emoji]) => {
      formattedContent = formattedContent.replace(new RegExp(code, 'g'), emoji);
    });
    
    return formattedContent;
  };

  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && showAvatar && (
        <div className="flex-shrink-0 mr-3">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}
      
      <div className="max-w-[70%]">
        <div 
          className={`rounded-2xl px-4 py-2 break-words shadow-sm ${
            isCurrentUser 
              ? 'bg-pink-500 text-white rounded-tr-none' 
              : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
          }`}
        >
          <p className="text-sm">{formatMessage(message.content)}</p>
        </div>
        <p className={`text-xs mt-1 text-gray-500 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
          {formattedTime}
        </p>
      </div>
      
      {isCurrentUser && showAvatar && (
        <div className="flex-shrink-0 ml-3">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;