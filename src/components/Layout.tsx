import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Globe, Send, MessageCircle, User } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisible] = useState(true);
  
  // Hide nav bar on chat page for more space
  React.useEffect(() => {
    if (location.pathname.includes('/chat/')) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
  }, [location]);

  const navItems = [
    { path: '/', icon: <Home size={24} />, label: '星球' },
    { path: '/social', icon: <Globe size={24} />, label: '广场' },
    { path: '/discover', icon: <Send size={24} />, label: '发布' },
    { path: '/chats', icon: <MessageCircle size={24} />, label: '聊天' },
    { path: '/settings', icon: <User size={24} />, label: '自己' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      
      {isNavVisible && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
          <div className="max-w-screen-lg mx-auto px-4">
            <ul className="flex justify-around">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path} className="flex-1">
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full py-3 flex flex-col items-center justify-center transition-all ${
                        isActive
                          ? 'text-pink-500 transform scale-110'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className={`block mb-1 transition-transform ${isActive ? 'transform scale-110' : ''}`}>
                        {item.icon}
                      </span>
                      <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Layout