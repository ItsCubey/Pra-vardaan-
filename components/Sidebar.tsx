
import React from 'react';
import { signOut, User } from 'firebase/auth';
import { auth } from '../services/firebase';
import LogoutIcon from './icons/LogoutIcon';
import SparkleIcon from './icons/SparkleIcon';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 p-4 space-y-6">
      <div className="flex items-center gap-2 text-2xl font-bold text-white">
        <SparkleIcon className="w-8 h-8 text-indigo-400" />
        <span>Vardaan AI</span>
      </div>
      <div className="flex-1">
        {/* Can add chat history here later */}
      </div>
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium text-gray-200 truncate">{user.displayName || 'Anonymous'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          <LogoutIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
   