import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdminTab, 
  AdminEvent, 
  AdminDomain, 
  AdminInquiry, 
  AdminStat, 
  AdminAnnouncement, 
  ActivityItem, 
  EventStatus,
  InquiryStatus
} from './types';
import { GALLERY_ITEMS, GalleryItem } from '@/data/gallery';
import { teacherMentor, organizers, coreTeam, TeamMember } from '@/data/team';
import { 
  fetchTeamMembers, 
  createTeamMemberApi, 
  updateTeamMemberApi, 
  deleteTeamMemberApi 
} from '@/services/teamApi';

// Initial Mock Data
const INITIAL_EVENTS: AdminEvent[] = [
  {
    id: 'evt-1',
    slug: 'devfest-kolkata-2025',
    title: 'DevFest Kolkata 2025',
    tagline: 'The premier annual developer conference of Eastern India.',
    category: 'devfest',
    status: 'Scheduled',
    date: '2025-10-25',
    time: '09:30 AM - 05:30 PM',
    location: 'Biswa Bangla Mela Prangan, Kolkata',
    locationType: 'In-Person',
    registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-kolkata-devfest-2025',
    capacity: 650,
    accentColor: 'blue',
    isFeatured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=90&w=2400&auto=format&fit=crop',
    description: 'DevFest Kolkata brings together hundreds of developers, designers, and tech leaders for a full day of keynotes, multi-track deep dives into AI, Cloud, Android, and Web, plus interactive code labs and networking.'
  },
  {
    id: 'evt-2',
    slug: 'cloud-community-day-2025',
    title: 'Cloud Community Day Kolkata',
    tagline: 'Scaling distributed infrastructure and generative workloads on GCP.',
    category: 'workshops',
    status: 'Completed',
    date: '2025-08-16',
    time: '10:00 AM - 04:00 PM',
    location: 'ITC Sonar, Kolkata',
    locationType: 'In-Person',
    registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-kolkata-ccd-2025',
    capacity: 400,
    accentColor: 'yellow',
    isFeatured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=90&w=2400&auto=format&fit=crop',
    description: 'A focused summit exploring cloud-native architectures, Kubernetes in production, BigQuery data pipelines, and Vertex AI integrations.'
  },
  {
    id: 'evt-3',
    slug: 'build-with-ai-hackathon',
    title: 'Build with AI Hackathon 2025',
    tagline: '48 hours of rapid prototyping with Gemini and open-source models.',
    category: 'hackathons',
    status: 'Scheduled',
    date: '2025-11-22',
    time: '09:00 AM - 06:00 PM',
    location: 'FIEM Tech Innovation Hub',
    locationType: 'Hybrid',
    registrationUrl: 'https://gdg.community.dev/events/details/build-with-ai-fiem',
    capacity: 250,
    accentColor: 'green',
    isFeatured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=90&w=2400&auto=format&fit=crop',
    description: 'Join developers across colleges to build real-world intelligent applications utilizing Google Gemini APIs, multimodality, and agentic workflows.'
  },
  {
    id: 'evt-4',
    slug: 'intro-to-web-architecture',
    title: 'Modern Web Architecture with Next.js',
    tagline: 'Hands-on deep dive into SSR, Edge runtimes, and React Server Components.',
    category: 'workshops',
    status: 'Completed',
    date: '2025-03-10',
    time: '02:00 PM - 05:00 PM',
    location: 'Online Stream',
    locationType: 'Virtual',
    registrationUrl: 'https://gdg.community.dev/events/details/web-arch-workshop',
    capacity: 350,
    accentColor: 'red',
    isFeatured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=90&w=2400&auto=format&fit=crop',
    description: 'An architectural exploration of modern web development, performance optimization, and Next.js full-stack deployments.'
  }
];

