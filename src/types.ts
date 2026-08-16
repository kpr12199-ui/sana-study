export interface SiteProfile {
  name: string;
  englishName: string;
  school: string;
  grade: string;
  tagline: string;
  interests: string[];
  avatarUrl: string;
  aboutIntro: string;
  learningFocus: string;
  currentLearning: string;
  futureGoals: string;
  adminEmail: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  challenge: string;
  solution: string;
  reflection: string;
  images: string[];
  videoUrl: string;
  order: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
  order: number;
}

export interface SiteData {
  profile: SiteProfile;
  projects: ProjectItem[];
  timeline: TimelineItem[];
  skills: SkillCategory[];
  updatedAt: string;
}
