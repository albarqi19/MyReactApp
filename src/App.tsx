import React, { useState } from 'react';
import { StudentSearch } from './components/StudentSearch';
import { StudentCard } from './components/StudentCard';
import { Announcements } from './components/Announcements';
import { FeaturedStudents } from './components/FeaturedStudents';
import { Search, GraduationCap } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import type { Student } from './types';

export default function App() {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (studentId: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwQX5wAZleh6puyObYMScfOlVMeMrZDUSX-LEznKsIDHnY0buEn3T6Dx1KhYcmGIkniSw/exec?studentId=${studentId}`
      );
      const data = await response.json();

      if (data.message) {
        toast.error('لم يتم العثور على الطالب', {
          icon: '❌',
          duration: 3000,
        });
        return;
      }

      setStudentData({
        ...data,
        level: data.parts,
        className: data.class
      });

      toast.success('تم العثور على بيانات الطالب!', {
        icon: '🌟',
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء البحث', {
        icon: '❌',
        duration: 3000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setStudentData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {!studentData ? (
          <>
            <div className="text-center mb-10">
              <GraduationCap className="w-16 h-16 text-green-500 mx-auto mb-2" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                سمو
              </h1>
              <p className="text-gray-600">
                تحفيز ومتابعة نقاط الطلاب
              </p>
            </div>

            <div className="space-y-8">
              <Announcements />
              <FeaturedStudents />
              <StudentSearch onSearch={handleSearch} isSearching={isSearching} autoFocus />
            </div>
          </>
        ) : (
          <StudentCard
            student={studentData}
            onReset={handleReset}
            onSearch={handleSearch}
            isSearching={isSearching}
          />
        )}
      </div>

      {isSearching && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <Search 
                className="w-20 h-20 text-gray-400" 
                style={{ 
                  filter: 'drop-shadow(0 0 8px rgba(156, 163, 175, 0.5))',
                  animation: 'searchWave 1.5s ease-in-out infinite'
                }} 
              />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-medium text-gray-900">جاري البحث</p>
              <p className="text-sm text-gray-500">يرجى الانتظار...</p>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
}