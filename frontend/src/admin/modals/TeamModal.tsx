import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TeamMember, GoogleColor } from '@/data/team';

interface TeamModalProps {
  isOpen: boolean;
  memberToEdit?: TeamMember | null;
  onSave: (member: Omit<TeamMember, 'id'>) => void;
  onClose: () => void;
}

export function TeamModal({
  isOpen,
  memberToEdit,
  onSave,
  onClose
}: TeamModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Core Team');
  const [domain, setDomain] = useState('Web Dev');
  const [imageUrl, setImageUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [intro, setIntro] = useState('');
  const [accentColor, setAccentColor] = useState<GoogleColor>('blue');

  useEffect(() => {
    if (memberToEdit) {
      setName(memberToEdit.name);
      setRole(memberToEdit.role);
      setDomain(memberToEdit.domain || 'Leadership');
      setImageUrl(memberToEdit.imageUrl);
      setLinkedinUrl(memberToEdit.linkedinUrl || '');
      setGithubUrl(memberToEdit.githubUrl || '');
      setIntro(memberToEdit.intro || '');
      setAccentColor(memberToEdit.accentColor);
    } else {
      setName('');
      setRole('Core Team');
      setDomain('Web Dev');
      setImageUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80');
      setLinkedinUrl('');
      setGithubUrl('');
      setIntro('Passionate about building community tools and learning tech.');
      setAccentColor('blue');
    }
  }, [memberToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name,
      role,
      domain,
      imageUrl,
      linkedinUrl,
      githubUrl,
      intro,
      accentColor
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 text-gray-900 shadow-xl space-y-4 my-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 uppercase font-sans">
            {memberToEdit ? 'Edit Member' : 'Add Member'}
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-sans">
          <div>
            <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarthak Sen"
              className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Role *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Organizer / Core Team"
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black font-sans"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Web / AI / Design"
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Profile Photo URL</label>
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
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">LinkedIn URL</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/..."
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 font-sans focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">GitHub URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 font-sans focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-600 mb-1 font-sans">Bio / Statement</label>
            <textarea
              rows={2}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Member focus or interests..."
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none focus:border-black font-sans"
            />
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
              {memberToEdit ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
