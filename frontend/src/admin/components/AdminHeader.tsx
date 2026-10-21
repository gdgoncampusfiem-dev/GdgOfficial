import React from 'react';
import { Search, Plus, X, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../AdminContext';

interface AdminHeaderProps {
  onOpenCreateModal?: () => void;
}

export function AdminHeader({ onOpenCreateModal }: AdminHeaderProps) {
  const { activeTab, searchQuery, setSearchQuery } = useAdmin();

  const getTabMeta = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', breadcrumb: 'Overview', buttonLabel: null };
      case 'events':
        return { title: 'Events', breadcrumb: 'Management', buttonLabel: 'New Event' };
      case 'gallery':
        return { title: 'Gallery', breadcrumb: 'Media', buttonLabel: 'Upload Photo' };
      case 'team':
        return { title: 'Team Roster', breadcrumb: 'People', buttonLabel: 'Add Member' };
      case 'domains':
        return { title: 'Domains & Tracks', breadcrumb: 'Curriculum', buttonLabel: null };
      case 'inquiries':
        return { title: 'Sponsor Inquiries', breadcrumb: 'Partnerships', buttonLabel: null };
      case 'stats':
        return { title: 'Verified Metrics', breadcrumb: 'Audits', buttonLabel: null };
      case 'announcements':
        return { title: 'Announcements', breadcrumb: 'Alerts', buttonLabel: null };
    }
  };

  const meta = getTabMeta();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between">
      {/* Breadcrumb & Title */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="font-medium text-gray-900">{meta.title}</span>
        <span>/</span>
        <span>{meta.breadcrumb}</span>
      </div>

      {/* Controls & Action Button */}
      <div className="flex items-center gap-3">
        {/* Search */}
        {['events', 'gallery', 'team', 'inquiries'].includes(activeTab) && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-48 sm:w-60 bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-7 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Action Button */}
        {meta.buttonLabel && onOpenCreateModal && (
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{meta.buttonLabel}</span>
          </button>
        )}
      </div>
    </header>
  );
}
