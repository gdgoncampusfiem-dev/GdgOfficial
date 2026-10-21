import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AdminEvent, EventStatus } from '../types';
import { GoogleColor } from '@/data/team';

interface EventModalProps {
  isOpen: boolean;
  eventToEdit?: AdminEvent | null;
  onSave: (event: Omit<AdminEvent, 'id'>) => void;
  onClose: () => void;
}

export function EventModal({
  isOpen,
  eventToEdit,
  onSave,
  onClose
}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<'devfest' | 'workshops' | 'hackathons' | 'community'>('devfest');
  const [status, setStatus] = useState<EventStatus>('Scheduled');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationType, setLocationType] = useState<'In-Person' | 'Virtual' | 'Hybrid'>('In-Person');
  const [location, setLocation] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [capacity, setCapacity] = useState<number>(500);
  const [accentColor, setAccentColor] = useState<GoogleColor>('blue');
  const [isFeatured, setIsFeatured] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setTagline(eventToEdit.tagline);
      setCategory(eventToEdit.category);
      setStatus(eventToEdit.status);
      setDate(eventToEdit.date);
      setTime(eventToEdit.time);
      setLocationType(eventToEdit.locationType);
      setLocation(eventToEdit.location);
      setRegistrationUrl(eventToEdit.registrationUrl);
      setCapacity(eventToEdit.capacity || 500);
      setAccentColor(eventToEdit.accentColor);
      setIsFeatured(eventToEdit.isFeatured);
      setCoverImageUrl(eventToEdit.coverImageUrl || '');
      setDescription(eventToEdit.description);
    } else {
      setTitle('');
      setTagline('');
      setCategory('devfest');
      setStatus('Scheduled');
      setDate(new Date().toISOString().split('T')[0]);
      setTime('10:00 AM - 05:00 PM');
      setLocationType('In-Person');
      setLocation('FIEM Auditorium, Kolkata');
      setRegistrationUrl('https://gdg.community.dev/events/');
      setCapacity(400);
      setAccentColor('blue');
      setIsFeatured(false);
      setCoverImageUrl('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=90&w=2400&auto=format&fit=crop');
      setDescription('');
    }
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    onSave({
      slug: eventToEdit?.slug || slug,
      title,
      tagline,
      category,
      status,
      date,
      time,
      locationType,
      location,
      registrationUrl,
      capacity,
      accentColor,
      isFeatured,
      coverImageUrl,
      description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border border-gray-200 rounded-xl p-6 text-gray-900 shadow-xl my-6 max-h-[90vh] overflow-y-auto space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-400 block">
              {eventToEdit ? 'Edit Event' : 'Create Event'}
            </span>
            <h2 className="text-base font-bold text-gray-900 font-sans">
              {eventToEdit ? 'Modify Event Details' : 'New Chapter Event'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-600 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. DevFest Kolkata 2025"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-600 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Short summary"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-900 focus:outline-none"
              >
                <option value="devfest">DevFest</option>
                <option value="workshops">Workshops</option>
                <option value="hackathons">Hackathons</option>
                <option value="community">Community</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EventStatus)}
                className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-900 focus:outline-none"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Live">Live</option>
                <option value="Completed">Completed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Format</label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-900 focus:outline-none"
              >
                <option value="In-Person">In-Person</option>
                <option value="Virtual">Virtual</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-900 font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM - 05:00 PM"
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-900 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Venue / Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Address / Hall"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Registration Link</label>
              <input
                type="url"
                value={registrationUrl}
                onChange={(e) => setRegistrationUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-900 font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Cover Image URL</label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-900 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-0"
            />
            <label htmlFor="isFeatured" className="text-xs text-gray-700 cursor-pointer">
              Pin as Featured on Homepage
            </label>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-gray-600 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Agenda overview..."
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none font-sans"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-150">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-gray-600 hover:text-black rounded-lg border border-gray-200 hover:bg-gray-50 font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs text-white bg-black hover:bg-gray-800 rounded-lg font-mono font-medium shadow-sm"
            >
              {eventToEdit ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
