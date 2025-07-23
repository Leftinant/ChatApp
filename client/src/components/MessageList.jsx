const MessageList = () => {
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-base-100'>
      <div className='chat chat-start'>
        <div className='chat-image avatar'>
          <div className='w-8 rounded-full'>
            <img src='https://i.pravatar.cc/150?img=3' />
          </div>
        </div>
        <div className='chat-header'>
          Evgeny
          <time className='text-xs opacity-50 ml-2'>4:00 PM</time>
        </div>
        <div className='chat-bubble'>Hi, man. You are just a test.</div>
      </div>

      <div className='chat chat-end'>
        <div className='chat-bubble'>What does it mean?</div>
        <div className='chat-footer opacity-50'>4:16 PM</div>
      </div>
    </div>
  );
};

export default MessageList;
