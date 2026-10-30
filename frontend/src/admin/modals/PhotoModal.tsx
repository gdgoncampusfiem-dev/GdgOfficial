import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GalleryItem, GalleryCategory } from '@/data/gallery';

interface PhotoModalProps {
  isOpen: boolean;
  photoToEdit?: GalleryItem | null;
  onSave: (photo: Omit<GalleryItem, 'id'>) => void;
  onClose: () => void;
}

export function PhotoModal({
  isOpen,
  photoToEdit,
  onSave,
  onClose
}: PhotoModalProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('OCT 2025');
  const [category, setCategory] = useState<Exclude<GalleryCategory, 'all'>>('devfest');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('Main Auditorium');
  const [aspect, setAspect] = useState<'aspect-[3/4]' | 'aspect-[4/3]' | 'aspect-[16/9]' | 'aspect-square'>('aspect-[16/9]');
  const [accentColor, setAccentColor] = useState<'blue' | 'red' | 'yellow' | 'green'>('blue');
  const [eventName, setEventName] = useState('DevFest Kolkata 2025');
  const [isShowcase, setIsShowcase] = useState(false);

  useEffect(() => {
    if (photoToEdit) {
      setTitle(photoToEdit.title);
      setSubtitle(photoToEdit.subtitle || '');
      setDate(photoToEdit.date);
      setCategory(photoToEdit.category);
      setImageUrl(photoToEdit.imageUrl);
      setLocation(photoToEdit.location || '');
      setAspect(photoToEdit.aspect);
      setAccentColor(photoToEdit.accentColor);
      setEventName(photoToEdit.eventName || '');
      setIsShowcase(photoToEdit.location === 'Homepage Showcase');
    } else {
      setTitle('');
      setSubtitle('');
      setDate('OCT 2025');
      setCategory('devfest');
      setImageUrl('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=90&w=2400&auto=format&fit=crop');
      setLocation('Main Auditorium');
      setAspect('aspect-[16/9]');
      setAccentColor('blue');
      setEventName('DevFest Kolkata 2025');
      setIsShowcase(false);
    }
  }, [photoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    onSave({
      title,
      subtitle,
      date,
      category,
      imageUrl,
      location: isShowcase ? 'Homepage Showcase' : location,
      aspect,
      accentColor,
      eventName,
      eventId: eventName ? eventName.toLowerCase().replace(/\s+/g, '-') : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white border border-gray-200 rounded-xl p-6 text-gray-900 shadow-xl space-y-4 my-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 uppercase font-sans">
            {photoToEdit ? 'Edit Photo' : 'Upload Photo'}
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-sans">
          {imageUrl && (
            <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-100 h-28">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=90&w=2400&auto=format&fit=crop';
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Image URL *</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 font-sans focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Keynote Hall"
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black font-sans"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. DevFest 2025"
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-900 focus:outline-none font-sans"
              >
                <option value="devfest">DevFest</option>
                <option value="workshops">Workshops</option>
                <option value="hackathons">Hackathons</option>
                <option value="community">Community</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Aspect Ratio</label>
              <select
                value={aspect}
                onChange={(e) => setAspect(e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-900 focus:outline-none font-sans"
              >
                <option value="aspect-[16/9]">16:9 Landscape</option>
                <option value="aspect-[4/3]">4:3 Classic</option>
                <option value="aspect-[3/4]">3:4 Portrait</option>
                <option value="aspect-square">1:1 Square</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 py-1 font-sans">
            <input
              type="checkbox"
              id="isShowcase"
              checked={isShowcase}
              onChange={(e) => setIsShowcase(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-0"
            />
            <label htmlFor="isShowcase" className="text-xs text-gray-700 cursor-pointer">
              Showcase on Homepage Gallery
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-150 font-sans">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-gray-600 hover:text-black rounded-lg border border-gray-200 hover:bg-gray-50 font-sans"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs text-white bg-black hover:bg-gray-800 rounded-lg font-sans font-medium shadow-sm"
            >
              {photoToEdit ? 'Save Changes' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
