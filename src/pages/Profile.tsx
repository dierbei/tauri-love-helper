import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, MessageCircle, ChevronRight } from 'lucide-react';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users } = useApp();
  
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>用户不存在</p>
        <button
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          返回
        </button>
      </div>
    );
  }
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleChat = () => {
    navigate(`/chat/${user.id}`);
  };
  
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="relative h-64">
        <img 
          src={user.images[0]} 
          alt={user.name} 
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button
            className="w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm"
            onClick={handleBack}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p>{user.age}岁 · {user.gender === 'female' ? '女' : '男'}</p>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="p-4 -mt-6 bg-white rounded-t-3xl relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">关于我</h2>
            <p className="text-gray-600">{user.description}</p>
          </div>
          <button
            className="ml-4 px-5 py-2 bg-pink-500 text-white rounded-full flex items-center shadow-md hover:bg-pink-600 transition"
            onClick={handleChat}
          >
            <MessageCircle size={18} className="mr-1" />
            聊天
          </button>
        </div>
        
        {/* Tags */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">兴趣爱好</h2>
          <div className="flex flex-wrap gap-2">
            {user.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Photos */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">照片墙</h2>
          <div className="grid grid-cols-2 gap-3">
            {user.images.map((image, index) => (
              <div key={index} className="rounded-xl overflow-hidden aspect-[4/5]">
                <img 
                  src={image} 
                  alt={`${user.name}的照片 ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;