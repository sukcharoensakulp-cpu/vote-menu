import React from 'react';
import { motion } from 'framer-motion';
import ProductImage from './ProductImage';

export default function VoteMenuCard({
  id,
  name,
  price,
  imageUrl,
  votesCount = 0,
  voters = [],
  fallbackImageUrl,
  onOpenVoteModal,
  isVotingActive,
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-md backdrop-blur-md transition-shadow hover:shadow-xl"
    >
      <ProductImage
        imageUrl={imageUrl}
        fallbackImageUrl={fallbackImageUrl}
        altText={name}
        votesCount={votesCount}
        hasVoted={votesCount > 0}
        onVote={() => isVotingActive && onOpenVoteModal(id)}
      />

      <div className="mt-3 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm font-bold text-slate-800">
              {name}
            </h3>
            <span className="text-sm font-extrabold text-indigo-600 shrink-0">
              ฿{Number(price || 0).toLocaleString()}
            </span>
          </div>

          {/* แสดงรายชื่อคนที่กดโหวตเมนูนี้ */}
          <div className="mt-2 flex flex-wrap gap-1 min-h-[22px]">
            {voters.length > 0 ? (
              voters.map((person, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 text-[10px] font-medium text-indigo-600"
                >
                  👤 {person}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic">ยังไม่มีใครโหวต</span>
            )}
          </div>
        </div>

        {/* ปุ่มกดโหวต */}
        <div className="mt-3 pt-2">
          <motion.button
            type="button"
            disabled={!isVotingActive}
            whileTap={isVotingActive ? { scale: 0.95 } : {}}
            onClick={() => onOpenVoteModal(id)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition shadow-sm ${
              !isVotingActive
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            <span>❤️</span>
            <span>{isVotingActive ? 'กดโหวตเมนูนี้' : 'ปิดรับโหวตแล้ว'}</span>
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[11px]">
              {votesCount}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}