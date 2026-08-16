import React from 'react';
import { Heart, Compass, Mountain, Music } from 'lucide-react';
import { SiteProfile } from '../types';

interface FooterProps {
  profile: SiteProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-white border-t border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 via-sky-300 to-pink-400 flex items-center justify-center text-white shadow-xs">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">
              {profile.name} · 學習歷程作品集
            </p>
            <p className="text-xs text-slate-500">
              {profile.school} · {profile.grade}
            </p>
          </div>
        </div>

        {/* Center Quote / Icons */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Mountain className="w-3.5 h-3.5 text-sky-500" />
            探索山林
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Music className="w-3.5 h-3.5 text-pink-500" />
            音樂創作
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 text-center sm:text-right">
          <p className="flex items-center justify-center sm:justify-end gap-1">
            Designed by <span className="font-semibold text-slate-700">{profile.name}</span>
          </p>
          <p className="mt-0.5 text-slate-400 text-2xs">
            © {currentYear} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
