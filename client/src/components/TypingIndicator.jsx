import React from "react";

function TypingIndicator({ user }) {
  return (
    <div className='text-sm text-gray-500 italic mt-2'>{user} is typing...</div>
  );
}

export default TypingIndicator;
