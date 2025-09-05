import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import UserIcon from './icons/UserIcon';
import SparkleIcon from './icons/SparkleIcon';
import Spinner from './Spinner';

interface ChatMessageProps {
  message: ChatMessageType;
  isLoading?: boolean;
}

// Simple markdown-to-jsx parser for code blocks
const parseMessage = (text: string) => {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      const code = part.replace(/```/g, '');
      const language = code.match(/^[a-zA-Z]+\n/)?.[0].trim() || '';
      const finalCode = code.replace(/^[a-zA-Z]+\n/, '');

      return (
        <div key={index} className="bg-gray-900 rounded-lg my-2 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-1 bg-gray-700 text-xs text-gray-300">
                <span>{language || 'code'}</span>
                <button onClick={() => navigator.clipboard.writeText(finalCode)} className="hover:text-white">Copy</button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
                <code>{finalCode}</code>
            </pre>
        </div>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === 'user';

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-slate-700 text-gray-200 rounded-bl-none';
  
  const Icon = isUser ? UserIcon : SparkleIcon;
  const iconClasses = isUser ? 'text-indigo-300' : 'text-purple-300';

  return (
    <div className={`flex items-start gap-4 animate-fade-in ${containerClasses}`}>
       {!isUser && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-600 ${iconClasses}`}>
            <Icon className="w-5 h-5" />
        </div>
       )}
      <div className={`max-w-xl md:max-w-2xl px-5 py-3 rounded-xl shadow-md ${bubbleClasses}`}>
        {isLoading ? <Spinner /> : <div className="prose prose-invert max-w-none prose-p:my-2 prose-pre:my-2">{parseMessage(message.text)}</div>}
      </div>
       {isUser && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-600 ${iconClasses}`}>
            <Icon className="w-5 h-5" />
        </div>
       )}
        {/* FIX: Removed non-standard 'jsx' prop from style tag which was causing a TypeScript error. */}
        <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;