import React from 'react';
import { useApp } from '../context/AppContext';
import ChatListItem from '../components/ChatListItem';
import { Search } from 'lucide-react';

const ChatList: React.FC = () => {
  const { chatPreviews } = useApp();
  
  return (
    <div className="h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">消息</h1>
        
        <div className="relative">
          <input
            type="text"
            placeholder="搜索聊天记录..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {chatPreviews.length > 0 ? (
        <div>
          {chatPreviews.map(preview => (
            <ChatListItem key={preview.userId} preview={preview} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无聊天记录</p>
          <p className="text-sm text-gray-400 mt-2">去发现页面寻找新朋友开始聊天吧！</p>
        </div>
      )}
    </div>
  );
};

export default ChatList;