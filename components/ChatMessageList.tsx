
import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, MessageRole, Personality } from '../types';

interface ChatMessageListProps {
  messages: ChatMessage[];
  personality: Personality;
  showTypingIndicator: boolean;
  onStarterClick: (starter: string) => void;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, personality, showTypingIndicator, onStarterClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showTypingIndicator]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
    >
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-6 fade-in animate-in duration-500">
          <div className={`w-20 h-20 rounded-2xl ${personality.color} flex items-center justify-center text-5xl shadow-2xl shadow-indigo-500/20 mb-2`}>
            {personality.icon}
          </div>
          <div className="space-y-2 max-w-md">
            <h3 className="text-2xl font-bold font-heading text-white">Chat with {personality.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {personality.description}
            </p>
          </div>
          
          {personality.starters && personality.starters.length > 0 && (
             <div className="w-full max-w-md space-y-3 mt-4">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Suggested Topics</p>
                <div className="grid gap-2">
                  {personality.starters.map((starter, idx) => (
                    <button
                      key={idx}
                      onClick={() => onStarterClick(starter)}
                      className="text-sm bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-slate-300 hover:text-white py-3 px-4 rounded-xl text-left transition-all duration-200 group flex items-center justify-between"
                    >
                      <span>{starter}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
             </div>
          )}
        </div>
      )}
      
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`flex ${message.role === MessageRole.USER ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
        >
          <div 
            className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-md ${
              message.role === MessageRole.USER 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
            }`}
          >
            <div className="text-sm leading-relaxed font-medium">
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-outside ml-4 mb-2 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-4 mb-2 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  strong: ({node, ...props}) => <strong className={`font-bold ${message.role === MessageRole.USER ? 'text-indigo-200' : 'text-indigo-400'}`} {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2 border-b border-white/10 pb-1" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 mt-3 text-indigo-300" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1 mt-2" {...props} />,
                  code: ({node, ...props}) => <code className="bg-black/20 rounded px-1 py-0.5 font-mono text-xs" {...props} />,
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
            <div className={`text-[10px] mt-2 opacity-40 font-mono ${message.role === MessageRole.USER ? 'text-indigo-200 text-right' : 'text-slate-400 text-left'}`}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
      
      {showTypingIndicator && (
        <div className="flex justify-start animate-in fade-in duration-300">
          <div className="bg-slate-800 text-slate-100 px-4 py-4 rounded-2xl rounded-tl-none border border-slate-700/50">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessageList;
