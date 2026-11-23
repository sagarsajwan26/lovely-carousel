'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LovelyLoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LovelyLoadingScreen({ onLoadingComplete }: LovelyLoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress increment - calibrated to ~5 seconds so the quote can be read comfortably
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 1; // 100 ticks * 50ms = 5000ms (5 seconds)
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      onClick={onLoadingComplete}
      className="fixed inset-0 z-50 bg-[#12071C] flex flex-col items-center justify-center p-6 text-white cursor-pointer select-none overflow-hidden"
    >
      {/* Ambient Romantic Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-[#FF2D6C]/30 via-[#9D267A]/25 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[340px] h-[240px] bg-[#FF4B7A]/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Gentle Petals */}
      <div className="absolute top-16 left-8 text-pink-300/70 text-2xl animate-bounce">🌸</div>
      <div className="absolute bottom-24 right-8 text-pink-400/60 text-xl animate-pulse">🌸</div>
      <div className="absolute top-1/4 right-12 text-pink-300/60 text-lg">🌹</div>

      {/* Center 3D Liquid Glass Heart Animation */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Pulsing Light Rings Behind Heart */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#FF2D6C] to-[#FF8FA3] blur-2xl pointer-events-none"
        />

        {/* 3D Glass Animated Heart with Perspective & Specular Highlights */}
        <motion.div
          animate={{
            scale: [1, 1.08, 0.98, 1.12, 1],
            rotateY: [0, 15, -15, 0],
            rotateX: [0, -10, 10, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ perspective: 1000 }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center drop-shadow-[0_15px_35px_rgba(255,45,108,0.65)] transform-gpu will-change-transform"
        >
          {/* Outer Liquid Glass Specular Bevel Heart SVG */}
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full fill-none filter drop-shadow-[0_0_20px_#FF2D6C]"
          >
            <defs>
              {/* Radial gradient for 3D depth */}
              <radialGradient id="heart3dGradient" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFF0F5" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#FF4B7A" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#E01B5E" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#800A38" stopOpacity="1" />
              </radialGradient>

              {/* Specular Rim Light Gradient */}
              <linearGradient id="heartRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FF8FA3" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF2D6C" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Solid Heart Body */}
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#heart3dGradient)"
              stroke="url(#heartRim)"
              strokeWidth="0.75"
            />

            {/* Specular Top Light Crescent Highlight for True 3D Glass Look */}
            <path
              d="M7.5 4.5c-1.5 0-2.8 1-3.2 2.4.6-.9 1.6-1.5 2.7-1.5 1.4 0 2.6.8 3.2 2 .5-1.7-1.1-2.9-2.7-2.9z"
              fill="white"
              opacity="0.65"
            />
          </svg>

          {/* Center Sparkle Icon */}
          <Sparkles className="absolute w-6 h-6 text-white/90 animate-pulse drop-shadow" />
        </motion.div>

        {/* Album Label Typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-pink-300 font-bold block mb-1">
            LOVELY ALBUM
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
            Romantic Melodies
          </h2>
        </motion.div>

        {/* Glowing Progress Track */}
        <div className="w-44 h-1 bg-white/15 rounded-full overflow-hidden mt-4 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF2D6C] to-[#FF8FA3] shadow-[0_0_10px_#FF2D6C]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ========================================================= */}
        {/* The Quote with Shared layoutId for Seamless Landing */}
        {/* ========================================================= */}
        <motion.div
          layoutId="romantic-quote"
          transition={{ type: 'spring', damping: 26, stiffness: 170 }}
          className="mt-7 max-w-[340px] px-4 text-center z-20 flex flex-col items-center"
        >
          <p className="font-serif italic text-pink-100 text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_14px_rgba(255,45,108,0.7)]">
            &ldquo;ke itna ameer toh nhi ki teri sari khawais poori kar saku, par maage tu toh waqt sara tere naam krdu&rdquo;
          </p>
          <p className="font-serif italic text-pink-300 text-xs sm:text-sm mt-1.5 tracking-wide drop-shadow-[0_1px_8px_rgba(255,45,108,0.5)]">
            - sagar <span className="text-pink-400">♡</span>
          </p>
        </motion.div>

        {/* Tap to enter hint */}
        <span className="text-[10px] text-white/40 tracking-widest uppercase mt-6 animate-pulse">
          Tap anywhere to begin
        </span>
      </div>
    </motion.div>
  );
}
