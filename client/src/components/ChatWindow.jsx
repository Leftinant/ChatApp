import React, { useState } from "react";

const ChatWindow = ({ messages, onSend, onTyping, typingUser }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className='flex flex-col flex-1 bg-base-100 p-4'>
      <div className='flex-1 overflow-y-auto'>
        {messages.map((msg, idx) => (
          <div key={idx} className='mb-2'>
            <span className='font-semibold'>{msg.sender}:</span> {msg.text}
            <span className='text-xs text-gray-500 ml-2'>{msg.time}</span>
          </div>
        ))}
        {typingUser && (
          <div className='italic text-sm text-gray-500'>
            {typingUser} is typing...
          </div>
        )}
      </div>
      <div className='mt-4 flex gap-2'>
        <input
          type='text'
          className='input input-bordered w-full'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onTyping();
          }}
          placeholder='Type a message...'
        />
        <button className='btn btn-primary' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
