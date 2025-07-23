import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  return (
    <main className='flex-1 flex flex-col'>
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </main>
  );
};

export default ChatWindow;
