const ChatHeader = () => {
  return (
    <div className='p-4 border-b border-base-300 flex items-center gap-3'>
      <div className='avatar'>
        <div className='w-10 rounded-full'>
          <img src='https://i.pravatar.cc/150?img=3' />
        </div>
      </div>
      <div>
        <div className='font-semibold'>Evgeny</div>
        <div className='text-sm text-success'>online</div>
      </div>
    </div>
  );
};

export default ChatHeader;
