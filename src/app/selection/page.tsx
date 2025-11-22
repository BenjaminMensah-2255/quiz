"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizQuest() {
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
      <div className="relative w-full max-w-2xl h-[600px] sm:h-[650px] bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-6 sm:p-8 pt-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Quiz Quest
        </h1>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-indigo-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-center border border-indigo-700/40">
            <div className="text-xs sm:text-sm text-slate-300 mb-1">Level</div>
            <div className="text-3xl sm:text-4xl font-bold text-white">5</div>
          </div>

          <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-center border border-slate-600/40">
            <div className="text-xs sm:text-sm text-slate-300 mb-1">XP</div>
            <div className="text-3xl sm:text-4xl font-bold text-white">0/500</div>
          </div>

          <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-center border border-slate-600/40">
            <div className="text-xs sm:text-sm text-slate-300 mb-1">High Score</div>
            <div className="text-3xl sm:text-4xl font-bold text-white">39</div>
          </div>

          <div className="bg-blue-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-center border border-blue-700/40">
            <div className="text-xs sm:text-sm text-slate-300 mb-1">Achievements</div>
            <div className="text-3xl sm:text-4xl font-bold text-white">1</div>
          </div>
        </div>

        {/* Game modes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">

          {/* Classic */}
          <button
            onClick={() => router.push('/question')}
            className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-slate-600/40 hover:border-slate-500/60 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">Classic</div>
            <div className="text-xs text-slate-400 leading-snug">10 questions, 15 seconds each</div>
          </button>

          {/* Time Attack */}
          <button className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-slate-600/40 hover:border-slate-500/60 transition-all hover:scale-105">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">Time Attack</div>
            <div className="text-xs text-slate-400 leading-snug">Answer as many as possible in 60 seconds</div>
          </button>

          {/* Survival */}
          <button className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-slate-600/40 hover:border-slate-500/60 transition-all hover:scale-105">
            <div className="text-4xl mb-2">🛡️</div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">Survival</div>
            <div className="text-xs text-slate-400 leading-snug">3 lives, questions get harder</div>
          </button>

          {/* Daily Challenge */}
          <button className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-slate-600/40 hover:border-slate-500/60 transition-all hover:scale-105">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">Daily Challenge</div>
            <div className="text-xs text-slate-400 leading-snug">Special questions, bonus rewards</div>
          </button>
        </div>

        {/* View Profile */}
        <div className="flex justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            View Profile
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
