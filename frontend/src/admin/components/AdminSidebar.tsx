import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Layers, 
  Mail, 
  BarChart3, 
  Megaphone,
  ArrowUpRight,
  RotateCcw
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { AdminTab } from '../types';
import { cn } from '@/utils/cn';

interface NavGroup {
  title: string;
  items: {
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
  }[];
}

export function AdminSidebar() {
  const { 
    activeTab, 
    setActiveTab, 
    events, 
    photos, 
    teamMembers, 
    inquiries, 
    resetToDefaults 
  } = useAdmin();

  const newInquiriesCount = inquiries.filter(i => i.status === 'NEW').length;

  const groups: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'events', label: 'Events', icon: Calendar, badge: events.length },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, badge: photos.length },
        { id: 'team', label: 'Team', icon: Users, badge: teamMembers.length },
      ]
    },
    {
      title: 'Content',
      items: [
        { id: 'domains', label: 'Domains', icon: Layers },
        { id: 'announcements', label: 'Announcements', icon: Megaphone },
        { id: 'stats', label: 'Metrics', icon: BarChart3 },
      ]
    },
    {
      title: 'Partnerships',
      items: [
        { 
          id: 'inquiries', 
          label: 'Inquiries', 
          icon: Mail, 
          badge: newInquiriesCount > 0 ? `${newInquiriesCount} new` : inquiries.length 
        },
      ]
    }
  ];

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Header / Brand */}
        <div className="px-5 py-4 border-b border-gray-150 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
              G
            </div>
            <div>
              <h2 className="font-bold text-xs tracking-tight text-gray-900 leading-none">
                GDG FIEM
              </h2>
              <span className="text-[10px] text-gray-400 font-medium">Chapter Admin</span>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-5">
          {groups.map((group) => (
            <div key={group.title} className="space-y-1">
              <span className="px-3 text-[11px] font-medium text-gray-400">
                {group.title}
              </span>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left",
                        isActive
                          ? "bg-gray-100 text-gray-900 font-semibold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn("w-4 h-4", isActive ? "text-gray-900" : "text-gray-400")} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-sans font-medium",
                            isActive ? "bg-white text-gray-900 border border-gray-200" : "bg-gray-100 text-gray-500"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile & Links */}
      <div className="p-3 border-t border-gray-200 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span>Public Website</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
        </Link>

        <button
          onClick={resetToDefaults}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>

        <div className="pt-2 flex items-center gap-2 px-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
            KL
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-xs font-semibold text-gray-900 truncate leading-none">Kolkata Lead</p>
            <p className="text-[10px] text-gray-400 truncate mt-0.5">super_admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
