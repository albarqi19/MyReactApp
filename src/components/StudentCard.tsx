import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Target,
  TrendingUp,
  Trophy,
  Star,
  Shield
} from 'lucide-react';
import type { Student } from '../types';
import Confetti from 'react-confetti';
import { StudentSearch } from './StudentSearch';
import { getNextLevel } from '../utils/levels';

interface StudentCardProps {
  student: Student;
  onReset: () => void;
  onSearch: (studentId: string) => void;
  isSearching: boolean;
}

const getCelebrationConfig = (points: number) => {
  const configs = [
    { points: 0, pieces: 50, gravity: 0.1, duration: 1500 },
    { points: 5, pieces: 75, gravity: 0.1, duration: 1500 },
    { points: 10, pieces: 100, gravity: 0.1, duration: 1500 },
    { points: 20, pieces: 125, gravity: 0.1, duration: 1500 },
    { points: 30, pieces: 150, gravity: 0.1, duration: 1500 },
    { points: 50, pieces: 175, gravity: 0.1, duration: 1500 },
    { points: 100, pieces: 200, gravity: 0.1, duration: 1500 },
    { points: 200, pieces: 225, gravity: 0.1, duration: 1500 },
    { points: 500, pieces: 250, gravity: 0.1, duration: 1500 },
    { points: 1000, pieces: 300, gravity: 0.1, duration: 1500 }
  ];

  const config = configs.reduce((prev, curr) => {
    if (points >= curr.points) return curr;
    return prev;
  }, configs[0]);

  return {
    ...config,
    recycle: false,
    colors: ['#FCD34D', '#F59E0B', '#F97316', '#F43F5E', '#EC4899']
  };
};

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onReset,
  onSearch,
  isSearching
}) => {
  const nextLevelInfo = getNextLevel(student.points);
  const celebrationConfig = getCelebrationConfig(student.points);

  useEffect(() => {
    const timer = setTimeout(onReset, 10000);
    
    const resetTimer = () => {
      clearTimeout(timer);
      const newTimer = setTimeout(onReset, 10000);
      return () => clearTimeout(newTimer);
    };

    window.addEventListener('click', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, [onReset]);

  return (
    <div className="relative">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={celebrationConfig.pieces}
        gravity={celebrationConfig.gravity}
        colors={celebrationConfig.colors}
        recycle={celebrationConfig.recycle}
        tweenDuration={celebrationConfig.duration}
        initialVelocityY={{ min: -15, max: -10 }}
        initialVelocityX={{ min: -10, max: 10 }}
        confettiSource={{
          x: window.innerWidth / 2,
          y: window.innerHeight,
          w: window.innerWidth,
          h: 0
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
      >
        <button
          onClick={onReset}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          disabled={isSearching}
        >
          <ArrowLeft className="w-4 h-4" />
          العودة
        </button>

        <div className="text-center mb-6">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-1">{student.name}</h2>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <Award className="w-4 h-4" />
            <span>{student.className}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg p-4 text-white overflow-hidden"
          >
            <motion.div 
              className="absolute right-0 top-0 w-full h-full opacity-10"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star className="w-16 h-16 absolute right-2 top-1/2 -translate-y-1/2" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center">
              <Target className="w-6 h-6 mb-1" />
              <p className="text-sm">النقاط</p>
              <p className="text-2xl font-bold">{student.points}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-4 text-white overflow-hidden"
          >
            <motion.div 
              className="absolute right-0 top-0 w-full h-full opacity-10"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Shield className="w-16 h-16 absolute right-2 top-1/2 -translate-y-1/2" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center">
              <Award className="w-6 h-6 mb-1" />
              <p className="text-sm">المستوى</p>
              <p className="text-lg font-bold">{student.level}</p>
            </div>
          </motion.div>
        </div>

        {student.violations && student.violations.length > 0 && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 bg-orange-50 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-orange-900">الملاحظات</h3>
            </div>
            <ul className="space-y-1">
              {student.violations.map((violation, index) => (
                <li key={index} className="text-sm text-orange-600">
                  • {violation}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {nextLevelInfo && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-700">المستوى التالي</p>
                <p className="font-medium text-green-900">
                  باقي {nextLevelInfo.pointsNeeded} نقطة للوصول إلى {nextLevelInfo.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <StudentSearch onSearch={onSearch} isSearching={isSearching} compact autoFocus />
      </motion.div>
    </div>
  );
};