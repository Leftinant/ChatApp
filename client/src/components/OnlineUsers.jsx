import { useEffect, useState } from "react";

function OnlineUsers({ socket, username, onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("online-users", (userList) => {
      const filtered = userList.filter((user) => user !== username);
      setUsers(filtered);
    });

    return () => {
      socket.off("online-users");
    };
  }, [socket, username]);

  const handleSelectUser = (user) => {
    onSelectUser(user);
  };

  return (
    <div className='w-1/4 bg-base-100 border-r border-base-300 overflow-y-auto'>
      <h2 className='text-xl font-bold p-4 border-b border-base-300'>
        Online Users
      </h2>
      <ul>
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <li
              key={index}
              onClick={() => handleSelectUser(user)}
              className='cursor-pointer px-4 py-2 hover:bg-base-200'
            >
              {user}
            </li>
          ))
        ) : (
          <li className='px-4 py-2 text-gray-500'>No other users online</li>
        )}
      </ul>
    </div>
  );
}

export default OnlineUsers;
