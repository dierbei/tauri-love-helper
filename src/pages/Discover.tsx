import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SocialPost as SocialPostType } from '../types';
import UserCard from '../components/UserCard';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Heart, MessageCircle, Send } from 'lucide-react';





interface SocialPostProps {
  post: SocialPostType;
}

const Discover: React.FC<SocialPostProps> = ({ post }) => {
  const { users } = useApp();
  const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  
  useEffect(() => {
    let result = users;
    
    // Apply gender filter
    if (filter !== 'all') {
      result = result.filter(user => user.gender === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredUsers(result);
  }, [users, filter, searchTerm]);
  
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">发现好友</h1>
      
      {/* Search & Filter */}
      <div className="mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="搜索名称、标签或描述..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'all' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('all')}
          >
            全部
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'female' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('female')}
          >
            女生
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'male' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('male')}
          >
            男生
          </button>
        </div>
      </div>
      
      {/* User Cards */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到符合条件的用户</p>
        </div>
      )}
    </div>
  );

};

export default Discover;