const INITIAL_DOMAINS: AdminDomain[] = [
  {
    id: 'tech',
    index: '01',
    name: 'Tech Domain',
    watermark: 'TECH',
    description: 'Building the digital backbone of our community. From cutting-edge web applications to machine learning models, we turn complex problems into elegant code.',
    technologies: ['Web Dev', 'App Dev', 'AI/ML', 'Cloud Computing', 'Open Source'],
    accentColor: '#4285F4',
    bgColor: '#EAF1FE',
    leadName: 'Tech Lead'
  },
  {
    id: 'creatives',
    index: '02',
    name: 'Creative & Design',
    watermark: 'DESIGN',
    description: 'Crafting the visual identity and user experience. We bridge the gap between human psychology and digital interaction through stunning design and storytelling.',
    technologies: ['UI/UX', 'Graphic Design', 'Motion Design', 'Branding', 'Figma'],
    accentColor: '#EA4335',
    bgColor: '#FCECEB',
    leadName: 'Creative Lead'
  },
  {
    id: 'outreach',
    index: '03',
    name: 'PR & Outreach',
    watermark: 'OUTREACH',
    description: 'Connecting our community with the world. We build strategic partnerships, manage communications, and ensure our message reaches the right audience at the right time.',
    technologies: ['Networking', 'Social Media', 'Sponsorships', 'Marketing', 'PR'],
    accentColor: '#34A853',
    bgColor: '#EBF6EE',
    leadName: 'Outreach Lead'
  },
  {
    id: 'events',
    index: '04',
    name: 'Event Management',
    watermark: 'EVENTS',
    description: 'Orchestrating seamless experiences. From massive hackathons to intimate speaker sessions, we handle the logistics, planning, and execution that bring our events to life.',
    technologies: ['Logistics', 'Operations', 'Planning', 'Stage Management'],
    accentColor: '#FBBC04',
    bgColor: '#FFF7E6',
    leadName: 'Operations Lead'
  },
  {
    id: 'photography',
    index: '05',
    name: 'Photography & Media',
    watermark: 'MEDIA',
    description: 'Capturing moments and archiving memories. We document every workshop, keynote, and community milestone with cinematic precision.',
    technologies: ['Event Photography', 'Videography', 'Color Grading', 'Archiving'],
    accentColor: '#4285F4',
    bgColor: '#EAF1FE',
    leadName: 'Media Lead'
  }
];

const INITIAL_INQUIRIES: AdminInquiry[] = [
  {
    id: 'inq-1',
    companyName: 'Google Cloud Platform',
    contactName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98301 23456',
    tierInterest: 'Cloud & Venue Sponsor',
    budgetRange: '₹1,50,000+',
    message: 'We would love to sponsor DevFest Kolkata 2025 by offering free cloud credits to all attendees, mentoring sessions, and providing GCP swag kits.',
    status: 'UNDER_REVIEW',
    internalNote: 'Lead organizer reached out via email on Oct 14. Setting up a call for next Tuesday.',
    date: '2025-10-14'
  },
  {
    id: 'inq-2',
    companyName: 'JetBrains',
    contactName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    tierInterest: 'Tooling & Licenses Partner',
    budgetRange: 'Software Licenses',
    message: 'Providing complimentary 1-year All Products educational licenses for workshop participants and hackathon winners.',
    status: 'CONFIRMED',
    internalNote: 'License voucher codes received. Ready to distribute at the upcoming hackathon.',
    date: '2025-10-02'
  },
  {
    id: 'inq-3',
    companyName: 'Kolkata Tech Hub',
    contactName: 'Rohan Sen',
    email: 'rohan.sen@example.com',
    phone: '+91 98310 98765',
    tierInterest: 'Community Partner',
    budgetRange: '₹35,000',
    message: 'Interested in partnering for student outreach and co-hosting an AI workshop in Sector V.',
    status: 'NEW',
    internalNote: 'Reviewing proposal alignment with chapter policies.',
    date: '2025-10-18'
  }
];

