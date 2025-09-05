import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import GoogleIcon from './icons/GoogleIcon';
import SparkleIcon from './icons/SparkleIcon';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
        setIsSigningIn(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=5')] bg-cover opacity-10"></div>
      <div className="relative z-10 text-center flex flex-col items-center animate-fade-in-up">
        <div className="mb-6 flex items-center gap-3 text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
          <SparkleIcon className="w-12 h-12" />
          <h1>Vardaan AI</h1>
        </div>
        <p className="max-w-md mb-8 text-lg text-gray-300">
          Unlock your creative potential. Sign in to start your conversation with a powerful AI assistant.
        </p>

        <button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="group relative flex items-center justify-center px-6 py-3 bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
           <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
           <span className="relative flex items-center">
            {isSigningIn ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
                <>
                    <GoogleIcon className="w-6 h-6 mr-3" />
                    Sign in with Google
                </>
            )}
           </span>
        </button>
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
       {/* FIX: Removed non-standard 'jsx' prop from style tag which was causing a TypeScript error. */}
       <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes tilt {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(1deg); }
        }
        .animate-tilt {
            animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;