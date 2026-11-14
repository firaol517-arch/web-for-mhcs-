export type NavigationTab = 
  | 'home' 
  | 'events' 
  | 'hospital-ministry' 
  | 'family' 
  | 'gallery' 
  | 'publications' 
  | 'register' 
  | 'contact' 
  | 'admin';

export type SectionId =
  | 'hero'
  | 'about'
  | 'worship'
  | 'hospital'
  | 'events'
  | 'family'
  | 'gallery'
  | 'publications'
  | 'register'
  | 'contact';

export interface MezmurItem {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  artist: string;
  tag: string;
  description: string;
}

export type DetailKind = 'photo' | 'event' | 'publication' | 'ministry';

export interface DetailRoute {
  kind: DetailKind;
  id: string;
  returnSection?: SectionId;
}

export type MCSFDepartment = 
  | 'Medicine & Surgery'
  | 'Nursing & Adult ICU'
  | 'Pharmacy'
  | 'Medical Laboratory Science'
  | 'Anesthesia & Intensive Care'
  | 'Midwifery & Maternal Health'
  | 'Public Health & Epidemiology'
  | 'Postgraduate & Clinical Specialty'
  | 'Alumni & Healthcare Practicing';

export type MCSFMinistryTeam = 
  | 'Hospital Ward & ICU Ministry'
  | 'Worship & Music Team'
  | 'Scripture & Medical Ethics'
  | 'Prayer & Intercession'
  | 'Charity & Patient Relief'
  | 'Media, Tech & Photography'
  | 'First-Year Student Care'
  | 'Exploring / Not Sure Yet';

export type AcademicYear = 
  | 'Year 1 (Pre-Clinical)' 
  | 'Year 2' 
  | 'Year 3 (Clerkship)' 
  | 'Year 4 (Internship / Senior)' 
  | 'Postgraduate / Resident' 
  | 'Alumni';

export interface LeaderContact {
  name: string;
  telegramUsername: string;
  phone: string;
  role: string;
  bio: string;
  description?: string;
}

export interface RegistrationRecord {
  id: string;
  fullName: string;
  department: MCSFDepartment;
  academicYear: AcademicYear;
  teams: MCSFMinistryTeam[];
  phone: string;
  email: string;
  registeredAt: string;
  status: 'active' | 'pending-review' | 'contacted';
  notes?: string;
}

export interface FamilyRequestRecord {
  id: string;
  fullName: string;
  department: string;
  academicYear: string;
  phone: string;
  email: string;
  dutyShiftNotes?: string;
  submittedAt: string;
  assignedFamilyGroup?: string;
}

export interface FeedbackRecord {
  id: string;
  type: 'prayer-request' | 'testimony' | 'suggestion' | 'hospital-visit' | 'other';
  message: string;
  name?: string;
  email?: string;
  phone?: string;
  submittedAt: string;
}

export interface PublicationItem {
  id: string;
  slug: string;
  category: 'Devotional' | 'Medical Ethics' | 'Poem' | 'Testimony';
  title: string;
  amharicTitle?: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  likes: number;
  coverImage?: string;
  content: string[];
}

export interface EventItem {
  id: string;
  title: string;
  amharicTitle?: string;
  category: 'Main Fellowship' | 'Hospital & Ward Prayer' | 'Family Circle' | 'Annual Retreat';
  schedule: string;
  ethiopianTime: string;
  standardTime: string;
  location: string;
  description: string;
  highlights: string[];
  image?: string;
  status: 'Active Weekly' | 'Upcoming' | 'Periodic';
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  date?: string;
  location?: string;
  description: string;
  story?: string[];
}

export interface MinistrySpotlight {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  fullStory: string[];
  scripture?: string;
}
