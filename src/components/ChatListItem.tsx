import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatPreview } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface ChatListItemProps {
  preview: ChatPreview;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ preview }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/chat/${preview.userId}`);
  };
  
  return (
    <div 
      className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
      onClick={handleClick}
    >
      <div className="relative mr-3">
        <img 
          src={preview.userAvatar} 
          alt={preview.userName} 
          className="w-12 h-12 rounded-full"
        />
        {preview.unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {preview.unread}
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-gray-800 truncate">{preview.userName}</h3>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(preview.timestamp), { 
              addSuffix: false,
              locale: zhCN
            })}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">{preview.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;