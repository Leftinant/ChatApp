const ChatSidebar = ({ users, currentUser }) => {
  return (
    <div className='w-1/4 bg-base-200 p-4'>
      <h2 className='text-xl font-bold mb-4'>Online Users</h2>
      <ul>
        {users.map((user, idx) => (
          <li
            key={idx}
            className={`mb-2 ${user === currentUser ? "font-bold" : ""}`}
          >
            🟢 {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
