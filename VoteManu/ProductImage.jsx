import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductVoteButton from './ProductVoteButton';

const DEFAULT_FALLBACK = 'https://placehold.co/400x400?text=No+Image';

export default function ProductImage({
  imageUrl,
  fallbackImageUrl = DEFAULT_FALLBACK,
  altText,
  votesCount,
  hasVoted,
  onVote,
}) {
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImageUrl);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
      <motion.img
        src={imgSrc}
        alt={altText}
        onError={() => setImgSrc(fallbackImageUrl)}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <ProductVoteButton votesCount={votesCount} hasVoted={hasVoted} onVote={onVote} />
    </div>
  );
}