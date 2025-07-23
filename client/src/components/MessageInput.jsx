const MessageInput = () => {
  return (
    <div className='p-4 border-t border-base-300 flex items-center gap-2'>
      <input
        type='text'
        placeholder='Type a message...'
        className='input input-bordered flex-1'
      />
      <button className='btn btn-primary'>Send</button>
    </div>
  );
};

export default MessageInput;
