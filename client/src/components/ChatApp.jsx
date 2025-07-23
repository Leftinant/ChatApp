import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const ChatApp = () => {
  return (
    <div className='h-screen w-full flex bg-base-200'>
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatApp;
