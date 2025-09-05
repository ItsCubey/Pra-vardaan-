
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { sendMessageToAI, startChat } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SparkleIcon from './icons/SparkleIcon';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
      startChat([]); // Initialize a new chat session on component mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (isLoading) return;
    
    const userMessage: ChatMessageType = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const modelMessage: ChatMessageType = { role: 'model', text: '' };
    setMessages(prev => [...prev, modelMessage]);

    await sendMessageToAI(text, (chunk) => {
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
                lastMessage.text += chunk;
            }
            return newMessages;
        });
    });

    setIsLoading(false);
  }, [isLoading]);

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 animate-fade-in">
            <SparkleIcon className="w-16 h-16 mb-4 text-indigo-400" />
            <h2 className="text-2xl font-semibold text-gray-200">Welcome to Vardaan AI</h2>
            <p className="max-w-md mt-2">
              Ask me anything! From coding questions to creative writing, I'm here to help you.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))
        )}
         {isLoading && messages[messages.length-1]?.role === 'user' && (
            <ChatMessage message={{role: 'model', text: '...'}} isLoading={true} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default ChatView;
   