export interface Spot1Bio {
  spotNumber: 1;
  spotTitle: string;
  fullName: string;
  role: string;
  avatarInitials?: string;
  profileImage?: string;
  statusBadge: string;
  bioStory: string;
  location?: string;
  email?: string;
  socials?: Array<{ id: string; label: string; url: string }>;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Spot2Skills {
  spotNumber: 2;
  spotTitle: string;
  subtitle: string;
  categories: SkillCategory[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Spot3Experience {
  spotNumber: 3;
  spotTitle: string;
  subtitle: string;
  items: ExperienceItem[];
}

export interface ProjectHighlight {
  id: string;
  title: string;
  tag: string;
  description: string;
  linkText?: string;
  url?: string;
}

export interface Spot4Projects {
  spotNumber: 4;
  spotTitle: string;
  subtitle: string;
  items: ProjectHighlight[];
}

export interface FactItem {
  id: string;
  label: string;
  value: string;
}

export interface Spot5Interests {
  spotNumber: 5;
  spotTitle: string;
  subtitle: string;
  quote?: string;
  quoteAuthor?: string;
  facts: FactItem[];
}

export interface AboutMeData {
  spot1: Spot1Bio;
  spot2: Spot2Skills;
  spot3: Spot3Experience;
  spot4: Spot4Projects;
  spot5: Spot5Interests;
}

export type SpotNumber = 1 | 2 | 3 | 4 | 5;
