import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ChatBubble from '../components/ChatBubble';
import EmojiPicker from '../components/EmojiPicker';
import { ArrowLeft, Send, Smile } from 'lucide-react';

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, messages, currentUser, sendMessage } = useApp();
  const [input, setInput] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = users.find(u => u.id === id);
  const chatMessages = id ? messages[id] || [] : [];
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  if (!user || !id) {
    return <div className="p-4 text-center">用户不存在</div>;
  }
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleProfile = () => {
    navigate(`/profile/${user.id}`);
  };
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    setInput("");
    
    if (input.trim()) {
      // Send user message
      await sendMessage(id, input);
      setInput('');
      setIsEmojiPickerOpen(false);
    }
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji);
  };
  
  // Group messages by date for better readability
  const groupMessagesByDate = () => {
    const groups: { date: Date; messages: typeof chatMessages }[] = [];
    
    chatMessages.forEach(message => {
      const messageDate = new Date(message.timestamp);
      messageDate.setHours(0, 0, 0, 0);
      
      const existingGroup = groups.find(group => 
        group.date.getTime() === messageDate.getTime()
      );
      
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message]
        });
      }
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate();
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center z-10">
        <button
          className="p-1 mr-3 text-gray-600"
          onClick={handleBack}
        >
          <ArrowLeft size={20} />
        </button>
        <div 
          className="flex items-center flex-1 cursor-pointer"
          onClick={handleProfile}
        >
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{user.name}</h2>
            <p className="text-xs text-gray-500">{user.age}岁 · {user.gender === 'female' ? '女' : '男'}</p>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messageGroups.length > 0 ? (
          messageGroups.map((group, groupIndex) => (
            <div key={group.date.toISOString()}>
              {/* Date Separator */}
              <div className="flex justify-center my-4">
                <span className="px-4 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                  {group.date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
                </span>
              </div>
              
              {/* Messages in this group */}
              {group.messages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUser.id;
                const isFirstInSequence = index === 0 || 
                  group.messages[index - 1]?.senderId !== message.senderId;
                const avatar = isCurrentUser ? currentUser.avatar : user.avatar;
                
                return (
                  <ChatBubble 
                    key={message.id}
                    message={message}
                    isCurrentUser={isCurrentUser}
                    showAvatar={isFirstInSequence}
                    avatar={avatar}
                  />
                );
              })}
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <p className="mb-2">开始与{user.name}聊天吧</p>
            <p className="text-sm">发送第一条消息，开启美好对话~</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3 relative">
        <form onSubmit={handleSend} className="flex items-center">
          <button 
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          >
            <Smile size={22} />
          </button>
          
          <input
            type="text"
            placeholder="输入消息..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <button
            type="submit"
            className={`p-2 rounded-full ${
              input.trim() ? 'text-pink-500 hover:text-pink-600' : 'text-gray-400'
            }`}
            disabled={!input.trim()}
          >
            <Send size={22} />
          </button>
        </form>
        
        <EmojiPicker 
          isOpen={isEmojiPickerOpen} 
          onEmojiSelect={handleEmojiSelect} 
        />
      </div>
    </div>
  );
};

export default Chat;
