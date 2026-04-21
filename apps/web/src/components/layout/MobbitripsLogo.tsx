'use client';

import { motion } from 'framer-motion';

interface Props {
  size?: number;
  className?: string;
}

export function MobbitripsLogo({ size = 32, className }: Props) {
  const width = size * (432.49 / 576.35);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 432.49 576.35"
      width={width}
      height={size}
      className={className}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ scale: 1.1 }}
      aria-label="Mobbitrips"
      role="img"
    >
      {/* Dot 1 — top left */}
      <motion.circle
        fill="#ed6864"
        cx="150.63"
        cy="31.19"
        r="31.19"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      />

      {/* Dot 2 — top right */}
      <motion.circle
        fill="#ed6864"
        cx="288.76"
        cy="102.79"
        r="31.19"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      />

      {/* Dot 3 — middle loop */}
      <motion.circle
        fill="#ed6864"
        cx="218.84"
        cy="340.69"
        r="31.19"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
      />

      {/* Main paths */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      >
        <path
          fill="#ed6864"
          d="M250.85,262.21v26.1c-.38-4.31-.58-8.64-.58-13.05S250.47,266.52,250.85,262.21Z"
          transform="translate(-250.27 -41.65)"
        />
        <path
          fill="#ed6864"
          d="M551.49,275.26c0,1.12,0,2.25,0,3.38-.05,3.25-.23,6.49-.53,9.67v-26.1C551.29,266.52,551.49,270.85,551.49,275.26Z"
          transform="translate(-250.27 -41.65)"
        />
        <path
          fill="#ed6864"
          d="M382.12,374.72v26.1c-.38-4.31-.58-8.64-.58-13.05,0-.55,0-1.1,0-1.66Q381.6,380.36,382.12,374.72Z"
          transform="translate(-250.27 -41.65)"
        />
        <path
          fill="#ed6864"
          d="M682.18,374.72V599.24a18.75,18.75,0,1,1-37.49,0V389.5A112.62,112.62,0,0,0,573.4,284.77a.19.19,0,0,1-.1,0,1.82,1.82,0,0,1-.35-.12c-.32-.13-.65-.25-1-.35a.63.63,0,0,0-.25-.1,19.84,19.84,0,0,1,8-38,20.52,20.52,0,0,1,5.94.87l.42.15.48.18c.45.17.87.35,1.3.53l.2.07.35.15a150.66,150.66,0,0,1,93.75,126.64Z"
          transform="translate(-250.27 -41.65)"
        />
        <path
          fill="#ed6864"
          d="M586.1,247.15l-.42-.15h.05Z"
          transform="translate(-250.27 -41.65)"
        />
        <path
          fill="#ed6864"
          d="M682.76,387.77c0,4.41-.2,8.74-.58,13.05v-26.1Q682.75,381.18,682.76,387.77Z"
          transform="translate(-250.27 -41.65)"
        />
        <path
          fill="#ed6864"
          d="M550.91,262.21V533.62c0,1.2,0,2.4-.07,3.6a84.4,84.4,0,0,1-168.72-3.6V374.72a150.6,150.6,0,0,1,93.8-126.64c.4-.2.83-.37,1.25-.55l.63-.23a20.08,20.08,0,0,1,6.76-1.17,19.88,19.88,0,0,1,8.62,37.79,1.94,1.94,0,0,0-.3.13c-.75.27-1.53.57-2.28.87a.36.36,0,0,1-.13.06,112.48,112.48,0,0,0-70.78,101.21s0,0-.05,0V533.62a46.88,46.88,0,0,0,93.62,3.58l.16,0v-262a112.53,112.53,0,0,0-225,0v324a18.76,18.76,0,1,1-37.52,0v-337a150.57,150.57,0,0,1,300.06,0Z"
          transform="translate(-250.27 -41.65)"
        />
      </motion.g>
    </motion.svg>
  );
}
