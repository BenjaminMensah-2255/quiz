"use client";
import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

// Questions organized by category
const questionsByCategory = {
  classic: [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: 2, category: "Geography" },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1, category: "Science" },
    { question: "What is 7 × 8?", options: ["54", "56", "58", "60"], correctAnswer: 1, category: "Math" },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], correctAnswer: 2, category: "Art" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3, category: "Geography" },
  ],
  timeAttack: [
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: 2, category: "Geography" },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correctAnswer: 2, category: "Math" },
    { question: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2, category: "Science" },
    { question: "In which year did WW2 end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, category: "History" },
    { question: "What is the speed of light?", options: ["299,792 km/s", "150,000 km/s", "400,000 km/s", "500,000 km/s"], correctAnswer: 0, category: "Science" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctAnswer: 1, category: "Literature" },
    { question: "What is H2O commonly known as?", options: ["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"], correctAnswer: 2, category: "Science" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Thailand", "Japan", "South Korea"], correctAnswer: 2, category: "Geography" },
  ],
  survival: [
    { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: 2, category: "Science" },
    { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo", "Hawking"], correctAnswer: 1, category: "Science" },
    { question: "What is the square root of 144?", options: ["11", "12", "13", "14"], correctAnswer: 1, category: "Math" },
    { question: "Which element has the atomic number 1?", options: ["Helium", "Oxygen", "Hydrogen", "Carbon"], correctAnswer: 2, category: "Science" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correctAnswer: 2, category: "Science" },
    { question: "How many bones are in the human body?", options: ["206", "205", "207", "208"], correctAnswer: 0, category: "Biology" },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2, category: "Geography" },
    { question: "Who discovered penicillin?", options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Robert Koch"], correctAnswer: 1, category: "Science" },
    { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"], correctAnswer: 1, category: "Biology" },
    { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: 1, category: "Science" },
  ],
  daily: [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: 2, category: "Geography" },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1, category: "Science" },
    { question: "What is 7 × 8?", options: ["54", "56", "58", "60"], correctAnswer: 1, category: "Math" },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], correctAnswer: 2, category: "Art" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3, category: "Geography" },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: 2, category: "Geography" },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correctAnswer: 2, category: "Math" },
    { question: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2, category: "Science" },
    { question: "In which year did WW2 end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, category: "History" },
    { question: "What is the speed of light?", options: ["299,792 km/s", "150,000 km/s", "400,000 km/s", "500,000 km/s"], correctAnswer: 0, category: "Science" },
  ]
};

type GameMode = 'classic' | 'timeAttack' | 'survival' | 'daily';

