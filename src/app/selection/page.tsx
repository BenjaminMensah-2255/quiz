"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuestComplete() {
  const [stars, setStars] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);
  const router = useRouter();

  useEffect(() => {
    setStars(
      [...Array(50)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Starfield background */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `twinkle ${star.duration}s infinite ${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-2xl h-[600px] sm:h-[650px] bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8 pt-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Quest Complete!
        </h1>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Score */}
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-slate-600/30">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">33</div>
            <div className="text-xs sm:text-sm text-slate-400">Score</div>
          </div>

          {/* Accuracy */}
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-slate-600/30">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">30%</div>
            <div className="text-xs sm:text-sm text-slate-400">Accuracy</div>
          </div>

          {/* Best Streak */}
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-slate-600/30">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">2</div>
            <div className="text-xs sm:text-sm text-slate-400">Best Streak</div>
          </div>

          {/* XP Gained */}
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-slate-600/30">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">+86</div>
            <div className="text-xs sm:text-sm text-slate-400">XP Gained</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Play Again
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" onClick={() => router.push('/selection')}>
            Main Menu
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}