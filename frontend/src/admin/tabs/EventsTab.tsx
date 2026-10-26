import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Filter 
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { AdminEvent, EventStatus } from '../types';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface EventsTabProps {
  onEditEvent: (event: AdminEvent) => void;
  onNewEvent: () => void;
}

export function EventsTab({ onEditEvent, onNewEvent }: EventsTabProps) {
  const { 
    events, 
    deleteEvent, 
    toggleEventStatus, 
    toggleEventFeatured,
    searchQuery 
  } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [eventToDelete, setEventToDelete] = useState<AdminEvent | null>(null);

  const filteredEvents = events.filter((e) => {
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.tagline && e.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'devfest', 'workshops', 'hackathons', 'community'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs uppercase font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 text-gray-800 text-xs rounded-lg px-2.5 py-1 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Live">Live</option>
            <option value="Completed">Completed</option>
            <option value="Draft">Draft</option>
          </select>
          <span className="text-xs font-sans text-gray-400">{filteredEvents.length} events</span>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm font-sans">
          <p className="text-xs text-gray-500 mb-3">No matching events found.</p>
          <button
            onClick={onNewEvent}
            className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-medium uppercase tracking-wider"
          >
            + Create Event
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-150 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm font-sans">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/60 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans uppercase text-gray-500 font-semibold">
                    {event.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-sans bg-gray-100 text-gray-700 border border-gray-200">
                    {event.status}
                  </span>
                  {event.isFeatured && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-sans bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-gray-900 tracking-tight font-sans">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-sans">
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleEventFeatured(event.id)}
                  title={event.isFeatured ? 'Unpin from Homepage' : 'Pin to Homepage'}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    event.isFeatured
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => toggleEventStatus(event.id)}
                  title="Cycle status"
                  className="px-2 py-1 rounded-lg border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50 text-xs font-sans"
                >
                  Status
                </button>

                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="External Link"
                    className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg border border-gray-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => onEditEvent(event)}
                  title="Edit Event"
                  className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg border border-gray-200"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setEventToDelete(event)}
                  title="Delete Event"
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(eventToDelete)}
        title="Delete Event"
        itemName={eventToDelete?.title || ''}
        onCancel={() => setEventToDelete(null)}
        onConfirm={() => {
          if (eventToDelete) {
            deleteEvent(eventToDelete.id);
            setEventToDelete(null);
          }
        }}
      />
    </div>
  );
}
