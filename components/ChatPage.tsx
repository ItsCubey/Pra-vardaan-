
import React from 'react';
import type { User } from 'firebase/auth';
import Sidebar from './Sidebar';
import ChatView from './ChatView';

interface ChatPageProps {
  user: User;
}

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
  return (
    <div className="flex h-screen w-full bg-gray-800 text-gray-100 font-sans">
      <Sidebar user={user} />
      <main className="flex-1 flex flex-col h-screen">
        <ChatView />
      </main>
    </div>
  );
};

export default ChatPage;
   