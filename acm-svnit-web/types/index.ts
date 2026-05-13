export type EventCategory = "workshop" | "hackathon" | "talk" | "competition";

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO
  venue: string;
  category: EventCategory;
  image?: string;
  registrationLink?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  domain: string;
  year: number; // e.g. 2024
  image?: string;
  linkedin?: string;
  github?: string;
};

export type Domain = {
  id: string;
  name: string;
  icon: string;
  description: string;
  memberCount: number;
  color: string;
  recentProjects: string[];
};

export type Milestone = {
  year: number;
  title: string;
  description: string;
};
