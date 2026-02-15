
export type MemoryType = 'photo' | 'video' | 'letter';

export interface Memory {
  id: string;
  type: MemoryType;
  title: string;
  content?: string; // For letters
  url?: string;     // For photos/videos
  timestamp: number;
  author: string;
}

export interface User {
  name: string;
  avatar: string;
}
