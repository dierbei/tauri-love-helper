import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocialPost as SocialPostType } from '../types';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface SocialPostProps {
  post: SocialPostType;
}

const SocialPost: React.FC<SocialPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const { toggleLike, addComment } = useApp();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const handleProfileClick = () => {
    navigate(/profile/${post.userId});
  };
  
  const handleLike = () => {
    toggleLike(post.id);
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(post.id, comment);
      setComment('');
      setShowComments(true);
    }
  };
  
  const formattedTime = formatDistanceToNow(new Date(post.createdAt), { 
    addSuffix: true,
    locale: zhCN
  });
  
  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center">
        <img 
          src={post.userAvatar} 
          alt={post.userName} 
          className="w-10 h-10 rounded-full mr-3 cursor-pointer"
          onClick={handleProfileClick}
        />
        <div>
          <h3 
            className="font-semibold text-gray-800 cursor-pointer"
            onClick={handleProfileClick}
          >
            {post.userName}
          </h3>
          <p className="text-xs text-gray-500">{formattedTime}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 mb-3">{post.content}</p>
        
        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-3">
            {post.images.length === 1 ? (
              <img 
                src={post.images[0]} 
                alt="Post" 
                className="w-full rounded-lg max-h-96 object-cover"
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {post.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={Post ${index}} 
                    className="w-full rounded-lg h-40 object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex">
        <button 
          className="flex items-center mr-6 text-gray-600 hover:text-pink-500"
          onClick={handleLike}
        >
          <Heart size={18} className="mr-1" />
          <span>{post.likes}</span>
        </button>
        <button 
          className="flex items-center text-gray-600 hover:text-purple-500"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} className="mr-1" />
          <span>{post.comments.length}</span>
        </button>
      </div>
      
      {/* Comments */}
      {showComments && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          {post.comments.length > 0 ? (
            <div className="mb-3">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start mb-2">
                  <img 
                    src={comment.userAvatar} 
                    alt={comment.userName} 
                    className="w-7 h-7 rounded-full mr-2 mt-1 cursor-pointer"
                    onClick={() => navigate(/profile/${comment.userId})}
                  />
                  <div className="bg-white p-2 rounded-lg flex-1 shadow-sm">
                    <p className="text-sm font-medium">{comment.userName}</p>
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(comment.createdAt), { 
                        addSuffix: true,
                        locale: zhCN
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-3">暂无评论</p>
          )}
          
          <form onSubmit={handleAddComment} className="flex">
            <input
              type="text"
              placeholder="添加评论..."
              className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-pink-500 text-white rounded-r-lg px-3 flex items-center justify-center"
              disabled={!comment.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SocialPost;