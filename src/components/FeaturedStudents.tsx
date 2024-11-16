import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, TrendingUp } from 'lucide-react';

const FEATURED_STUDENTS = [
  {
    title: 'أفضل طالب هذا الأسبوع',
    name: 'عبدالله محمد',
    icon: Trophy,
    color: 'from-amber-500 to-yellow-500',
    textColor: 'text-amber-900',
    bgColor: 'bg-amber-100',
    glowColor: 'after:bg-yellow-500'
  },
  {
    title: 'الطالب المنتظم في الأسبوع',
    name: 'أحمد خالد',
    icon: Clock,
    color: 'from-blue-500 to-indigo-500',
    textColor: 'text-blue-900',
    bgColor: 'bg-blue-100',
    glowColor: 'after:bg-blue-500'
  },
  {
    title: 'الطالب الصاعد في الأسبوع',
    name: 'محمد سعد',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    textColor: 'text-green-900',
    bgColor: 'bg-green-100',
    glowColor: 'after:bg-green-500'
  }
];

export const FeaturedStudents: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_STUDENTS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <AnimatePresence mode="wait">
        {FEATURED_STUDENTS.map((student, index) => {
          const Icon = student.icon;
          return index === currentIndex ? (
            <motion.div
              key={student.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`relative overflow-hidden bg-gradient-to-r ${student.color} rounded-lg p-4 shadow-lg
                after:content-[''] after:absolute after:w-[200%] after:h-[200%] after:top-[-50%] after:left-[-50%]
                after:rounded-[40%] after:opacity-30 after:animate-spin-slow ${student.glowColor}`}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className={`${student.bgColor} p-2 rounded-full backdrop-blur-sm`}>
                  <Icon className={`w-6 h-6 ${student.textColor}`} />
                </div>
                <div className="text-white">
                  <h3 className="text-sm font-medium opacity-90">{student.title}</h3>
                  <p className="text-lg font-bold">{student.name}</p>
                </div>
              </div>
            </motion.div>
          ) : null;
        })}
      </AnimatePresence>
    </div>
  );
};