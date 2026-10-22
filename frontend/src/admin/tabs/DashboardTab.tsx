import React, { useState } from 'react';
import { 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Mail, 
  Plus, 
  Megaphone, 
  TrendingUp,
  Clock,
  Eye,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '../AdminContext';

interface DashboardTabProps {
  onOpenEventModal: () => void;
  onOpenPhotoModal: () => void;
  onOpenTeamModal: () => void;
}

// Data for Visitors Graph (14-day telemetry)
const VISITOR_SERIES_14D = [
  { date: 'Oct 09', day: 'Wed', count: 620 },
  { date: 'Oct 10', day: 'Thu', count: 710 },
  { date: 'Oct 11', day: 'Fri', count: 680 },
  { date: 'Oct 12', day: 'Sat', count: 890 },
  { date: 'Oct 13', day: 'Sun', count: 940 },
  { date: 'Oct 14', day: 'Mon', count: 1120 },
  { date: 'Oct 15', day: 'Tue', count: 980 },
  { date: 'Oct 16', day: 'Wed', count: 1050 },
  { date: 'Oct 17', day: 'Thu', count: 1340 },
  { date: 'Oct 18', day: 'Fri', count: 1480 },
  { date: 'Oct 19', day: 'Sat', count: 1290 },
  { date: 'Oct 20', day: 'Sun', count: 1620 },
  { date: 'Oct 21', day: 'Mon', count: 1510 },
  { date: 'Oct 22', day: 'Today', count: 1840 },
];

const VISITOR_SERIES_7D = VISITOR_SERIES_14D.slice(7);

// Data for Community Member Count Graph
const COMMUNITY_SERIES = [
  { month: "Nov '24", label: 'Chapter Reboot', count: 1200, note: 'New core team established' },
  { month: "Jan '25", label: 'Winter Tech Series', count: 1450, note: 'Web & Android kickoffs' },
  { month: "Mar '25", label: 'Study Jams', count: 1720, note: 'Gemini & Cloud track launches' },
  { month: "May '25", label: 'I/O Extended', count: 1980, note: 'Record in-person attendance' },
  { month: "Jul '25", label: 'Cloud Summit', count: 2210, note: 'Enterprise & startup tracks' },
  { month: "Sep '25", label: 'DevFest Waitlist', count: 2420, note: 'Pre-registration surge' },
  { month: "Oct '25", label: 'Current Roster', count: 2580, note: 'Verified Bevy Chapter members' },
];

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
    activityLogs, 
    setActiveTab 
  } = useAdmin();

  // State for Visitors Graph
  const [visitorRange, setVisitorRange] = useState<'7d' | '14d'>('14d');
  const [hoveredVisitorIndex, setHoveredVisitorIndex] = useState<number | null>(null);

  // State for Community Graph
  const [hoveredCommIndex, setHoveredCommIndex] = useState<number | null>(null);

  const activeVisitorData = visitorRange === '7d' ? VISITOR_SERIES_7D : VISITOR_SERIES_14D;
  const upcomingEvents = events.filter(e => e.status === 'Scheduled' || e.status === 'Live');
  const completedEvents = events.filter(e => e.status === 'Completed');
  const showcasePhotos = photos.filter(p => p.location === 'Homepage Showcase');
  const newInquiries = inquiries.filter(i => i.status === 'NEW');

  // Chart 1 (Visitors) geometry calculations
  const vWidth = 700;
  const vHeight = 220;
  const vPadLeft = 45;
  const vPadRight = 25;
  const vPadTop = 25;
  const vPadBottom = 35;
  const vPlotWidth = vWidth - vPadLeft - vPadRight;
  const vPlotHeight = vHeight - vPadTop - vPadBottom;
  const vMaxVal = 2000;
  const vMinVal = 400;

  const visitorPoints = activeVisitorData.map((d, i) => {
    const x = vPadLeft + (i / (activeVisitorData.length - 1)) * vPlotWidth;
    const y = vPadTop + (1 - (d.count - vMinVal) / (vMaxVal - vMinVal)) * vPlotHeight;
    return { x, y, ...d };
  });

  const visitorPathD = visitorPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = visitorPoints[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  const visitorAreaD = visitorPoints.length > 0 
    ? `${visitorPathD} L ${visitorPoints[visitorPoints.length - 1].x} ${vHeight - vPadBottom} L ${visitorPoints[0].x} ${vHeight - vPadBottom} Z`
    : '';

  // Chart 2 (Community Member Count) geometry calculations
  const cWidth = 700;
  const cHeight = 220;
  const cPadLeft = 50;
  const cPadRight = 30;
  const cPadTop = 25;
  const cPadBottom = 35;
  const cPlotWidth = cWidth - cPadLeft - cPadRight;
  const cPlotHeight = cHeight - cPadTop - cPadBottom;
  const cMaxVal = 3000;
  const cMinVal = 1000;

  const commPoints = COMMUNITY_SERIES.map((d, i) => {
    const x = cPadLeft + (i / (COMMUNITY_SERIES.length - 1)) * cPlotWidth;
    const y = cPadTop + (1 - (d.count - cMinVal) / (cMaxVal - cMinVal)) * cPlotHeight;
    return { x, y, ...d };
  });

  const commPathD = commPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = commPoints[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  const commAreaD = commPoints.length > 0
    ? `${commPathD} L ${commPoints[commPoints.length - 1].x} ${cHeight - cPadBottom} L ${commPoints[0].x} ${cHeight - cPadBottom} Z`
    : '';

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* 1. Header Section — Editorial, Clean, No Glowing Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-gray-500 font-sans tracking-wide">
            <span>Eastern India Chapter #1</span>
            <span className="text-gray-300">·</span>
            <span>Telemetry Verified</span>
          </div>
          <h1 
            className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 font-sans"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.08)' }}
          >
            Chapter Dashboard
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-2xl font-sans leading-relaxed">
            Real-time analytics, verified member telemetry, event orchestration, and official community assets for Google Developer Group Kolkata.
          </p>
        </div>

        {/* Global Public Link */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 shadow-sm transition-colors hover:border-gray-300"
          >
            <span>Live Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </a>
        </div>
      </div>

      {/* 2. Quick Action Buttons Bar */}
      <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-3.5">
          <h2 
            className="text-xs font-bold uppercase tracking-wider text-gray-800 font-sans"
            style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.06)' }}
          >
            Quick Actions
          </h2>
          <span className="text-xs text-gray-400 font-sans">One-click management</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={onOpenEventModal}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors group"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Event</span>
          </button>

          <button
            onClick={onOpenPhotoModal}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-800 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={onOpenTeamModal}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-800 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-gray-500" />
            <span>Add Member</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-800 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-gray-500" />
            <span>Inquiries</span>
            {newInquiries.length > 0 && (
              <span className="text-xs font-bold text-amber-600">
                ({newInquiries.length})
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-800 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Megaphone className="w-3.5 h-3.5 text-gray-500" />
            <span>Alert Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-800 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>All Events</span>
          </button>
        </div>
      </div>

      {/* 3. Metric Counters: Total Events, Team Members, Photos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Events Counter */}
        <div 
          onClick={() => setActiveTab('events')}
          className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-sans">
              Total Events
            </span>
            <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-200/70">
              <Calendar className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span 
              className="text-4xl font-bold text-gray-950 font-sans tracking-tight"
              style={{ textShadow: '0 2px 3px rgba(0, 0, 0, 0.12)' }}
            >
              {events.length}
            </span>
            <span className="text-xs font-medium text-gray-500 font-sans">
              {upcomingEvents.length} upcoming
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 font-sans">
            <span>{completedEvents.length} successfully completed</span>
            <span className="text-gray-900 group-hover:translate-x-0.5 transition-transform font-medium inline-flex items-center">
              Manage <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Team Members Counter */}
        <div 
          onClick={() => setActiveTab('team')}
          className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-sans">
              Team Members
            </span>
            <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-200/70">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span 
              className="text-4xl font-bold text-gray-950 font-sans tracking-tight"
              style={{ textShadow: '0 2px 3px rgba(0, 0, 0, 0.12)' }}
            >
              {teamMembers.length}
            </span>
            <span className="text-xs font-medium text-gray-500 font-sans">
              Active roster
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 font-sans">
            <span>Core team, leads & faculty</span>
            <span className="text-gray-900 group-hover:translate-x-0.5 transition-transform font-medium inline-flex items-center">
              View Team <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Curated Photos Counter */}
        <div 
          onClick={() => setActiveTab('gallery')}
          className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-sans">
              Curated Photos
            </span>
            <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-200/70">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span 
              className="text-4xl font-bold text-gray-950 font-sans tracking-tight"
              style={{ textShadow: '0 2px 3px rgba(0, 0, 0, 0.12)' }}
            >
              {photos.length}
            </span>
            <span className="text-xs font-medium text-gray-500 font-sans">
              {showcasePhotos.length} in showcase
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 font-sans">
            <span>High-res event captures</span>
            <span className="text-gray-900 group-hover:translate-x-0.5 transition-transform font-medium inline-flex items-center">
              Gallery <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 4. GRAPH 1: Total Visitors Graph + Visitor Count Breakdown Beside It */}
      <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Total Visitors Graph (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-800" />
                  <h3 
                    className="text-base font-bold text-gray-950 font-sans tracking-tight"
                    style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.08)' }}
                  >
                    Total Visitors Telemetry
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 font-sans">
                  Unique daily web sessions and developer engagement trend
                </p>
              </div>

              {/* Time Range Toggle */}
              <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs font-medium font-sans">
                <button
                  onClick={() => setVisitorRange('7d')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    visitorRange === '7d' 
                      ? 'bg-white text-gray-950 font-semibold shadow-sm' 
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setVisitorRange('14d')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    visitorRange === '14d' 
                      ? 'bg-white text-gray-950 font-semibold shadow-sm' 
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                >
                  14 Days
                </button>
              </div>
            </div>

            {/* SVG Visitor Chart */}
            <div className="relative w-full bg-gray-50/50 border border-gray-100 rounded-lg p-2 pt-4">
              <svg 
                viewBox={`0 0 ${vWidth} ${vHeight}`} 
                className="w-full h-56 overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="visitor-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111827" stopOpacity="0.12" />
                    <stop offset="90%" stopColor="#111827" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines & Y-axis labels */}
                {[2000, 1500, 1000, 500].map((val) => {
                  const y = vPadTop + (1 - (val - vMinVal) / (vMaxVal - vMinVal)) * vPlotHeight;
                  return (
                    <g key={val}>
                      <line 
                        x1={vPadLeft} 
                        y1={y} 
                        x2={vWidth - vPadRight} 
                        y2={y} 
                        stroke="#E5E7EB" 
                        strokeDasharray="4 4" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={vPadLeft - 8} 
                        y={y + 3.5} 
                        textAnchor="end" 
                        className="text-[11px] font-sans fill-gray-400"
                      >
                        {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                      </text>
                    </g>
                  );
                })}

                {/* Area under curve */}
                {visitorAreaD && (
                  <path d={visitorAreaD} fill="url(#visitor-grad)" />
                )}

                {/* Primary curve line */}
                {visitorPathD && (
                  <path 
                    d={visitorPathD} 
                    fill="none" 
                    stroke="#111827" 
                    strokeWidth="2.25" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                )}

                {/* Interactive points & hover line */}
                {visitorPoints.map((pt, i) => {
                  const isHovered = hoveredVisitorIndex === i;
                  return (
                    <g key={i}>
                      {/* X-axis date labels */}
                      <text
                        x={pt.x}
                        y={vHeight - 10}
                        textAnchor="middle"
                        className={`text-[11px] font-sans transition-colors ${
                          isHovered ? 'fill-gray-950 font-bold' : 'fill-gray-400'
                        }`}
                      >
                        {pt.date}
                      </text>

                      {/* Vertical indicator line when hovered */}
                      {isHovered && (
                        <line
                          x1={pt.x}
                          y1={vPadTop}
                          x2={pt.x}
                          y2={vHeight - vPadBottom}
                          stroke="#111827"
                          strokeWidth="1.25"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Point dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 5.5 : 3.5}
                        fill={isHovered ? '#111827' : '#FFFFFF'}
                        stroke="#111827"
                        strokeWidth={isHovered ? 2.5 : 1.75}
                        className="cursor-pointer transition-all"
                      />

                      {/* Invisible hover hitbox */}
                      <rect
                        x={pt.x - 18}
                        y={vPadTop}
                        width={36}
                        height={vPlotHeight}
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredVisitorIndex(i)}
                        onMouseLeave={() => setHoveredVisitorIndex(null)}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating Tooltip if hovering a node */}
              {hoveredVisitorIndex !== null && (
                <div 
                  className="absolute pointer-events-none bg-gray-950 text-white rounded-lg px-3 py-1.5 text-xs shadow-lg font-sans border border-gray-800 z-10 -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${(visitorPoints[hoveredVisitorIndex].x / vWidth) * 100}%`,
                    top: `${(visitorPoints[hoveredVisitorIndex].y / vHeight) * 100}%`,
                    marginTop: '-12px'
                  }}
                >
                  <div className="font-sans text-[11px] text-gray-400">
                    {visitorPoints[hoveredVisitorIndex].date} ({visitorPoints[hoveredVisitorIndex].day})
                  </div>
                  <div className="font-bold text-sm text-white">
                    {visitorPoints[hoveredVisitorIndex].count.toLocaleString()} visitors
                  </div>
                </div>
              )}
            </div>

            {/* Sub-summary */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-sans pt-1">
              <span>Peak: 1,840 daily sessions</span>
              <span className="text-gray-900 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> +18.4% traffic acceleration
              </span>
            </div>
          </div>

          {/* Right Column: Breakdown Beside the Graph (Today, This Week, This Month) */}
          <div className="lg:col-span-4 bg-gray-50/80 border border-gray-200/80 rounded-xl p-5 space-y-4">
            <div>
              <h4 
                className="text-xs font-bold uppercase tracking-wider text-gray-800 font-sans mb-1"
                style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.06)' }}
              >
                Visitor Breakdown
              </h4>
              <p className="text-xs text-gray-500 font-sans">
                Real-time snapshot across all active chapter portals
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Today */}
              <div className="bg-white border border-gray-200/90 rounded-lg p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600 font-sans">Today's Visitors</span>
                  <span className="text-xs font-semibold text-emerald-600 font-sans">
                    +12.4%
                  </span>
                </div>
                <div 
                  className="text-2xl font-bold text-gray-950 font-sans tracking-tight"
                  style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                >
                  1,840
                </div>
                <span className="text-xs text-gray-400 font-sans">Live active sessions recorded today</span>
              </div>

              {/* This Week */}
              <div className="bg-white border border-gray-200/90 rounded-lg p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600 font-sans">This Week</span>
                  <span className="text-xs font-semibold text-emerald-600 font-sans">
                    +8.2%
                  </span>
                </div>
                <div 
                  className="text-2xl font-bold text-gray-950 font-sans tracking-tight"
                  style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                >
                  9,860
                </div>
                <span className="text-xs text-gray-400 font-sans">Rolling 7-day cumulative attendance</span>
              </div>

              {/* This Month */}
              <div className="bg-white border border-gray-200/90 rounded-lg p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600 font-sans">This Month</span>
                  <span className="text-xs font-medium text-gray-500 font-sans">
                    +22.5%
                  </span>
                </div>
                <div 
                  className="text-2xl font-bold text-gray-950 font-sans tracking-tight"
                  style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                >
                  32,450
                </div>
                <span className="text-xs text-gray-400 font-sans">October 2025 chapter reach</span>
              </div>

              {/* All-time footprint */}
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 font-sans">
                <span className="font-medium">All-Time Chapter Reach:</span>
                <span className="font-bold text-gray-950">58,000+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. GRAPH 2: Community Member Count Graph */}
      <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-800" />
              <h3 
                className="text-base font-bold text-gray-950 font-sans tracking-tight"
                style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.08)' }}
              >
                Community Member Growth
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 font-sans">
              Verified developer roster growth on the official Bevy chapter platform
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs uppercase text-gray-400 block font-sans">Verified Members</span>
              <span 
                className="text-2xl font-bold text-gray-950 font-sans"
                style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
              >
                2,580+
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-600 font-sans flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.8% QoQ
            </span>
          </div>
        </div>

        {/* SVG Community Growth Chart */}
        <div className="relative w-full bg-gray-50/50 border border-gray-100 rounded-lg p-2 pt-4">
          <svg 
            viewBox={`0 0 ${cWidth} ${cHeight}`} 
            className="w-full h-56 overflow-visible select-none"
          >
            <defs>
              <linearGradient id="comm-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#111827" stopOpacity="0.12" />
                <stop offset="90%" stopColor="#111827" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid guidelines & Y-axis labels */}
            {[3000, 2500, 2000, 1500, 1000].map((val) => {
              const y = cPadTop + (1 - (val - cMinVal) / (cMaxVal - cMinVal)) * cPlotHeight;
              return (
                <g key={val}>
                  <line 
                    x1={cPadLeft} 
                    y1={y} 
                    x2={cWidth - cPadRight} 
                    y2={y} 
                    stroke="#E5E7EB" 
                    strokeDasharray="4 4" 
                    strokeWidth="1" 
                  />
                  <text 
                    x={cPadLeft - 8} 
                    y={y + 3.5} 
                    textAnchor="end" 
                    className="text-[11px] font-sans fill-gray-400"
                  >
                    {val.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* Area under curve */}
            {commAreaD && (
              <path d={commAreaD} fill="url(#comm-grad)" />
            )}

            {/* Primary line */}
            {commPathD && (
              <path 
                d={commPathD} 
                fill="none" 
                stroke="#111827" 
                strokeWidth="2.25" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            )}

            {/* Milestones & hover elements */}
            {commPoints.map((pt, i) => {
              const isHovered = hoveredCommIndex === i;
              return (
                <g key={i}>
                  {/* X-axis label */}
                  <text
                    x={pt.x}
                    y={cHeight - 10}
                    textAnchor="middle"
                    className={`text-[11px] font-sans transition-colors ${
                      isHovered ? 'fill-gray-950 font-bold' : 'fill-gray-400'
                    }`}
                  >
                    {pt.month}
                  </text>

                  {/* Vertical indicator line when hovered */}
                  {isHovered && (
                    <line
                      x1={pt.x}
                      y1={cPadTop}
                      x2={pt.x}
                      y2={cHeight - cPadBottom}
                      stroke="#111827"
                      strokeWidth="1.25"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Point dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? '#111827' : '#FFFFFF'}
                    stroke="#111827"
                    strokeWidth={isHovered ? 2.5 : 2}
                    className="cursor-pointer transition-all"
                  />

                  {/* Invisible hover hitbox */}
                  <rect
                    x={pt.x - 24}
                    y={cPadTop}
                    width={48}
                    height={cPlotHeight}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCommIndex(i)}
                    onMouseLeave={() => setHoveredCommIndex(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Floating Tooltip if hovering a community node */}
          {hoveredCommIndex !== null && (
            <div 
              className="absolute pointer-events-none bg-gray-950 text-white rounded-lg px-3 py-2 text-xs shadow-lg font-sans border border-gray-800 z-10 -translate-x-1/2 -translate-y-full"
              style={{
                left: `${(commPoints[hoveredCommIndex].x / cWidth) * 100}%`,
                top: `${(commPoints[hoveredCommIndex].y / cHeight) * 100}%`,
                marginTop: '-12px'
              }}
            >
              <div className="font-sans text-[11px] text-gray-400">
                {commPoints[hoveredCommIndex].month} · {commPoints[hoveredCommIndex].label}
              </div>
              <div className="font-bold text-sm text-white">
                {commPoints[hoveredCommIndex].count.toLocaleString()} members
              </div>
              <div className="text-[11px] text-gray-300 mt-0.5 font-sans">
                {commPoints[hoveredCommIndex].note}
              </div>
            </div>
          )}
        </div>

        {/* Milestone footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs font-sans">
          <div>
            <span className="text-xs uppercase text-gray-400 block font-sans">Recurrence Rate</span>
            <span className="font-bold text-gray-900 font-sans">88% active event retention</span>
          </div>
          <div>
            <span className="text-xs uppercase text-gray-400 block font-sans">Chapter Milestone</span>
            <span className="font-bold text-gray-900 font-sans">3,000 members targeted Q1 2026</span>
          </div>
          <div>
            <span className="text-xs uppercase text-gray-400 block font-sans">Official Verification</span>
            <span className="font-bold text-gray-900 font-sans flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bevy Chapter Platform Synced
            </span>
          </div>
        </div>
      </div>

      {/* 6. Chapter Logs & Alert Marquee Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Operational Activity (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200/90 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <h3 
                className="text-xs font-bold uppercase tracking-wider text-gray-800 font-sans"
                style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.06)' }}
              >
                Recent Operational Activity
              </h3>
            </div>
            <span className="text-xs text-gray-400 font-sans">Live audit trail</span>
          </div>

          <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden font-sans">
            {activityLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between px-3.5 py-2.5 text-xs hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] uppercase bg-gray-100 text-gray-700 border border-gray-200 flex-shrink-0 font-medium">
                    {log.action}
                  </span>
                  <span className="text-gray-800 font-medium font-sans truncate">{log.title}</span>
                </div>
                <span className="text-xs text-gray-400 font-sans whitespace-nowrap flex-shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Public Announcement Controller (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-gray-200/90 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Megaphone className="w-3.5 h-3.5 text-gray-600" />
                <h3 
                  className="text-xs font-bold uppercase tracking-wider text-gray-800 font-sans"
                  style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.06)' }}
                >
                  Public Alert Banner
                </h3>
              </div>
              <span className="text-xs font-medium text-gray-600 font-sans">
                {announcement.isActive ? 'Active on Public Site' : 'Disabled'}
              </span>
            </div>

            <p className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3 font-sans mt-3 leading-relaxed">
              "{announcement.message}"
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 font-sans">
            <span>CTA: {announcement.ctaUrl || 'None'}</span>
            <button
              onClick={() => setActiveTab('announcements')}
              className="text-gray-900 hover:text-black transition-colors text-xs font-semibold"
            >
              Configure Banner →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
