import React, { useState } from 'react';
import { 
  Sparkles, 
  Edit3, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { GalleryItem } from '@/data/gallery';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface GalleryTabProps {
  onEditPhoto: (photo: GalleryItem) => void;
  onNewPhoto: () => void;
}

export function GalleryTab({ onEditPhoto, onNewPhoto }: GalleryTabProps) {
  const { 
    photos, 
    deletePhoto, 
    togglePhotoShowcase, 
    searchQuery 
  } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showcaseOnly, setShowcaseOnly] = useState<boolean>(false);
  const [photoToDelete, setPhotoToDelete] = useState<GalleryItem | null>(null);

  const filteredPhotos = photos.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.eventName && p.eventName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const isShowcase = p.location === 'Homepage Showcase';
    const matchesShowcase = !showcaseOnly || isShowcase;

    return matchesSearch && matchesCategory && matchesShowcase;
  });

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
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
          <button
            onClick={() => setShowcaseOnly(!showcaseOnly)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
              showcaseOnly
                ? 'bg-black text-white border-black font-semibold'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Showcase Only</span>
          </button>
          <span className="text-xs font-mono text-gray-400">{filteredPhotos.length} photos</span>
        </div>
      </div>

      {/* Photos Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-xs text-gray-500 mb-3">No photos found.</p>
          <button
            onClick={onNewPhoto}
            className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
          >
            + Upload Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => {
            const isShowcase = photo.location === 'Homepage Showcase';
            return (
              <div
                key={photo.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-gray-300 transition-colors"
              >
                <div className="relative aspect-[16/10] bg-gray-100">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=90&w=2400&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-black/70 text-white backdrop-blur-sm">
                      {photo.category}
                    </span>
                    {isShowcase && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-400 text-black font-bold">
                        Home
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 space-y-2">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 truncate">{photo.title}</h4>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">{photo.date} • {photo.location || photo.eventName}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      onClick={() => togglePhotoShowcase(photo.id)}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded border transition-colors ${
                        isShowcase
                          ? 'border-amber-300 bg-amber-50 text-amber-900 font-semibold'
                          : 'border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {isShowcase ? 'Showcased' : 'Set Home'}
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={photo.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-gray-900 rounded hover:bg-gray-100"
                        title="View Full Resolution"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => onEditPhoto(photo)}
                        className="p-1 text-gray-500 hover:text-gray-900 rounded hover:bg-gray-100"
                        title="Edit Photo"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPhotoToDelete(photo)}
                        className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(photoToDelete)}
        title="Delete Photo"
        itemName={photoToDelete?.title || ''}
        onCancel={() => setPhotoToDelete(null)}
        onConfirm={() => {
          if (photoToDelete) {
            deletePhoto(photoToDelete.id);
            setPhotoToDelete(null);
          }
        }}
      />
    </div>
  );
}
