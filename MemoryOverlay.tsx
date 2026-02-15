import React from 'react';
import { Memory } from './types.ts';

interface MemoryOverlayProps {
  memory: Memory | null;
  onClose: () => void;
}

const MemoryOverlay: React.FC<MemoryOverlayProps> = ({ memory, onClose }) => {
  if (!memory) return null;

  const isMedia = memory.type === 'photo' || memory.type === 'video';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className={`relative w-full ${isMedia ? 'max-w-6xl' : 'max-w-3xl'} max-h-[92vh] overflow-hidden rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col md:flex-row bg-[#fcf9f5] transform transition-all animate-in zoom-in-95 duration-500`}>
        
        {isMedia && (
          <div className="w-full md:w-3/5 bg-neutral-950 flex items-center justify-center min-h-[40vh] md:min-h-0 border-r border-[#eee4d8]">
            {memory.type === 'photo' ? (
              <img 
                src={memory.url} 
                alt={memory.title} 
                className="max-w-full max-h-full object-contain p-2"
              />
            ) : (
              <video 
                src={memory.url} 
                controls 
                className="max-w-full max-h-full"
                autoPlay
              />
            )}
          </div>
        )}

        <div className={`w-full ${isMedia ? 'md:w-2/5' : 'w-full'} overflow-y-auto relative bg-[#fdfaf6]`}>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-800 via-red-500 to-red-800 opacity-20"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-gray-500 hover:text-black transition-all shadow-sm z-10"
          >
            ✕
          </button>

          <div className="p-8 md:p-12 lg:p-16 h-full flex flex-col min-h-[400px]">
            <div className="mb-10 text-center border-b border-[#eee4d8] pb-8">
              <p className="font-cursive text-3xl text-[#991b1b] mb-4">Dearest One,</p>
              <h2 className="font-serif text-4xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">{memory.title}</h2>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <span className="w-8 h-px bg-gray-200"></span>
                <p className="text-xs uppercase tracking-[0.2em] font-medium">
                  {new Date(memory.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <span className="w-8 h-px bg-gray-200"></span>
              </div>
            </div>

            <div className="flex-1 mb-12 relative">
              {!isMedia && (
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2rem' }}></div>
              )}
              
              <div className="prose prose-stone max-w-none">
                <p className="font-serif text-xl leading-[1.8] text-gray-800 whitespace-pre-wrap italic first-letter:text-5xl first-letter:font-cursive first-letter:mr-2 first-letter:text-[#991b1b] first-letter:float-left">
                  {memory.type === 'letter' 
                    ? memory.content 
                    : `Remember this beautiful day? The title says it all: "${memory.title}". These moments are the threads that weave our story together.`
                  }
                </p>
              </div>
            </div>

            <div className="pt-10 border-t border-[#eee4d8] text-right">
              <p className="font-cursive text-3xl text-[#991b1b] mb-1">With all my love,</p>
              <p className="font-serif text-2xl font-bold text-gray-900 tracking-wide">{memory.author}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryOverlay;
