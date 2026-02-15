import React, { useState, useRef } from 'react';
import { MemoryType } from './types.ts';
import { enhanceLetter } from './geminiService.ts';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { type: MemoryType; title: string; content?: string; url?: string }) => void;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ isOpen, onClose, onSave }) => {
  const [type, setType] = useState<MemoryType>('letter');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleEnhance = async () => {
    if (!content) return;
    setIsEnhancing(true);
    const enhanced = await enhanceLetter(content);
    setContent(enhanced);
    setIsEnhancing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((type === 'photo' || type === 'video') && !url) {
      alert('Please select a file to upload.');
      return;
    }
    onSave({ type, title, content, url });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setUrl('');
    setFileName(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#fcf9f5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[#d4c5b3]">
        <div className="p-6 bg-white border-b border-[#eee4d8] flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-gray-800">New Memory</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">What kind of memory?</label>
            <div className="flex gap-3">
              {(['letter', 'photo', 'video'] as MemoryType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setType(t); setUrl(''); setFileName(null); }}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                    type === t 
                    ? 'bg-[#991b1b] text-white border-[#991b1b] shadow-md scale-105' 
                    : 'bg-white text-gray-600 border-gray-100 hover:border-[#991b1b]/30'
                  }`}
                >
                  <span className="text-xl">{t === 'letter' ? '✉️' : t === 'photo' ? '📸' : '🎥'}</span>
                  <span className="text-xs font-bold uppercase tracking-tight">{t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Memory Title</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#d4c5b3] rounded-xl focus:ring-2 focus:ring-[#991b1b] focus:border-transparent outline-none transition-all placeholder:italic"
              placeholder="Give this moment a name..."
            />
          </div>

          {type === 'letter' ? (
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Your Message</label>
                <button
                  type="button"
                  onClick={handleEnhance}
                  disabled={isEnhancing || !content}
                  className="text-xs text-[#991b1b] font-bold hover:bg-red-50 py-1 px-2 rounded flex items-center gap-1 disabled:opacity-50 transition-colors"
                >
                  {isEnhancing ? '✨ Poeticizing...' : '✨ Make Poetic'}
                </button>
              </div>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#d4c5b3] rounded-xl focus:ring-2 focus:ring-[#991b1b] focus:border-transparent outline-none min-h-[180px] font-serif resize-none"
                placeholder="Write your heart out..."
              />
            </div>
          ) : (
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Upload File</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-10 border-2 border-dashed rounded-xl cursor-pointer flex flex-col items-center justify-center transition-all ${
                  url ? 'border-[#991b1b] bg-red-50' : 'border-[#d4c5b3] bg-white hover:border-[#991b1b]'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={type === 'photo' ? 'image/*' : 'video/*'}
                  className="hidden"
                />
                {url ? (
                  <div className="text-center px-4">
                    <span className="text-3xl mb-2 block">✅</span>
                    <p className="text-sm font-bold text-[#991b1b] truncate max-w-xs">{fileName}</p>
                    <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div className="text-center px-4">
                    <span className="text-3xl mb-2 block">{type === 'photo' ? '🖼️' : '🎬'}</span>
                    <p className="text-sm font-medium text-gray-600">Click to choose a {type}</p>
                    <p className="text-xs text-gray-400 mt-1 italic">Maximum file size ~5MB suggested</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-[#991b1b] text-white text-lg font-bold rounded-xl shadow-xl shadow-red-900/20 hover:bg-[#7f1d1d] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              Add to Box of Forever
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemoryModal;
