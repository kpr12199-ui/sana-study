import React, { useState, useEffect } from 'react';
import { SiteData } from './types';
import { getSiteData, saveSiteData } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname.includes('/admin') || hash.includes('/admin')) {
        return '/admin';
      }
    }
    return '/';
  });

  const [authenticatedUserEmail, setAuthenticatedUserEmail] = useState<string | null>(null);

  // Sync route on browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname.includes('/admin') || hash.includes('/admin')) {
        setCurrentPath('/admin');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Listen to data updates from storage
    const handleDataUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<SiteData>;
      if (customEvent.detail) {
        setSiteData(customEvent.detail);
      }
    };
    window.addEventListener('siteDataUpdated', handleDataUpdate);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('siteDataUpdated', handleDataUpdate);
    };
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (path === '/admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  const handleUpdateSiteData = (newData: SiteData) => {
    setSiteData(newData);
    saveSiteData(newData);
  };

  // If user is accessing /admin
  if (currentPath === '/admin') {
    // If not yet authenticated, show the Google Sign-in verification screen
    if (!authenticatedUserEmail) {
      return (
        <AdminAuthModal
          expectedEmail={siteData.profile.adminEmail || 'kpr12199@gmail.com'}
          onAuthenticated={(email) => setAuthenticatedUserEmail(email)}
          onBackToHome={() => navigateTo('/')}
        />
      );
    }

    // Authenticated admin dashboard
    return (
      <AdminDashboard
        data={siteData}
        userEmail={authenticatedUserEmail}
        onUpdateData={handleUpdateSiteData}
        onBackToHome={() => navigateTo('/')}
        onLogout={() => {
          setAuthenticatedUserEmail(null);
          navigateTo('/');
        }}
      />
    );
  }

  // Public Website (strictly view-only, no admin hints or edit buttons)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-pink-100 selection:text-pink-900">
      <Navbar profile={siteData.profile} />
      <main className="flex-1">
        <Hero profile={siteData.profile} />
        <AboutSection profile={siteData.profile} />
        <ProjectsSection projects={siteData.projects} />
        <TimelineSection timeline={siteData.timeline} />
        <SkillsSection skills={siteData.skills} />
      </main>
      <Footer profile={siteData.profile} />
    </div>
  );
}
