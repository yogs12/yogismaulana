export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  avatarUrl: string;
  bio: string;
  tagline: string;
  stats: { label: string; value: string }[];
  status: 'hiring' | 'open' | 'busy';
  resumeUrl: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
  twitter?: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; iconName: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'design';
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface PortfolioData {
  profile: Profile;
  socials: SocialLinks;
  skillCategories: SkillCategory[];
  projects: Project[];
  timeline: TimelineItem[];
}
