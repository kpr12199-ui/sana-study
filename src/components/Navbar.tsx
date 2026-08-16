import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Compass } from 'lucide-react';
import { SiteProfile } from '../types';

interface NavbarProps {
  profile: SiteProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '首頁', href: '#hero' },
    { label: '關於我', href: '#about' },
    { label: '我的作品', href: '#projects' },
    { label: '學習歷程', href: '#timeline' },
    { label: '多元技能', href: '#skills' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-sky-100/60 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Student Brand */}
        <a
          href="#hero"
          id="navbar-brand-link"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 via-sky-300 to-pink-300 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-base tracking-wide flex items-center gap-1.5">
              {profile.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400"></span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {profile.school} · {profile.grade}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50/80 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#projects"
            id="nav-explore-btn"
            className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-pink-500 hover:from-sky-600 hover:to-pink-600 transition-all shadow-xs hover:shadow-sm hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            探索專案
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label="選單"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-sky-50 focus:outline-none transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-dropdown"
          className="md:hidden bg-white/95 backdrop-blur-xl border-b border-sky-100 px-5 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-sky-800 bg-sky-100 hover:bg-sky-200 border border-sky-200 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              查看所有作品
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
