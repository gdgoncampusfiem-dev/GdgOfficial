import React from 'react';
import { 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Mail, 
  Plus, 
  Megaphone, 
  ArrowUpRight,
  Filter,
  ChevronDown
} from 'lucide-react';
import { useAdmin } from '../AdminContext';

interface DashboardTabProps {
  onOpenEventModal: () => void;
  onOpenPhotoModal: () => void;
  onOpenTeamModal: () => void;
}

// Mini Sparkline area chart matching the user's reference image
function SparklineChart({ curveType = 1 }: { curveType?: number }) {
  const paths = [
    // Flat then sharp rise
    {
      line: "M 0 55 L 70 55 Q 90 53 105 45 T 140 10",
      area: "M 0 55 L 70 55 Q 90 53 105 45 T 140 10 L 140 60 L 0 60 Z"
    },
    // Gentle S-curve
    {
      line: "M 0 55 L 50 55 Q 80 50 100 30 T 140 12",
      area: "M 0 55 L 50 55 Q 80 50 100 30 T 140 12 L 140 60 L 0 60 Z"
    },
    // Middle peak then level
    {
      line: "M 0 55 L 40 55 Q 70 20 90 15 T 140 45",
      area: "M 0 55 L 40 55 Q 70 20 90 15 T 140 15 T 140 45 L 140 60 L 0 60 Z"
    },
    // Steady upward trend
    {
      line: "M 0 55 L 30 52 Q 60 48 90 35 T 140 8",
      area: "M 0 55 L 30 52 Q 60 48 90 35 T 140 8 L 140 60 L 0 60 Z"
    }
  ];

  const p = paths[(curveType - 1) % paths.length];

  return (
    <div className="w-full pt-3">
      <svg viewBox="0 0 140 60" className="w-full h-14 overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`spark-grad-${curveType}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Subtle grid lines matching reference */}
        <line x1="0" y1="20" x2="140" y2="20" stroke="#F3F4F6" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="0" y1="40" x2="140" y2="40" stroke="#F3F4F6" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="45" y1="0" x2="45" y2="60" stroke="#F3F4F6" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="95" y1="0" x2="95" y2="60" stroke="#F3F4F6" strokeDasharray="3 3" strokeWidth="1" />

        {/* Area fill */}
        <path d={p.area} fill={`url(#spark-grad-${curveType})`} />

        {/* Stroke line */}
        <path d={p.line} fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" />
      </svg>

      {/* Axis dates */}
      <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-1.5 border-t border-gray-100">
        <span>Oct 15</span>
        <span>Oct 18</span>
        <span>Oct 21</span>
      </div>
    </div>
  );
}

