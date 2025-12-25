
import React from 'react';
import { Personality } from '../types';

interface PersonalityCardProps {
  personality: Personality;
  isActive: boolean;
  onClick: () => void;
}

const PersonalityCard: React.FC<PersonalityCardProps> = ({ personality, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border text-left ${
        isActive 
          ? 'bg-indigo-600/10 border-indigo-500/50 shadow-inner' 
          : 'bg-slate-800/40 border-transparent hover:bg-slate-800 hover:border-slate-700'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg ${personality.color} flex items-center justify-center text-xl shrink-0 shadow-sm`}>
        {personality.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-slate-100 truncate">{personality.name}</h4>
        <p className="text-xs text-slate-400 truncate">{personality.description}</p>
      </div>
      {isActive && (
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
      )}
    </button>
  );
};

export default PersonalityCard;
