import React from 'react';
import { motion } from 'framer-motion';

export default function ProductVoteButton({ votesCount = 0, hasVoted = false, onVote }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.05 }}
      onClick={onVote}
      className={`absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-md transition-colors ${
        hasVoted
          ? 'bg-rose-500 text-white'
          : 'bg-white/90 text-slate-700 hover:bg-white dark:bg-slate-900/90 dark:text-slate-200'
      }`}
      title="โหวตเมนูนี้"
    >
      <span>{hasVoted ? '❤️' : '🤍'}</span>
      <span>{votesCount}</span>
    </motion.button>
  );
}