import React from "react";

function OnlineUsers({ users, onSelect, selected }) {
  return (
    <div className='w-1/4 bg-base-200 p-4 overflow-y-auto'>
      <h3 className='font-bold text-lg mb-2'>Online Users</h3>
      <ul>
        {users.map((user) => (
          <li
            key={user}
            onClick={() => onSelect(user)}
            className={`p-2 rounded cursor-pointer ${
              selected === user ? "bg-primary text-white" : "hover:bg-base-300"
            }`}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
