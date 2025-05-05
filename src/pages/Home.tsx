import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Volume2, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import UserCard from '../components/UserCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useApp();

  const matchCards = [
    {
      title: '灵魂匹配',
      subtitle: '今日剩余20次',
      buttonText: '开始匹配',
      bgColor: 'from-blue-300 to-blue-400',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      title: '语音匹配',
      subtitle: '今日剩余3次',
      buttonText: '开始匹配',
      bgColor: 'from-purple-300 to-purple-400',
      image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg'
    },
    {
      title: '蒙面酒馆',
      subtitle: '今日剩余3次',
      buttonText: '进入酒馆',
      bgColor: 'from-purple-400 to-pink-400',
      image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg'
    },
    {
      title: '萌面匹配',
      subtitle: '剩余13次',
      buttonText: '开始匹配',
      bgColor: 'from-purple-300 to-indigo-400',
      image: 'https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg'
    },
    {
      title: '群聊派对',
      subtitle: '上海面基',
      buttonText: '进入派对',
      bgColor: 'from-pink-400 to-purple-400',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'
    },
    {
      title: '趣群组',
      subtitle: '一群人懂你',
      buttonText: '查看群组',
      bgColor: 'from-cyan-300 to-cyan-400',
      image: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg'
    }
  ];

  const featuredParties = [
    {
      id: '1',
      title: '闲聊喝茶',
      location: '杭州面基',
      participants: 9,
      image: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg'
    },
    {
      id: '2',
      title: '闲聊喝茶',
      location: '上海',
      participants: 6,
      image: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg'
    },
    {
      id: '3',
      title: '闲聊喝茶',
      location: '北京 面基',
      participants: 8,
      image: 'https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold ml-2">爱聊</h1>
        </div>
        <button className="p-2 rounded-full bg-gray-100">
          <Search size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Match Cards Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {matchCards.map((card, index) => (
          <div
            key={index}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${card.bgColor}`}
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
            />
            <div className="relative p-4 text-white">
              <h3 className="text-xl font-bold mb-1">{card.title}</h3>
              <p className="text-sm opacity-90 mb-4">{card.subtitle}</p>
              <button
                className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition"
                onClick={() => navigate('/discover')}
              >
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Parties */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">精选派对</h2>
          <button 
            className="text-sm text-gray-500"
            onClick={() => navigate('/parties')}
          >
            派对大厅 &gt;
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {featuredParties.map(party => (
            <div 
              key={party.id}
              className="bg-[#1a1b1e] rounded-xl p-4 text-white"
            >
              <div className="flex items-center mb-2">
                <Volume2 size={18} className="mr-2" />
                <span className="text-gray-300">闲聊喝茶</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold mb-1">{party.location}</h3>
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {[...Array(4)].map((_, i) => (
                        <img
                          key={i}
                          src="/images/user-avatar.png"
                          alt="User"
                          className="w-6 h-6 rounded-full border-2 border-[#1a1b1e]"
                        />
                      ))}
                    </div>
                    <span className="text-gray-400">{party.participants}人在线</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition">
                  进入
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover Friends */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">发现好友</h2>
          <button 
            className="text-sm text-gray-500"
            onClick={() => navigate('/discover')}
          >
            查看更多 &gt;
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {users.slice(0, 4).map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;