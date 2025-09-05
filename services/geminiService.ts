
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage } from '../types';

// IMPORTANT: Replace with your actual API key, preferably from environment variables.
// The user-provided OpenRouter key is not used as per instructions to use Gemini API.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

let chat: Chat | null = null;

export const startChat = (history: ChatMessage[]) => {
  const geminiHistory = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: geminiHistory,
    config: {
      systemInstruction: 'You are Vardaan, a helpful and creative AI assistant. Provide clear, concise, and well-formatted answers.',
    },
  });
};

export const sendMessageToAI = async (
  message: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  if (!chat) {
    startChat([]);
  }

  try {
    const result = await chat!.sendMessageStream({ message });
    
    for await (const chunk of result) {
      onChunk(chunk.text);
    }
  } catch (error) {
    console.error("Error sending message to AI:", error);
    onChunk("Sorry, I encountered an error. Please try again.");
  }
};
   