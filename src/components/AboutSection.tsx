import React from 'react';
import { BookOpen, Target, Compass, Sparkles, Heart, Flame } from 'lucide-react';
import { SiteProfile } from '../types';

interface AboutSectionProps {
  profile: SiteProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-pink-500" />
            ABOUT ME
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            關於我與學習初心
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            熱愛山林戶外、音樂創作與科技探索的高中生，在實作中體會探究的樂趣
          </p>
        </div>

        {/* Main Intro Card */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-pink-50/70 border border-sky-100/90 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-100 to-pink-100 items-center justify-center text-sky-600 shrink-0 border border-sky-200/50 shadow-2xs">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                嗨！我是 {profile.name}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {profile.aboutIntro}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Focus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 學習方向 */}
          <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-700 mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2.5 group-hover:text-sky-700 transition-colors">
                學習方向與理念
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {profile.learningFocus}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>跨領域探索 · 自主學習</span>
            </div>
          </div>

          {/* Card 2: 目前正在學習 */}
          <div className="p-6 rounded-3xl bg-white border border-pink-100 shadow-xs hover:shadow-md hover:border-pink-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-pink-50 border border-pink-200/60 flex items-center justify-center text-pink-700 mb-4 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2.5 group-hover:text-pink-700 transition-colors">
                目前正在學習的內容
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {profile.currentLearning}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-pink-700">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>持續精進 · 動手實踐</span>
            </div>
          </div>

          {/* Card 3: 未來目標 */}
          <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-700 mb-4 group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2.5 group-hover:text-sky-700 transition-colors">
                未來想挑戰的事情
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {profile.futureGoals}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>勇於嘗試 · 追求突破</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
