import React from 'react';
import { motion } from 'framer-motion';

export default function ProductActionButton({ hasVoted, votesCount = 0, onVote }) {
  return (
    <div className="mt-3 pt-2">
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={onVote}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-semibold transition-all shadow-sm ${
          hasVoted
            ? 'bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600'
            : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'
        }`}
      >
        <span className="text-base">{hasVoted ? '❤️' : '🤍'}</span>
        <span>{hasVoted ? 'โหวตแล้ว' : 'โหวตเมนูนี้'}</span>
        <span className="ml-1 rounded-full bg-black/15 px-2 py-0.5 text-xs font-bold">
          {votesCount}
        </span>
      </motion.button>
    </div>
  );
}