export default function QuizQuest() {
  const [stars, setStars] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [fiftyFifty, setFiftyFifty] = useState(3);
  const [plusTen, setPlusTen] = useState(3);
  const [skip, setSkip] = useState(2);
  const [removedOptions, setRemovedOptions] = useState<number[]>([]);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [hoveredCard, setHoveredCard] = useState<GameMode | null>(null);
  const [showProfile, setShowProfile] = useState(false);

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

  useEffect(() => {
    if (isFlipped && !showResult && !quizComplete && timeLeft > 0 && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeOut();
            return getTimeLimit();
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isFlipped, showResult, quizComplete, timeLeft, questions]);

  const getTimeLimit = () => {
    switch (gameMode) {
      case 'timeAttack': return 10;
      case 'survival': return 20;
      case 'classic': return 15;
      case 'daily': return 15;
      default: return 15;
    }
  };

  const getQuestionsForMode = (mode: GameMode): Question[] => {
    const questions = questionsByCategory[mode];
    return [...questions].sort(() => Math.random() - 0.5);
  };

  const handleGameModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    const modeQuestions = getQuestionsForMode(mode);
    setQuestions(modeQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
    setTimeLeft(getTimeLimit());
    setFiftyFifty(3);
    setPlusTen(3);
    setSkip(2);
    setRemovedOptions([]);
    setIsFlipped(true);
  };

  const handleTimeOut = () => {
    setShowResult(true);
    setStreak(0);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        moveToNextQuestion();
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const handleDailyChallenge = () => {
    handleGameModeSelect('daily');
  };

  const moveToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(getTimeLimit());
    setRemovedOptions([]);
  };

  const handleAnswerClick = (index: number) => {
    if (showResult || removedOptions.includes(index)) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      moveToNextQuestion();
    } else {
      setQuizComplete(true);
    }
  };

  const handleFiftyFifty = () => {
    if (fiftyFifty <= 0 || showResult) return;
    setFiftyFifty(fiftyFifty - 1);
    
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const wrongOptions = [0, 1, 2, 3].filter(i => i !== correctAnswer);
    const shuffled = wrongOptions.sort(() => Math.random() - 0.5);
    setRemovedOptions(shuffled.slice(0, 2));
  };

  const handlePlusTen = () => {
    if (plusTen <= 0 || showResult) return;
    setPlusTen(plusTen - 1);
    setTimeLeft(timeLeft + 10);
  };

  const handleSkip = () => {
    if (skip <= 0 || showResult) return;
    setSkip(skip - 1);
    
    if (currentQuestion < questions.length - 1) {
      moveToNextQuestion();
    }
  };

  const resetQuiz = () => {
    setIsFlipped(false);
    setGameMode(null);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setStreak(0);
    setTimeLeft(15);
    setRemovedOptions([]);
    setHoveredCard(null);
  };

  const handleViewProfile = () => {
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const progress = questions.length > 0 ? ((currentQuestion) / questions.length) * 100 : 0;
  const timeProgress = (timeLeft / getTimeLimit()) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
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

      {/* Main card with flip animation */}
      <div className="relative w-full max-w-4xl h-[500px] sm:h-[550px] md:h-[580px] lg:h-[600px]" style={{ perspective: '1000px' }}>
        <div 
          className="relative w-full h-full transition-transform duration-700"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of card - Main Menu */}
          <div 
            className="absolute inset-0 bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-4 sm:p-6 md:p-8 overflow-y-auto"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Quiz Quest
            </h1>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-indigo-700/40">
                <div className="text-xs sm:text-sm text-slate-300 mb-1">Level</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">1</div>
              </div>

              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-slate-600/40">
                <div className="text-xs sm:text-sm text-slate-300 mb-1">XP</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">0/100</div>
              </div>

              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-slate-600/40">
                <div className="text-xs sm:text-sm text-slate-300 mb-1">High Score</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">0</div>
              </div>

              <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-slate-600/40">
                <div className="text-xs sm:text-sm text-slate-300 mb-1">Achievements</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">0</div>
              </div>
            </div>

            {/* Game modes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Classic */}
              <button 
                onClick={() => handleGameModeSelect('classic')}
                onMouseEnter={() => setHoveredCard('classic')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-slate-700/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border transition-all duration-300 hover:scale-105 ${
                  hoveredCard === 'classic' 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                    : 'border-slate-600/40 hover:border-purple-400/60'
                }`}
              >
                {hoveredCard === 'classic' && (
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-purple-500/10 blur-sm -z-10" />
                )}
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">🎯</div>
                <div className="text-sm sm:text-base font-bold text-white mb-1">Classic</div>
                <div className="text-xs text-slate-400 leading-tight sm:leading-snug">5 questions, 15 seconds each</div>
              </button>

              {/* Time Attack */}
              <button 
                onClick={() => handleGameModeSelect('timeAttack')}
                onMouseEnter={() => setHoveredCard('timeAttack')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-slate-700/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border transition-all duration-300 hover:scale-105 ${
                  hoveredCard === 'timeAttack' 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                    : 'border-slate-600/40 hover:border-purple-400/60'
                }`}
              >
                {hoveredCard === 'timeAttack' && (
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-purple-500/10 blur-sm -z-10" />
                )}
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">⚡</div>
                <div className="text-sm sm:text-base font-bold text-white mb-1">Time Attack</div>
                <div className="text-xs text-slate-400 leading-tight sm:leading-snug">8 questions, 10 seconds each</div>
              </button>

              {/* Survival */}
              <button 
                onClick={() => handleGameModeSelect('survival')}
                onMouseEnter={() => setHoveredCard('survival')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-slate-700/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border transition-all duration-300 hover:scale-105 ${
                  hoveredCard === 'survival' 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                    : 'border-slate-600/40 hover:border-purple-400/60'
                }`}
              >
                {hoveredCard === 'survival' && (
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-purple-500/10 blur-sm -z-10" />
                )}
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">🛡️</div>
                <div className="text-sm sm:text-base font-bold text-white mb-1">Survival</div>
                <div className="text-xs text-slate-400 leading-tight sm:leading-snug">10 challenging questions</div>
              </button>

              {/* Daily Challenge */}
              <button 
                onClick={handleDailyChallenge}
                onMouseEnter={() => setHoveredCard('daily')}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-slate-700/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border transition-all duration-300 hover:scale-105 ${
                  hoveredCard === 'daily' 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                    : 'border-slate-600/40 hover:border-purple-400/60'
                }`}
              >
                {hoveredCard === 'daily' && (
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-purple-500/10 blur-sm -z-10" />
                )}
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">🏆</div>
                <div className="text-sm sm:text-base font-bold text-white mb-1">Daily Challenge</div>
                <div className="text-xs text-slate-400 leading-tight sm:leading-snug">10 mixed questions</div>
              </button>
            </div>

            {/* View Profile */}
            <div className="flex justify-center">
              <button 
                onClick={handleViewProfile}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Back of card - Quiz Interface */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-purple-900/40 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-4 sm:p-6 md:p-8 flex flex-col overflow-y-auto"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {!quizComplete && questions.length > 0 ? (
              <>
                {/* Header with Score and Streak */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4">
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    Score: {score}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="text-sm sm:text-lg text-slate-300 capitalize">
                      {gameMode} Mode
                    </div>
                    <div className="bg-orange-600/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2">
                      <span className="text-xl sm:text-2xl">🔥</span>
                      <span className="text-lg sm:text-xl font-bold text-white">{streak}</span>
                      <span className="text-white font-semibold text-sm sm:text-base">Streak</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question Container */}
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 border border-slate-600/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 mb-2">
                      <div className="text-xs sm:text-sm text-slate-400">
                        Question {currentQuestion + 1} of {questions.length}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">
                        Category: {questions[currentQuestion].category}
                      </div>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {questions[currentQuestion].question}
                    </h2>
                  </div>
                  {/* Timer */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    <svg className="transform -rotate-90 w-16 h-16 sm:w-20 sm:h-20">
                      <circle
                        cx="32" cy="32" r="28"
                        className="text-slate-700"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="32" cy="32" r="28"
                        className="text-red-500"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - timeProgress / 100)}`}
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {timeLeft}
                    </div>
                  </div>
                </div>

                {/* Power-ups */}
                <div className="flex gap-2 sm:gap-3 mb-4 justify-center flex-wrap">
                  <button
                    onClick={handleFiftyFifty}
                    disabled={fiftyFifty <= 0 || showResult}
                    className="bg-slate-700/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-slate-600/40 hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="text-white font-semibold text-sm">50/50</span>
                    <span className="ml-1 sm:ml-2 bg-slate-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-white">{fiftyFifty}</span>
                  </button>
                  
                  <button
                    onClick={handlePlusTen}
                    disabled={plusTen <= 0 || showResult}
                    className="bg-slate-700/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-slate-600/40 hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="text-lg sm:text-xl">⏱️</span>
                    <span className="text-white font-semibold ml-1 text-sm">+10s</span>
                    <span className="ml-1 sm:ml-2 bg-slate-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-white">{plusTen}</span>
                  </button>
                  
                  <button
                    onClick={handleSkip}
                    disabled={skip <= 0 || showResult}
                    className="bg-slate-700/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-slate-600/40 hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="text-lg sm:text-xl">⏭️</span>
                    <span className="text-white font-semibold ml-1 text-sm">Skip</span>
                    <span className="ml-1 sm:ml-2 bg-slate-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-white">{skip}</span>
                  </button>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 flex-grow">
                  {questions[currentQuestion].options.map((option, index) => {
                    if (removedOptions.includes(index)) {
                      return (
                        <div key={index} className="opacity-0 pointer-events-none h-0"></div>
                      );
                    }
                    
                    const isCorrect = index === questions[currentQuestion].correctAnswer;
                    const isSelected = selectedAnswer === index;
                    const shouldShake = showResult && isSelected;
                    
                    let bgColor = 'bg-slate-700/40';
                    let borderColor = 'border-slate-600/40';
                    
                    if (showResult) {
                      if (isCorrect) {
                        bgColor = 'bg-green-600/50';
                        borderColor = 'border-green-500';
                      } else if (isSelected && !isCorrect) {
                        bgColor = 'bg-red-600/50';
                        borderColor = 'border-red-500';
                      }
                    }

                    const optionLabels = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={showResult}
                        className={`${bgColor} backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left border-2 ${borderColor} hover:border-purple-500/60 transition-all hover:scale-[1.02] disabled:hover:scale-100 flex items-center min-h-[60px] sm:min-h-[80px] ${
                          shouldShake ? 'animate-shake' : ''
                        }`}
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-pink-500/80 flex items-center justify-center mr-2 sm:mr-3 font-bold text-white text-sm sm:text-base flex-shrink-0">
                          {optionLabels[index]}.
                        </div>
                        <div className="text-white font-medium text-sm sm:text-lg break-words flex-1">
                          {option}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Next Question Button */}
                {showResult && (
                  <div className="flex justify-start">
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Quiz Complete Screen */
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🎉</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  Quiz Complete!
                </h2>
                <div className="text-xl sm:text-2xl text-slate-300 mb-2">
                  Your Score: <span className="text-green-400 font-bold">{score}</span>
                </div>
                <div className="text-sm sm:text-lg text-slate-400 mb-6 sm:mb-8 capitalize">
                  {gameMode} Mode
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => handleGameModeSelect(gameMode!)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Back to Menu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50 max-w-xs sm:max-w-sm w-full p-4 sm:p-6 relative">
            {/* Close button */}
            <button
              onClick={closeProfile}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Header */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl text-white font-bold">Q</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Quiz Master</h2>
              <div className="text-slate-400 text-xs sm:text-sm">Level 1 Explorer</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-slate-600/40">
                <div className="text-base sm:text-lg font-bold text-white mb-1">0</div>
                <div className="text-xs text-slate-300">Total XP</div>
              </div>
              <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-slate-600/40">
                <div className="text-base sm:text-lg font-bold text-white mb-1">0</div>
                <div className="text-xs text-slate-300">High Score</div>
              </div>
              <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-slate-600/40">
                <div className="text-base sm:text-lg font-bold text-white mb-1">0</div>
                <div className="text-xs text-slate-300">Best Streak</div>
              </div>
              <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-slate-600/40">
                <div className="text-base sm:text-lg font-bold text-white mb-1">0</div>
                <div className="text-xs text-slate-300">Games Played</div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-xs sm:text-sm">Total Correct:</span>
                <span className="text-white font-semibold text-xs sm:text-sm">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-xs sm:text-sm">Total Questions:</span>
                <span className="text-white font-semibold text-xs sm:text-sm">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-xs sm:text-sm">Overall Accuracy:</span>
                <span className="text-green-400 font-semibold text-xs sm:text-sm">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-xs sm:text-sm">Achievements:</span>
                <span className="text-yellow-400 font-semibold text-xs sm:text-sm">0/8</span>
              </div>
            </div>

            {/* XP Progress */}
            <div className="mb-4 sm:mb-5">
              <div className="flex justify-between text-xs text-slate-300 mb-1 sm:mb-2">
                <span>Level Progress</span>
                <span>0/500 XP</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `0%` }}
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeProfile}
              className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg sm:rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}