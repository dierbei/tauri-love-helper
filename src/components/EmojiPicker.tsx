import React from 'react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, isOpen }) => {
  if (!isOpen) return null;
  
  const emojis = [
    '😊', '😂', '🥰', '😍', '😘', '💕', '❤️', 
    '😁', '😉', '😋', '🤗', '🤔', '🙄', '😮',
    '😢', '😭', '😤', '😠', '🤯', '😴', '🥳',
    '👍', '👎', '👏', '🙏', '🎉', '✨', '🔥'
  ];
  
  return (
    <div className="absolute bottom-14 left-0 right-0 bg-white rounded-t-xl shadow-lg border border-gray-200 p-3 z-10">
      <div className="grid grid-cols-7 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="text-2xl p-1 hover:bg-gray-100 rounded transition"
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;