const INITIAL_STATS: AdminStat[] = [
  {
    id: 'stat-1',
    key: 'members',
    label: 'Community Members',
    value: '2,500+',
    verificationNote: 'Verified from official Bevy chapter dashboard active subscriber count.'
  },
  {
    id: 'stat-2',
    key: 'events',
    label: 'Events Hosted',
    value: '35+',
    verificationNote: 'Counted from completed chapter events over the past two academic cycles.'
  },
  {
    id: 'stat-3',
    key: 'speakers',
    label: 'Industry Speakers',
    value: '50+',
    verificationNote: 'Includes Google Developer Experts, engineers, and faculty mentors hosted.'
  },
  {
    id: 'stat-4',
    key: 'attendees',
    label: 'Developers Reached',
    value: '10,000+',
    verificationNote: 'Aggregated attendance from DevFest, Study Jams, and workshop registrations.'
  }
];

const INITIAL_ANNOUNCEMENT: AdminAnnouncement = {
  isActive: true,
  message: 'DevFest Kolkata 2025 tickets will go live soon! Join the waitlist now.',
  ctaText: 'View Details ↗',
  ctaUrl: '/events',
  type: 'highlight',
  updatedAt: '2025-10-20'
};

const INITIAL_ACTIVITY: ActivityItem[] = [
  { id: 'act-1', action: 'update', entity: 'Event', title: 'DevFest Kolkata 2025 capacity updated to 650', timestamp: '10 mins ago' },
  { id: 'act-2', action: 'create', entity: 'Photo', title: 'Added 4 new high-res photos to DevFest album', timestamp: '1 hour ago' },
  { id: 'act-3', action: 'update', entity: 'Inquiry', title: 'JetBrains partnership status moved to CONFIRMED', timestamp: '3 hours ago' },
  { id: 'act-4', action: 'publish', entity: 'Announcement', title: 'Updated homepage alert marquee banner', timestamp: '1 day ago' },
];

interface AdminContextType {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toastMessage: string | null;
  triggerToast: (msg: string) => void;

  // Events
  events: AdminEvent[];
  addEvent: (event: Omit<AdminEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<AdminEvent>) => void;
  deleteEvent: (id: string) => void;
  toggleEventStatus: (id: string) => void;
  toggleEventFeatured: (id: string) => void;

  // Gallery
  photos: GalleryItem[];
  addPhoto: (photo: Omit<GalleryItem, 'id'>) => void;
  updatePhoto: (id: string, updates: Partial<GalleryItem>) => void;
  deletePhoto: (id: string) => void;
  togglePhotoShowcase: (id: string) => void;

  // Team
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Domains
  domains: AdminDomain[];
  updateDomain: (id: string, updates: Partial<AdminDomain>) => void;

  // Inquiries
  inquiries: AdminInquiry[];
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  updateInquiryNote: (id: string, note: string) => void;
  deleteInquiry: (id: string) => void;

  // Stats
  stats: AdminStat[];
  updateStat: (id: string, updates: Partial<AdminStat>) => void;

  // Announcement
  announcement: AdminAnnouncement;
  updateAnnouncement: (updates: Partial<AdminAnnouncement>) => void;

