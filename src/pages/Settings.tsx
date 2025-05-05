import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User as UserIcon, Lock, Bell, Moon, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const Settings: React.FC = () => {
  const { currentUser, updateUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);
  
  const handleSave = () => {
    updateUser(editedUser);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedUser(currentUser);
    setIsEditing(false);
  };
  
  // 模拟添加新的标签
  const handleAddTag = () => {
    const newTags = [
      '电影', '游戏', '运动', '旅行', '音乐', '阅读', 
      '美食', '摄影', '绘画', '舞蹈', '编程', '健身'
    ];
    
    const existingTags = new Set(editedUser.tags);
    let availableTags = newTags.filter(tag => !existingTags.has(tag));
    
    if (availableTags.length === 0) {
      return; // No more tags to add
    }
    
    const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)];
    setEditedUser({
      ...editedUser,
      tags: [...editedUser.tags, randomTag]
    });
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setEditedUser({
      ...editedUser,
      tags: editedUser.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const menuItems = [
    { icon: <Lock size={20} />, label: '隐私设置', path: '/privacy' },
    { icon: <Bell size={20} />, label: '通知设置', path: '/notifications' },
    { icon: <Moon size={20} />, label: '夜间模式', path: '/theme', toggle: true },
    { icon: <HelpCircle size={20} />, label: '帮助与反馈', path: '/help' },
    { icon: <LogOut size={20} />, label: '退出登录', path: '/logout', danger: true }
  ];
  
  return (
    <div className="pb-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 pt-10 pb-6 text-white">
        <div className="flex items-center">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-20 h-20 rounded-full border-4 border-white shadow-md mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p>{currentUser.age}岁 · {currentUser.gender === 'female' ? '女' : '男'}</p>
          </div>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="bg-white p-4 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <UserIcon size={18} className="mr-2" />
            个人资料
          </h2>
          {!isEditing ? (
            <button
              className="px-3 py-1 text-sm bg-pink-100 text-pink-700 rounded-full"
              onClick={() => setIsEditing(true)}
            >
              编辑
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full"
                onClick={handleCancel}
              >
                取消
              </button>
              <button
                className="px-3 py-1 text-sm bg-pink-500 text-white rounded-full"
                onClick={handleSave}
              >
                保存
              </button>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">昵称</label>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">年龄</label>
              <input
                type="number"
                value={editedUser.age}
                onChange={(e) => setEditedUser({...editedUser, age: parseInt(e.target.value) || 18})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                min={18}
                max={100}
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">个人介绍</label>
              <textarea
                value={editedUser.description}
                onChange={(e) => setEditedUser({...editedUser, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[80px]"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm text-gray-600">兴趣标签</label>
                <button
                  onClick={handleAddTag}
                  className="text-xs text-pink-600 hover:text-pink-700"
                >
                  + 添加标签
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editedUser.tags.map((tag, index) => (
                  <div key={index} className="flex items-center bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                    <button 
                      className="ml-2 text-pink-600 hover:text-pink-800"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">{currentUser.description}</p>
            
            <div>
              <h3 className="text-sm text-gray-500 mb-2">兴趣爱好</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Settings Menu */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`px-4 py-3 flex items-center justify-between border-b border-gray-100 last:border-b-0 ${
              item.danger ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </div>
            {item.toggle ? (
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            ) : (
              <ChevronRight size={20} className="text-gray-400" />
            )}
          </div>
        ))}
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-6">
        爱聊 v1.0.0 · © 2025 All Rights Reserved
      </p>
    </div>
  );
};

export default Settings;