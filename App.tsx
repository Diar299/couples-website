import React, { useState, useEffect } from 'react';
import { Memory, MemoryType } from './types';
import { INITIAL_MEMORIES } from './constants';
import Envelope from './Envelope';
import MemoryOverlay from './MemoryOverlay';
import AddMemoryModal from './AddMemoryModal';

const App: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('love_memories');
      if (saved) {
        setMemories(JSON.parse(saved));
      } else {
        setMemories(INITIAL_MEMORIES);
      }
    } catch (e) {
      console.error("Failed to load memories", e);
      setMemories(INITIAL_MEMORIES);
    }
  }, []);

  useEffect(() => {
    if (memories.length > 0) {
      localStorage.setItem('love_memories', JSON.stringify(memories));
    }
  }, [memories]);

  const handleOpenEnvelope = (id: string) => {
    const memory = memories.find(m => m.id === id);
    if (memory) {
      setSelectedMemory(memory);
    }
  };

  const handleAddMemory = (data: { type: MemoryType; title: string; content?: string; url?: string }) => {
    const newMemory: Memory = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      timestamp: Date.now(),
      author: 'Us'
    };
    setMemories([newMemory, ...memories]);
  };

  const handleDeleteMemory = (id: string) => {
    if (window.confirm('Are you sure you want to remove this memory from the box?')) {
      const updated = memories.filter(m => m.id !== id);
      setMemories(updated);
      localStorage.setItem('love_memories', JSON.stringify(updated));
      if (selectedMemory?.id === id) setSelectedMemory(null);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-[#991b1b]/10 selection:text-[#991b1b] bg-[#fdfaf6]">
      <header className="sticky top-0 z-40 bg-[#fdfaf6]/90 backdrop-blur-md border-b border-[#eee4d8]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#991b1b] rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-red-900/20">
              ❤
            </div>
            <h1 className="font-serif text-2xl font-bold text-gray-800 tracking-tight">Our Sanctuary</h1>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#991b1b] text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-red-900/20 hover:bg-[#7f1d1d] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="text-xl leading-none">+</span>
            <span>Add Memory</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-cursive text-6xl text-[#991b1b] mb-4">The Box of Forever</h2>
          <p className="text-gray-600 font-serif italic text-xl">Every letter, every glance, every moment captured for eternity.</p>
        </div>

        {memories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-[#d4c5b3] transition-all">
            <span className="text-7xl mb-6 grayscale opacity-30">📬</span>
            <h3 className="text-2xl font-serif font-bold text-gray-400">Your love story is waiting...</h3>
            <p className="text-gray-400 mt-2 italic">Fill this space with your precious moments.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 text-[#991b1b] font-bold hover:underline underline-offset-4"
            >
              Begin your collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 pb-12">
            {memories.map((memory) => (
              <div key={memory.id} className="relative group">
                <Envelope 
                  memory={memory} 
                  onOpen={handleOpenEnvelope}
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteMemory(memory.id); }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-400 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 flex items-center justify-center z-30"
                  title="Remove memory"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <MemoryOverlay 
        memory={selectedMemory} 
        onClose={() => setSelectedMemory(null)} 
      />
      
      <AddMemoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddMemory}
      />

      <footer className="fixed bottom-0 left-0 right-0 py-8 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fdfaf6] to-transparent"></div>
        <div className="flex justify-center gap-12 opacity-[0.03] text-6xl animate-pulse">
          <span>❤</span><span>❤</span><span>❤</span><span>❤</span><span>❤</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