  // Activity
  activityLogs: ActivityItem[];
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'gdg_fiem_admin_state_v1';

const getSavedState = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[key] !== undefined) return parsed[key];
    }
  } catch {
    // Ignore error
  }
  return fallback;
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // States initialized lazily
  const [events, setEvents] = useState<AdminEvent[]>(() => getSavedState('events', INITIAL_EVENTS));
  const [photos, setPhotos] = useState<GalleryItem[]>(() => getSavedState('photos', GALLERY_ITEMS));
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => getSavedState('teamMembers', [
    ...teacherMentor,
    ...organizers,
    ...coreTeam
  ]));
  const [domains, setDomains] = useState<AdminDomain[]>(() => getSavedState('domains', INITIAL_DOMAINS));
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(() => getSavedState('inquiries', INITIAL_INQUIRIES));
  const [stats, setStats] = useState<AdminStat[]>(() => getSavedState('stats', INITIAL_STATS));
  const [announcement, setAnnouncement] = useState<AdminAnnouncement>(() => getSavedState('announcement', INITIAL_ANNOUNCEMENT));
  const [activityLogs, setActivityLogs] = useState<ActivityItem[]>(() => getSavedState('activityLogs', INITIAL_ACTIVITY));

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        events,
        photos,
        teamMembers,
        domains,
        inquiries,
        stats,
        announcement,
        activityLogs
      }));
    } catch {
      // Ignore quota error
    }
  }, [events, photos, teamMembers, domains, inquiries, stats, announcement, activityLogs]);

  // Synchronize team roster from Express backend on mount
  useEffect(() => {
    let isMounted = true;
    fetchTeamMembers()
      .then((liveMembers) => {
        if (isMounted && Array.isArray(liveMembers) && liveMembers.length > 0) {
          setTeamMembers(liveMembers);
        }
      })
      .catch((err) => {
        console.warn('[AdminContext] Operating with cached team roster:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addLog = (action: ActivityItem['action'], entity: ActivityItem['entity'], title: string) => {
    const newLog: ActivityItem = {
      id: 'log-' + Date.now(),
      action,
      entity,
      title,
      timestamp: 'Just now'
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  // --- Events Handlers ---
  const addEvent = (eventData: Omit<AdminEvent, 'id'>) => {
    const newEvent: AdminEvent = {
      ...eventData,
      id: 'evt-' + Date.now(),
    };
    setEvents(prev => [newEvent, ...prev]);
    addLog('create', 'Event', `Created event: ${newEvent.title}`);
    triggerToast(`Event "${newEvent.title}" created successfully`);
  };

  const updateEvent = (id: string, updates: Partial<AdminEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    const target = events.find(e => e.id === id);
    addLog('update', 'Event', `Updated event: ${updates.title || target?.title || id}`);
    triggerToast('Event details updated');
  };

  const deleteEvent = (id: string) => {
    const target = events.find(e => e.id === id);
    setEvents(prev => prev.filter(e => e.id !== id));
    addLog('delete', 'Event', `Deleted event: ${target?.title || id}`);
    triggerToast('Event deleted');
  };

  const toggleEventStatus = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        const nextStatus: EventStatus = e.status === 'Scheduled' ? 'Live' : e.status === 'Live' ? 'Completed' : 'Scheduled';
        addLog('update', 'Event', `Changed status of "${e.title}" to ${nextStatus}`);
        return { ...e, status: nextStatus };
      }
      return e;
    }));
    triggerToast('Event status updated');
  };

  const toggleEventFeatured = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        const nextFeatured = !e.isFeatured;
        addLog('update', 'Event', `${nextFeatured ? 'Pinned' : 'Unpinned'} "${e.title}" as featured`);
        return { ...e, isFeatured: nextFeatured };
      }
      return e;
    }));
    triggerToast('Featured event toggled');
  };

  // --- Gallery Handlers ---
  const addPhoto = (photoData: Omit<GalleryItem, 'id'>) => {
    const newPhoto: GalleryItem = {
      ...photoData,
      id: 'photo-' + Date.now(),
    };
    setPhotos(prev => [newPhoto, ...prev]);
    addLog('create', 'Photo', `Added photo: ${newPhoto.title}`);
    triggerToast(`Photo "${newPhoto.title}" added to gallery`);
  };

  const updatePhoto = (id: string, updates: Partial<GalleryItem>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addLog('update', 'Photo', `Updated photo metadata for: ${updates.title || id}`);
    triggerToast('Photo metadata updated');
  };

  const deletePhoto = (id: string) => {
    const target = photos.find(p => p.id === id);
    setPhotos(prev => prev.filter(p => p.id !== id));
    addLog('delete', 'Photo', `Removed photo: ${target?.title || id}`);
    triggerToast('Photo deleted from gallery');
  };

  const togglePhotoShowcase = (id: string) => {
    setPhotos(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, location: p.location === 'Homepage Showcase' ? 'Main Gallery' : 'Homepage Showcase' };
      }
      return p;
    }));
    triggerToast('Homepage showcase photo toggled');
  };

  // --- Team Handlers (Backend Connected) ---
  const addTeamMember = async (memberData: Omit<TeamMember, 'id'>) => {
    const tempId = 'team-' + Date.now();
    const optimisticMember: TeamMember = {
      ...memberData,
      id: tempId,
    };
    // 1. Optimistic local update
    setTeamMembers(prev => [optimisticMember, ...prev]);
    addLog('create', 'Team Member', `Added team member: ${memberData.name}`);
    triggerToast(`Added ${memberData.name} to team roster`);

    // 2. Persist to Express backend
    try {
      const persisted = await createTeamMemberApi(memberData);
      setTeamMembers(prev => prev.map(m => m.id === tempId ? persisted : m));
    } catch (err) {
      console.warn('[AdminContext] Backend create error (kept in local cache):', err);
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    // 1. Optimistic local update
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    addLog('update', 'Team Member', `Updated profile of: ${updates.name || id}`);
    triggerToast('Team member profile updated');

    // 2. Persist to Express backend
    try {
      await updateTeamMemberApi(id, updates);
    } catch (err) {
      console.warn('[AdminContext] Backend update error (kept in local cache):', err);
    }
  };

  const deleteTeamMember = async (id: string) => {
    const target = teamMembers.find(m => m.id === id);
    // 1. Optimistic local update
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    addLog('delete', 'Team Member', `Removed team member: ${target?.name || id}`);
    triggerToast('Member removed from team');

    // 2. Persist to Express backend
    try {
      await deleteTeamMemberApi(id);
    } catch (err) {
      console.warn('[AdminContext] Backend delete error:', err);
    }
  };

  // --- Domain Handlers ---
  const updateDomain = (id: string, updates: Partial<AdminDomain>) => {
    setDomains(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    addLog('update', 'Domain', `Updated content for domain: ${updates.name || id}`);
    triggerToast('Domain content updated');
  };

  // --- Inquiry Handlers ---
  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
    const target = inquiries.find(inq => inq.id === id);
    addLog('update', 'Inquiry', `Marked ${target?.companyName} as ${status}`);
    triggerToast(`Inquiry status updated to ${status}`);
  };

  const updateInquiryNote = (id: string, internalNote: string) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, internalNote } : inq));
    triggerToast('Internal note saved');
  };

  const deleteInquiry = (id: string) => {
    const target = inquiries.find(inq => inq.id === id);
    setInquiries(prev => prev.filter(inq => inq.id !== id));
    addLog('delete', 'Inquiry', `Archived inquiry from: ${target?.companyName || id}`);
    triggerToast('Inquiry removed');
  };

  // --- Stats Handlers ---
  const updateStat = (id: string, updates: Partial<AdminStat>) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    addLog('update', 'Metric', `Updated verified counter: ${updates.label || id}`);
    triggerToast('Verified metric updated');
  };

  // --- Announcement Handlers ---
  const updateAnnouncement = (updates: Partial<AdminAnnouncement>) => {
    setAnnouncement(prev => ({ ...prev, ...updates, updatedAt: 'Just now' }));
    addLog('publish', 'Announcement', `Updated banner alert (${updates.isActive ? 'Active' : 'Hidden'})`);
    triggerToast('Announcement banner settings saved');
  };

  const resetToDefaults = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setEvents(INITIAL_EVENTS);
    setPhotos(GALLERY_ITEMS);
    setTeamMembers([...teacherMentor, ...organizers, ...coreTeam]);
    setDomains(INITIAL_DOMAINS);
    setInquiries(INITIAL_INQUIRIES);
    setStats(INITIAL_STATS);
    setAnnouncement(INITIAL_ANNOUNCEMENT);
    setActivityLogs(INITIAL_ACTIVITY);
    triggerToast('State reset to verified defaults');
  };

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        toastMessage,
        triggerToast,

        events,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventStatus,
        toggleEventFeatured,

        photos,
        addPhoto,
        updatePhoto,
        deletePhoto,
        togglePhotoShowcase,

        teamMembers,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,

        domains,
        updateDomain,

        inquiries,
        updateInquiryStatus,
        updateInquiryNote,
        deleteInquiry,

        stats,
        updateStat,

        announcement,
        updateAnnouncement,

        activityLogs,
        resetToDefaults
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