export function DashboardTab({
  onOpenEventModal,
  onOpenPhotoModal,
  onOpenTeamModal
}: DashboardTabProps) {
  const { 
    events, 
    photos, 
    teamMembers, 
    inquiries, 
    announcement, 
    updateAnnouncement,
    activityLogs, 
    setActiveTab 
  } = useAdmin();

  const upcomingEvents = events.filter(e => e.status === 'Scheduled' || e.status === 'Live');
  const pendingInquiries = inquiries.filter(i => i.status === 'NEW' || i.status === 'UNDER_REVIEW');
  const showcasePhotos = photos.filter(p => p.location === 'Homepage Showcase');

  return (
    <div className="space-y-6">
      {/* Top Header & Filters Bar (Matches Reference Image) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Analytics
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm font-medium">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>Filter</span>
          </button>

          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm font-medium">
            <span className="text-gray-400">Compare</span>
            <span>Previous period</span>
            <ChevronDown className="w-3 h-3 text-gray-400 ml-0.5" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm font-medium">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Oct 01, 2025 - Now</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 bg-black text-white hover:bg-gray-800 rounded-lg shadow-sm font-medium transition-colors"
          >
            <span>Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300" />
          </a>
        </div>
      </div>

      {/* Hero Feature Banner (Advanced Analytics style card from screenshot) */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Chapter Operations & Insights
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            Track community growth, manage upcoming developer conferences, curate verified event photography, and manage incoming sponsor partnership leads across Eastern India.
          </p>
          <div className="flex items-center gap-2.5 pt-1">
            <button
              onClick={onOpenEventModal}
              className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              + Create Event
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className="px-3.5 py-1.5 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors"
            >
              Review Inquiries →
            </button>
          </div>
        </div>

        {/* Mini Preview Table (mimics the screenshot's right-side company table) */}
        <div className="w-full lg:w-96 bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-gray-400 pb-1 border-b border-gray-200">
            <span>Recent Partner Lead</span>
            <span>Status</span>
          </div>
          {inquiries.slice(0, 3).map((inq) => (
            <div key={inq.id} className="flex items-center justify-between py-1 text-gray-700">
              <span className="font-semibold text-gray-900 truncate max-w-[160px]">{inq.companyName}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                inq.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                inq.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {inq.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Stats Grid with Sparkline Curves (Exactly matches screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Unique Visitors */}
        <div 
          onClick={() => setActiveTab('stats')}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">Unique visitors</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">0%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black font-sans">6</span>
              <span className="text-xs text-gray-400 font-sans">0 last period</span>
            </div>
          </div>
          <SparklineChart curveType={1} />
        </div>

        {/* Card 2: Engaged Visitors / Members */}
        <div 
          onClick={() => setActiveTab('stats')}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">Engaged visitors</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">0%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black font-sans">6</span>
              <span className="text-xs text-gray-400 font-sans">0 last period</span>
            </div>
          </div>
          <SparklineChart curveType={2} />
        </div>

        {/* Card 3: CTA clicks */}
        <div 
          onClick={() => setActiveTab('events')}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">CTA clicks</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">0%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black font-sans">5</span>
              <span className="text-xs text-gray-400 font-sans">0 last period</span>
            </div>
          </div>
          <SparklineChart curveType={3} />
        </div>

        {/* Card 4: Community Members */}
        <div 
          onClick={() => setActiveTab('stats')}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">Community members</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 font-semibold">+14%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black font-sans">2,500+</span>
              <span className="text-xs text-gray-400 font-sans">Verified on Bevy</span>
            </div>
          </div>
          <SparklineChart curveType={4} />
        </div>

        {/* Card 5: Events Hosted */}
        <div 
          onClick={() => setActiveTab('events')}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">Events hosted</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 font-semibold">Active</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black font-sans">{events.length}</span>
              <span className="text-xs text-gray-400 font-sans">{upcomingEvents.length} upcoming</span>
            </div>
          </div>
          <SparklineChart curveType={1} />
        </div>

        {/* Card 6: Gallery Photos */}
        <div 
          onClick={() => setActiveTab('gallery')}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">Curated photos</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">
                {showcasePhotos.length} hero
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black font-sans">{photos.length}</span>
              <span className="text-xs text-gray-400 font-sans">High-res captures</span>
            </div>
          </div>
          <SparklineChart curveType={2} />
        </div>
      </div>

      {/* Alert Banner Setting & Quick Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Banner Alert Controller */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Megaphone className="w-3.5 h-3.5 text-gray-500" />
                <h3 className="text-xs font-bold text-gray-900 uppercase font-mono">
                  Site Alert Banner
                </h3>
              </div>
              <button
                onClick={() => updateAnnouncement({ isActive: !announcement.isActive })}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  announcement.isActive
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {announcement.isActive ? 'Active on Public Site' : 'Disabled'}
              </button>
            </div>

            <p className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3 font-sans mt-3">
              "{announcement.message}"
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
            <span>Target: {announcement.ctaUrl || 'None'}</span>
            <button
              onClick={() => setActiveTab('announcements')}
              className="text-gray-900 hover:underline text-xs font-semibold"
            >
              Edit Banner Settings →
            </button>
          </div>
        </div>

        {/* Activity Log in Clean White Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase font-mono">
              Recent Admin Activity
            </h3>
            <span className="text-[11px] text-gray-400 font-mono">Latest actions</span>
          </div>

          <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
            {activityLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between px-3 py-2 text-xs hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-gray-100 text-gray-700 border border-gray-200">
                    {log.action}
                  </span>
                  <span className="text-gray-800 font-medium font-sans truncate max-w-xs">{log.title}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap ml-3">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
