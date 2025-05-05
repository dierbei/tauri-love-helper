import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/profile/${user.id}`);
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={user.images[0]} 
          alt={user.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.age}岁 · {user.gender === 'female' ? '女' : '男'}</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{user.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {user.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;