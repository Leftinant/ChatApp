const Sidebar = () => {
  return (
    <aside className='w-1/3 max-w-sm border-r border-base-300 p-4 space-y-2 overflow-y-auto'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Telegram</h2>
        <div className='avatar'>
          <div className='w-8 rounded-full'>
            <img src='https://i.pravatar.cc/150?img=1' />
          </div>
        </div>
      </div>

      <input
        type='text'
        placeholder='Type to search...'
        className='input input-bordered input-sm w-full mt-4'
      />

      <div className='mt-4 space-y-2'>
        {/* Replace with dynamic list */}
        <div className='flex items-center gap-3 p-2 rounded hover:bg-base-300 cursor-pointer'>
          <div className='avatar'>
            <div className='w-10 rounded-full'>
              <img src='https://i.pravatar.cc/150?img=2' />
            </div>
          </div>
          <div className='flex-1'>
            <div className='font-semibold'>Kristi Dirks</div>
            <div className='text-sm text-gray-500 truncate'>Hey there...</div>
          </div>
          <div className='text-xs text-gray-400'>09:21</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
