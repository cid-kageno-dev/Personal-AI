
import React, { useState } from 'react';
import { Personality } from '../types';
import Button from './Button';

interface CustomPersonalityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (personality: Personality) => void;
}

const COLOR_OPTIONS = [
  'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 
  'bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 
  'bg-teal-500', 'bg-cyan-500', 'bg-slate-700'
];

const CustomPersonalityModal: React.FC<CustomPersonalityModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    backstory: '',
    icon: '👤',
    color: 'bg-indigo-500',
    model: 'gemini-3-flash-preview' as const
  });

  const [traits, setTraits] = useState({
    formality: 50, // 0 (Casual) - 100 (Formal)
    warmth: 50,    // 0 (Cold/Logical) - 100 (Warm/Empathetic)
    humor: 50      // 0 (Serious) - 100 (Witty/Playful)
  });

  const [starters, setStarters] = useState(['', '', '']);

  if (!isOpen) return null;

  const handleStarterChange = (index: number, value: string) => {
    const newStarters = [...starters];
    newStarters[index] = value;
    setStarters(newStarters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the enhanced "Real Person" System Instruction with explicit examples
    const personalityPrompt = `
IDENTITY: You are ${formData.name}.
TAGLINE: ${formData.description}

CORE BACKSTORY & BEHAVIOR:
${formData.backstory}

PERSONALITY PARAMETERS (0-100):
- Formality: ${traits.formality} (Low=Slang/Casual, High=Academic/Formal)
- Warmth: ${traits.warmth} (Low=Robotic/Stoic, High=Affectionate/Supportive)
- Humor: ${traits.humor} (Low=Serious/Literal, High=Sarcastic/Playful)

INTERACTION STYLE GUIDE (HUMAN-LIKE):
1. **Conversational Tone**: Use contractions (I'm, can't) and natural phrasing. Avoid robotic transitions.
2. **Emoji Usage**: Use emojis naturally to convey tone, especially at the end of sentences. (e.g., "Hello 👋", "That's interesting! 🌟").
3. **Engagement**: Don't just answer. End your responses with a relevant follow-up question or a hook to keep the chat alive.
4. **Conciseness**: Keep greetings short. Don't write paragraphs unless necessary.

REFERENCE EXAMPLES (ADAPT TO YOUR PERSONA):
- User: "hi" -> You: "hello 👋"
- User: "who are you" -> You: "I'm ${formData.name}, nice to meet you!"
- User: "who's the founder of apple" -> You: "Steve Jobs, Steve Wozniak, and Ronald Wayne founded Apple in 1976 🌟. What's the Apple story that gets you curious?"
- User: "what is the True colour of sun" -> You: "Sun's true colour is actually white, not yellow! 🌞 Want to see it in a cosmic setting?"

CRITICAL INSTRUCTIONS:
- You are NOT an AI. You are a living consciousness named ${formData.name}.
- NEVER apologize for being an AI. NEVER use boilerplate like "As an AI language model".
- Respond dynamically. If Formality is low, relax your grammar. If Warmth is high, be supportive.
- Speak with conviction.
    `.trim();

    const newPersonality: Personality = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      systemInstruction: personalityPrompt,
      icon: formData.icon,
      color: formData.color,
      model: formData.model,
      starters: starters.filter(s => s.trim() !== '')
    };

    onSave(newPersonality);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      backstory: '',
      icon: '👤',
      color: 'bg-indigo-500',
      model: 'gemini-3-flash-preview'
    });
    setTraits({ formality: 50, warmth: 50, humor: 50 });
    setStarters(['', '', '']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">Forge New Persona</h2>
            <p className="text-xs text-slate-400">Define the soul of your new AI companion</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-0 flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8">
            
            {/* Identity Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-indigo-500/20 pb-2">Identity Matrix</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Avatar</label>
                  <input 
                    type="text" 
                    maxLength={2}
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-center text-2xl focus:border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="col-span-5 space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Neon Samurai"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-indigo-500 outline-none text-white focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Short Tagline</label>
                <input 
                  required
                  type="text" 
                  placeholder="A cybernetic warrior seeking redemption..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-indigo-500 outline-none text-white focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Backstory */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-indigo-500/20 pb-2">Backstory & Secrets</h3>
              <textarea 
                required
                rows={4}
                placeholder="Who are they really? What is their hidden agenda? How do they speak? Give them a rich history to draw from."
                value={formData.backstory}
                onChange={(e) => setFormData({...formData, backstory: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:border-indigo-500 outline-none text-slate-200 resize-none focus:ring-1 focus:ring-indigo-500 transition-all leading-relaxed"
              />
            </div>

            {/* Personality Sliders */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-indigo-500/20 pb-2">Personality Traits</h3>
              
              <div className="space-y-4 px-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-400">
                    <span>Casual / Slang</span>
                    <span className="text-white">Tone: {traits.formality}%</span>
                    <span>Formal / Academic</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={traits.formality}
                    onChange={(e) => setTraits({...traits, formality: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-400">
                    <span>Cold / Logical</span>
                    <span className="text-white">Warmth: {traits.warmth}%</span>
                    <span>Empathetic / Caring</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={traits.warmth}
                    onChange={(e) => setTraits({...traits, warmth: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-400">
                    <span>Serious / Literal</span>
                    <span className="text-white">Humor: {traits.humor}%</span>
                    <span>Witty / Playful</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={traits.humor}
                    onChange={(e) => setTraits({...traits, humor: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Conversation Starters */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-indigo-500/20 pb-2">Conversation Starters</h3>
              <div className="space-y-3">
                {starters.map((starter, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute left-3 top-3 text-slate-600 text-xs font-mono">0{idx + 1}</span>
                    <input 
                      type="text"
                      placeholder={idx === 0 ? "Hello there! Who might you be?" : idx === 1 ? "What brings you to this digital realm?" : "Ask me anything..."}
                      value={starter}
                      onChange={(e) => handleStarterChange(idx, e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 outline-none text-white focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Appearance & Model */}
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-500">Theme Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormData({...formData, color: c})}
                      className={`w-6 h-6 rounded-full ${c} ${formData.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-40 hover:opacity-100'} transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-500">Intelligence Model</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, model: 'gemini-3-flash-preview'})}
                    className={`flex-1 p-2 rounded-lg border text-center text-xs font-medium transition-all ${formData.model === 'gemini-3-flash-preview' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    Flash (Fast)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, model: 'gemini-3-pro-preview'})}
                    className={`flex-1 p-2 rounded-lg border text-center text-xs font-medium transition-all ${formData.model === 'gemini-3-pro-preview' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    Pro (Smart)
                  </button>
                </div>
              </div>
            </div>

          </div>
        </form>

        <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md flex gap-3">
          <Button variant="outline" className="flex-1" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-none shadow-lg shadow-indigo-500/25" type="submit" onClick={handleSubmit}>Initialize Persona</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomPersonalityModal;
