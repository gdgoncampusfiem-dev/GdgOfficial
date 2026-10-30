import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';

export function AnnouncementsTab() {
  const { announcement, updateAnnouncement } = useAdmin();

  const [isActive, setIsActive] = useState(announcement.isActive);
  const [message, setMessage] = useState(announcement.message);
  const [ctaText, setCtaText] = useState(announcement.ctaText);
  const [ctaUrl, setCtaUrl] = useState(announcement.ctaUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      isActive,
      message,
      ctaText,
      ctaUrl
    });
  };

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Live Preview Box */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase text-gray-400">
          <span>Public Preview</span>
          <span className={isActive ? 'text-emerald-700 font-semibold' : 'text-gray-400'}>
            {isActive ? 'Active on Public Site' : 'Hidden'}
          </span>
        </div>

        {isActive ? (
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="text-gray-900 font-medium">{message || 'Your alert text...'}</span>
            {ctaText && (
              <span className="px-2.5 py-1 rounded bg-black text-white font-medium text-[11px] whitespace-nowrap">
                {ctaText}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-400 p-2">Alert banner is currently disabled.</p>
        )}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase font-mono">Banner Status</h3>
            <p className="text-[11px] text-gray-500">Toggle alert banner visibility on public homepage.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              isActive
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {isActive ? 'Active' : 'Disabled'}
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-gray-500 mb-1">
            Announcement Message
          </label>
          <input
            type="text"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. DevFest Kolkata 2025 tickets are now live!"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-500 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g. View Details ↗"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-500 mb-1">
              Destination URL
            </label>
            <input
              type="text"
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              placeholder="/events"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-gray-400 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-2 border-t border-gray-100">
          <button
            type="submit"
            className="px-4 py-1.5 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-mono font-medium uppercase tracking-wider transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
