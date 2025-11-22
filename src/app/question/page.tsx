"use client"
import React, { useState, useEffect } from 'react';

export default function QuizQuestion() {
  const [stars, setStars] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);

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
      <div className="relative w-full max-w-3xl h-[600px] sm:h-[650px] bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-6 sm:p-8">
        {/* Top bar - Score and Streak */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-white font-bold text-lg">Score: 0</div>
          <div className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
            <span>🔥</span>
            <span>0 Streak</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
          <div className="h-full w-1/5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
        </div>

        {/* Question card */}
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-600/30">
          <div className="text-slate-400 text-sm mb-2">Question 2 of 10</div>
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-white text-2xl sm:text-3xl font-bold">
              In what year did the Byzantine Empire fall?
            </h2>
            <div className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-xl shrink-0">
              15
            </div>
          </div>
        </div>

        {/* Power-ups */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/40 text-white px-4 py-2 rounded-xl hover:border-slate-500/60 transition-all flex items-center gap-2">
            <span>50/50</span>
            <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-full">3</span>
          </button>
          <button className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/40 text-white px-4 py-2 rounded-xl hover:border-slate-500/60 transition-all flex items-center gap-2">
            <span>💡</span>
            <span>+10s</span>
            <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-full">3</span>
          </button>
          <button className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/40 text-white px-4 py-2 rounded-xl hover:border-slate-500/60 transition-all flex items-center gap-2">
            <span>⏭️</span>
            <span>Skip</span>
            <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-full">2</span>
          </button>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-slate-700/40 backdrop-blur-sm border-2 border-slate-600/40 text-white px-6 py-4 rounded-2xl hover:border-pink-500/60 hover:bg-slate-700/60 transition-all text-left">
            <span className="text-pink-500 font-bold mr-3">A.</span>
            <span className="text-lg">1453</span>
          </button>
          
          <button className="bg-slate-700/40 backdrop-blur-sm border-2 border-slate-600/40 text-white px-6 py-4 rounded-2xl hover:border-pink-500/60 hover:bg-slate-700/60 transition-all text-left">
            <span className="text-pink-500 font-bold mr-3">B.</span>
            <span className="text-lg">1492</span>
          </button>
          
          <button className="bg-slate-700/40 backdrop-blur-sm border-2 border-slate-600/40 text-white px-6 py-4 rounded-2xl hover:border-pink-500/60 hover:bg-slate-700/60 transition-all text-left">
            <span className="text-pink-500 font-bold mr-3">C.</span>
            <span className="text-lg">1066</span>
          </button>
          
          <button className="bg-slate-700/40 backdrop-blur-sm border-2 border-slate-600/40 text-white px-6 py-4 rounded-2xl hover:border-pink-500/60 hover:bg-slate-700/60 transition-all text-left">
            <span className="text-pink-500 font-bold mr-3">D.</span>
            <span className="text-lg">1215</span>
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