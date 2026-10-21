import { GalleryItem, GalleryCategory } from '@/data/gallery';
import { TeamMember, GoogleColor } from '@/data/team';

export type AdminTab = 
  | 'dashboard' 
  | 'events' 
  | 'gallery' 
  | 'team' 
  | 'domains' 
  | 'inquiries' 
  | 'stats' 
  | 'announcements';

export type EventStatus = 'Draft' | 'Scheduled' | 'Live' | 'Completed' | 'Cancelled';

export interface AdminEvent {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'devfest' | 'workshops' | 'hackathons' | 'community';
  status: EventStatus;
  date: string; // YYYY-MM-DD or formatted
  time: string; // e.g. "10:00 AM - 05:00 PM"
  location: string;
  locationType: 'In-Person' | 'Virtual' | 'Hybrid';
  registrationUrl: string;
  capacity?: number;
  accentColor: GoogleColor;
  isFeatured: boolean;
  coverImageUrl?: string;
  description: string;
}

export interface AdminDomain {
  id: string;
  index: string;
  name: string;
  watermark: string;
  description: string;
  technologies: string[];
  accentColor: string;
  bgColor: string;
  leadName?: string;
}

export type InquiryStatus = 'NEW' | 'UNDER_REVIEW' | 'CONTACTED' | 'CONFIRMED' | 'DECLINED';

export interface AdminInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  tierInterest: string;
  budgetRange?: string;
  message: string;
  status: InquiryStatus;
  internalNote?: string;
  date: string;
}

export interface AdminStat {
  id: string;
  key: string;
  label: string;
  value: string;
  verificationNote: string;
}

export interface AdminAnnouncement {
  isActive: boolean;
  message: string;
  ctaText: string;
  ctaUrl: string;
  type: 'info' | 'highlight' | 'urgent';
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  action: 'create' | 'update' | 'delete' | 'publish';
  entity: 'Event' | 'Photo' | 'Team Member' | 'Domain' | 'Inquiry' | 'Metric' | 'Announcement';
  title: string;
  timestamp: string;
}
