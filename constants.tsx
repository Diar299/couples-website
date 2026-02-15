
import React from 'react';

export const COLORS = {
  parchment: '#fdf6e3',
  ink: '#262626',
  gold: '#d4af37',
  wax: '#991b1b',
};

export const INITIAL_MEMORIES = [
  {
    id: '1',
    type: 'letter' as const,
    title: 'Our First Meeting',
    content: "I still remember the way the light hit your hair that afternoon. It felt like time stood still, and in that moment, I knew everything was about to change...",
    timestamp: Date.now() - 10000000,
    author: 'Alex'
  },
  {
    id: '2',
    type: 'photo' as const,
    title: 'That Rainy Day',
    url: 'https://picsum.photos/800/600?random=1',
    timestamp: Date.now() - 20000000,
    author: 'Jordan'
  }
];
