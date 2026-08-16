import React from 'react';
import { ArrowDown, Mountain, Music, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { SiteProfile } from '../types';

interface HeroProps {
  profile: SiteProfile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50/90 via-sky-50/40 to-pink-50/90"
    >
      {/* Decorative Pastel Background Glows */}
      <div className="absolute top-12 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-sky-200/50 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-pink-200/45 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center z-10">
        {/* Status Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-sky-200/80 shadow-xs text-xs font-semibold text-sky-800 mb-6 backdrop-blur-md"
        >
          <GraduationCap className="w-4 h-4 text-sky-600" />
          <span>{profile.school} · {profile.grade}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
          <span className="text-pink-600 font-medium">學習歷程個人作品集</span>
        </div>

        {/* Avatar with vibrant pastel ring */}
        <div className="relative mb-6 group">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-sky-400 via-pink-300 to-sky-300 shadow-lg vibrant-glow-sky">
            <img
              id="hero-avatar-image"
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full bg-slate-100 ring-2 ring-white"
              onError={(e) => {
                // Fallback avatar if URL fails
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md border border-pink-200 text-pink-500">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Greeting & Name */}
        <p className="text-xs uppercase tracking-widest text-sky-700 font-bold mb-2">
          HELLO, I'M
        </p>
        <h1
          id="hero-name-heading"
          className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight mb-4"
        >
          {profile.name}
          {profile.englishName && (
            <span className="block sm:inline sm:ml-3 text-xl sm:text-2xl font-normal text-slate-500">
              {profile.englishName}
            </span>
          )}
        </h1>

        {/* Student Tagline Quote */}
        <div className="max-w-xl mx-auto mb-6 px-5 py-3.5 bg-white/85 backdrop-blur-md rounded-2xl border border-sky-100/90 shadow-xs">
          <p className="text-base sm:text-lg text-slate-700 font-medium italic">
            「{profile.tagline}」
          </p>
        </div>

        {/* Interests Badges */}
        <div id="hero-interests-list" className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {profile.interests && profile.interests.map((interest, idx) => {
            const isMountain = interest.includes('山') || interest.includes('露營');
            const isMusic = interest.includes('音') || interest.includes('樂');
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-2xs border transition-transform hover:scale-105 ${
                  idx % 2 === 0
                    ? 'bg-sky-50/90 text-sky-800 border-sky-200/80 hover:bg-sky-100'
                    : 'bg-pink-50/90 text-pink-850 border-pink-200/80 hover:bg-pink-100'
                }`}
              >
                {isMountain && <Mountain className="w-3.5 h-3.5 text-sky-600" />}
                {isMusic && <Music className="w-3.5 h-3.5 text-pink-600" />}
                {!isMountain && !isMusic && <Sparkles className="w-3.5 h-3.5 text-sky-500" />}
                {interest}
              </span>
            );
          })}
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <a
            href="#projects"
            id="hero-cta-projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-pink-500 hover:from-sky-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>查看我的作品</span>
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#about"
            id="hero-cta-about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-sky-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span>了解關於我</span>
          </a>
        </div>
      </div>
    </section>
  );
};
