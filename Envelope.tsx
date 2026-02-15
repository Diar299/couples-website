import React, { useState } from 'react';
import { Memory } from './types';

interface EnvelopeProps {
  memory: Memory;
  onOpen: (id: string) => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ memory, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeIcon = () => {
    switch (memory.type) {
      case 'photo': return '📸';
      case 'video': return '🎥';
      case 'letter': return '✉️';
      default: return '✨';
    }
  };

  return (
    <div 
      className="relative group cursor-pointer w-full max-w-sm mx-auto h-56 md:h-64 transition-all duration-700 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(memory.id)}
    >
      <div className={`absolute inset-0 bg-black/5 blur-2xl rounded-xl transition-all duration-500 transform ${isHovered ? 'scale-110 translate-y-8 opacity-40' : 'scale-95 translate-y-2 opacity-20'}`}></div>

      <div className={`relative h-full w-full bg-[#f3e9dc] rounded-xl shadow-xl flex items-center justify-center border border-[#d4c5b3] transition-all duration-700 ${isHovered ? '-translate-y-4 rotate-x-2' : ''}`}>
        
        <div 
          className={`absolute top-0 left-0 w-full h-1/2 bg-[#efe3d3] border-b border-[#d4c5b3] transition-all duration-700 origin-top rounded-t-xl z-20 shadow-md ${isHovered ? '-rotate-x-160' : 'rotate-x-0'}`}
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-[#991b1b] rounded-full flex items-center justify-center text-white shadow-[0_4px_10px_rgba(153,27,27,0.4)] border-2 border-[#7f1d1d] seal-hover transition-transform duration-300 relative">
                <div className="absolute inset-1 rounded-full border border-white/20"></div>
                <span className="text-2xl drop-shadow-sm">❤</span>
              </div>
           </div>
        </div>

        <div className={`absolute inset-4 bg-white shadow-inner flex flex-col items-center justify-center p-6 text-center rounded-lg transition-transform duration-700 ${isHovered ? '-translate-y-12' : 'translate-y-0'}`}>
            <div className="w-16 h-16 bg-[#fdfaf6] rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-50">
              <span className="text-4xl">{getTypeIcon()}</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-800 line-clamp-1 mb-1 tracking-tight">{memory.title}</h3>
            <p className="text-[10px] uppercase tracking-widest text-[#991b1b] font-bold opacity-60">{memory.type}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 w-full">
              <p className="text-[11px] text-gray-400 italic">{new Date(memory.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#f3e9dc] border-t border-white/40 rounded-b-xl z-10 shadow-[inset_0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-white/50"></div>
        </div>
      </div>
    </div>
  );
};

export default Envelope;