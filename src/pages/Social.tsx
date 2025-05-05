import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SocialPostComponent from '../components/SocialPost';
import { Image, Send, X, Camera, Smile } from 'lucide-react';
import EmojiPicker from '../components/EmojiPicker';

const Social: React.FC = () => {
  const { socialPosts, addSocialPost, currentUser } = useApp();
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImages, setPostImages] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (postContent.trim() || postImages.length > 0) {
      addSocialPost({
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: postContent,
        images: postImages.length > 0 ? postImages : undefined
      });
      
      setPostContent('');
      setPostImages([]);
      setShowPostModal(false);
      setShowEmojiPicker(false);
    }
  };
  
  const handleAddImage = () => {
    const sampleImages = [
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg',
      'https://images.pexels.com/photos/1772973/pexels-photo-1772973.jpeg',
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg'
    ];
    
    if (postImages.length < 4) {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      setPostImages([...postImages, randomImage]);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setPostContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };
  
  return (
    <div className="max-w-screen-md mx-auto px-4 py-6 pb-20">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">广场</h1>
      
      {/* Posts */}
      {socialPosts.map(post => (
        <SocialPostComponent key={post.id} post={post} />
      ))}

      {/* Floating Post Button */}
      <button
        className="fixed bottom-20 right-4 w-14 h-14 bg-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
        onClick={() => setShowPostModal(true)}
      >
        <Send size={24} />
      </button>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full mr-3"
                />
                <h2 className="text-lg font-semibold">{currentUser.name}</h2>
              </div>
              <button 
                onClick={() => setShowPostModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddPost} className="p-4">
              <textarea
                placeholder="分享你的想法..."
                className="w-full border-none focus:ring-0 p-3 mb-4 min-h-[150px] resize-none text-gray-800 placeholder-gray-400"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              
              {/* Image Preview */}
              {postImages.length > 0 && (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {postImages.map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden group">
                      <img 
                        src={image} 
                        alt={`Preview ${index}`} 
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setPostImages(postImages.filter((_, i) => i !== index))}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
                    disabled={postImages.length >= 4}
                  >
                    <Camera size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
                  >
                    <Smile size={24} />
                  </button>
                </div>
                
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-full ${
                    postContent.trim() || postImages.length > 0
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                  disabled={!postContent.trim() && postImages.length === 0}
                >
                  发布
                </button>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-20 left-0 right-0">
                  <EmojiPicker 
                    isOpen={showEmojiPicker} 
                    onEmojiSelect={handleEmojiSelect}
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Social;