import React, { useState, useRef } from 'react';
import { X, Plus, Trash2, ExternalLink, Upload } from 'lucide-react';
import { TeamMember, GoogleColor, getTeamMemberSocials } from '@/data/team';
import { renderPlatformIcon } from '@/components/ui/SocialIcons';
import { 
  PREDEFINED_PLATFORMS, 
  AVAILABLE_CUSTOM_ICONS, 
  getPlatformLabel, 
  getSocialHref, 
  isValidSocialEntry 
} from '@/data/socialPlatforms';

interface TeamModalProps {
  isOpen: boolean;
  memberToEdit?: TeamMember | null;
  onSave: (member: Omit<TeamMember, 'id'>) => void;
  onClose: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&h=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=600&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&h=600&q=80',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=500&h=600&q=80',
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=500&h=600&q=80',
];

const ROLE_PRESETS = [
  'Faculty Coordinator',
  'Lead Organizer',
  'Co-Organizer',
  'Core Team',
  'Technical Lead',
  'Design Lead',
  'Outreach Lead',
  'Event Lead',
];

const DOMAIN_PRESETS = [
  'Leadership',
  'Web Dev',
  'AI / ML',
  'Cloud & DevOps',
  'Creative & UI/UX',
  'PR & Outreach',
  'Event Management',
  'Photography & Media',
];

const ACCENT_COLORS: { id: GoogleColor; label: string; bg: string; border: string }[] = [
  { id: 'blue', label: 'Google Blue', bg: 'bg-[#4285F4]', border: 'border-[#4285F4]' },
  { id: 'red', label: 'Google Red', bg: 'bg-[#EA4335]', border: 'border-[#EA4335]' },
  { id: 'yellow', label: 'Google Yellow', bg: 'bg-[#FBBC04]', border: 'border-[#FBBC04]' },
  { id: 'green', label: 'Google Green', bg: 'bg-[#34A853]', border: 'border-[#34A853]' },
];

function TeamModalInner({
  memberToEdit,
  onSave,
  onClose
}: {
  memberToEdit?: TeamMember | null;
  onSave: (member: Omit<TeamMember, 'id'>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(memberToEdit?.name || '');
  const [role, setRole] = useState(memberToEdit?.role || 'Core Team');
  const [domain, setDomain] = useState(memberToEdit?.domain || 'Web Dev');
  const [imageUrl, setImageUrl] = useState(
    memberToEdit?.imageUrl || PRESET_AVATARS[0]
  );
  const [intro, setIntro] = useState(
    memberToEdit?.intro || 'Passionate about building cool things and learning with the community.'
  );
  const [accentColor, setAccentColor] = useState<GoogleColor>(memberToEdit?.accentColor || 'blue');
  const [socials, setSocials] = useState<Record<string, string>>(() => 
    memberToEdit ? getTeamMemberSocials(memberToEdit) : { github: '', linkedin: '' }
  );
  const [customSocialPlatforms, setCustomSocialPlatforms] = useState<Record<string, { name: string; icon?: string }>>(
    memberToEdit?.customSocialPlatforms || {}
  );

  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showAddSocial, setShowAddSocial] = useState(false);
  const [newPlatformKey, setNewPlatformKey] = useState('linkedin');
  const [newCustomName, setNewCustomName] = useState('');
  const [newCustomIcon, setNewCustomIcon] = useState('globe');
  const [newSocialValue, setNewSocialValue] = useState('');
  const [socialError, setSocialError] = useState<string | null>(null);

  const [modalTab, setModalTab] = useState<'profile' | 'socials' | 'preview'>('profile');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setUploadError('Only PNG, JPG/JPEG, and WebP images are accepted.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be under 5 MB in size.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) setImageUrl(dataUrl);
    };
    reader.onerror = () => setUploadError('Failed to read image file. Please try again.');
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSocialChange = (key: string, val: string) => {
    setSocials(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleRemoveSocial = (key: string) => {
    setSocials(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    if (customSocialPlatforms[key]) {
      setCustomSocialPlatforms(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    setSocialError(null);

    const isCustom = newPlatformKey === 'custom';
    let targetKey = newPlatformKey;
    let label = '';
    let icon = 'globe';

    if (isCustom) {
      const trimmed = newCustomName.trim();
      if (!trimmed) {
        setSocialError('Please enter a platform label.');
        return;
      }
      label = trimmed;
      icon = newCustomIcon || 'globe';
      targetKey = 'custom_' + trimmed.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now().toString(36);
    } else {
      const predefined = PREDEFINED_PLATFORMS.find(p => p.key === newPlatformKey);
      if (!predefined) {
        setSocialError('Please choose a valid platform.');
        return;
      }
      if (targetKey in socials) {
        setSocialError(`${predefined.name} is already added.`);
        return;
      }
      label = predefined.name;
      icon = predefined.iconName;
    }

    const trimmedVal = newSocialValue.trim();
    if (!trimmedVal) {
      setSocialError('Please enter a URL or handle.');
      return;
    }

    if (!isValidSocialEntry(targetKey, trimmedVal)) {
      setSocialError('Please enter a valid format (e.g. handle or full link).');
      return;
    }

    setSocials(prev => ({
      ...prev,
      [targetKey]: trimmedVal,
    }));

    if (isCustom) {
      setCustomSocialPlatforms(prev => ({
        ...prev,
        [targetKey]: { name: label, icon },
      }));
    }

    setNewSocialValue('');
    setNewCustomName('');
    setShowAddSocial(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const linkedinUrl = socials.linkedin ? getSocialHref('linkedin', socials.linkedin) : undefined;
    const githubUrl = socials.github ? getSocialHref('github', socials.github) : undefined;

    onSave({
      name: name.trim(),
      role: role.trim(),
      domain: domain.trim(),
      imageUrl: imageUrl.trim(),
      intro: intro.trim(),
      accentColor,
      linkedinUrl,
      githubUrl,
      socials,
      customSocialPlatforms,
    });
    onClose();
  };

  const activeSocialKeys = Object.keys(socials);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white border-2 border-[#050505] rounded-2xl shadow-[6px_6px_0px_#050505] my-6 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#050505] bg-[#FBFBFA]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Roster Operations
            </span>
            <h2 className="text-lg font-black text-[#050505] uppercase tracking-tight">
              {memberToEdit ? `Edit Member: ${memberToEdit.name}` : 'Add New Team Member'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-gray-200 px-6 bg-gray-50 text-xs font-semibold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setModalTab('profile')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              modalTab === 'profile'
                ? 'border-black text-black font-bold'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            1. Identity &amp; Picture
          </button>
          <button
            type="button"
            onClick={() => setModalTab('socials')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              modalTab === 'socials'
                ? 'border-black text-black font-bold'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <span>2. Social Links</span>
            <span className="px-1.5 py-0.2 bg-black text-white text-[10px] rounded-full">
              {activeSocialKeys.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setModalTab('preview')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              modalTab === 'preview'
                ? 'border-black text-black font-bold'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            3. Card Live Preview
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: PROFILE DETAILS */}
          {modalTab === 'profile' && (
            <div className="space-y-4">
              {/* Avatar Uploader & Presets */}
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 rounded-xl space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Profile Photo (File Upload / Presets / URL)
                </label>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-20 h-24 rounded-lg overflow-hidden border-2 border-black bg-gray-100 flex-shrink-0 shadow-[2px_2px_0px_#050505]">
                    <img
                      src={imageUrl}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRESET_AVATARS[0];
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-[200px] space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-800 transition-colors shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload From Device</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImageUrl(PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)])}
                        className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Random Avatar
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-500">
                      PNG, JPG, or WebP up to 5 MB. Converts directly to base64 data.
                    </p>
                  </div>
                </div>

                {uploadError && (
                  <p className="text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    {uploadError}
                  </p>
                )}

                {/* Preset Avatars Row */}
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-500 block mb-1.5">
                    Or choose quick preset:
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {PRESET_AVATARS.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImageUrl(url)}
                        className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                          imageUrl === url ? 'border-black ring-2 ring-black/20 scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt={`Preset ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste external image URL: https://..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Name & Accent Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarthak Sen"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-black font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                    GDG Accent Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setAccentColor(c.id)}
                        className={`py-1.5 rounded-lg border-2 text-[11px] font-bold capitalize transition-all flex items-center justify-center gap-1.5 ${
                          accentColor === c.id
                            ? `${c.border} bg-gray-50 text-black shadow-sm`
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${c.bg}`} />
                        <span>{c.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Role & Domain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                    Role in Chapter *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Organizer / Core Team"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {ROLE_PRESETS.slice(0, 4).map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setRole(preset)}
                        className="text-[10px] text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                    Domain Badge
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g. Web Dev / AI/ML"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {DOMAIN_PRESETS.slice(0, 4).map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setDomain(preset)}
                        className="text-[10px] text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio / Intro */}
              <div>
                <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                  Bio / Statement (revealed on card hover)
                </label>
                <textarea
                  rows={2}
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="e.g. Building open-source web experiments and organizing campus hackathons..."
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: SOCIAL LINKS MANAGER */}
          {modalTab === 'socials' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Connected Social Channels
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Supports GitHub, LinkedIn, Twitter/X, Instagram, Discord, Portfolio, YouTube &amp; Custom platforms.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddSocial(true)}
                  className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Platform</span>
                </button>
              </div>

              {/* Add Platform Drawer/Modal */}
              {showAddSocial && (
                <div className="p-4 bg-gray-50 border-2 border-black rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                      Connect New Social Channel
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddSocial(false)}
                      className="text-gray-400 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-gray-700 mb-1">
                        Select Platform
                      </label>
                      <select
                        value={newPlatformKey}
                        onChange={(e) => setNewPlatformKey(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                      >
                        {PREDEFINED_PLATFORMS.map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.name}
                          </option>
                        ))}
                        <option value="custom">+ Custom Platform...</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold text-gray-700 mb-1">
                        {newPlatformKey === 'email' ? 'Email Address' : 'URL or Username'}
                      </label>
                      <input
                        type="text"
                        value={newSocialValue}
                        onChange={(e) => setNewSocialValue(e.target.value)}
                        placeholder={PREDEFINED_PLATFORMS.find(p => p.key === newPlatformKey)?.placeholder || 'username or https://...'}
                        className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {newPlatformKey === 'custom' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-gray-700 mb-1">
                          Custom Platform Name
                        </label>
                        <input
                          type="text"
                          value={newCustomName}
                          onChange={(e) => setNewCustomName(e.target.value)}
                          placeholder="e.g. Behance, Dribbble, Peerlist"
                          className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-gray-700 mb-1">
                          Icon Motif
                        </label>
                        <select
                          value={newCustomIcon}
                          onChange={(e) => setNewCustomIcon(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                        >
                          {AVAILABLE_CUSTOM_ICONS.map((ic) => (
                            <option key={ic.id} value={ic.id}>
                              {ic.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {socialError && (
                    <p className="text-xs text-red-600 font-medium">{socialError}</p>
                  )}

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddSocial(false)}
                      className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddSocial}
                      className="px-3 py-1 bg-black text-white rounded-lg text-xs font-semibold"
                    >
                      Add Channel
                    </button>
                  </div>
                </div>
              )}

              {/* List of active socials */}
              {activeSocialKeys.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">No social channels connected yet.</p>
                  <button
                    type="button"
                    onClick={() => setShowAddSocial(true)}
                    className="text-xs font-bold text-black underline"
                  >
                    + Add first social profile
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {activeSocialKeys.map((key) => {
                    const label = getPlatformLabel(key, customSocialPlatforms);
                    const val = socials[key];
                    const fullHref = getSocialHref(key, val);

                    return (
                      <div
                        key={key}
                        className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 text-black">
                          {renderPlatformIcon(key, "w-4 h-4")}
                        </div>

                        <div className="w-28 flex-shrink-0">
                          <span className="text-xs font-bold text-gray-900 block truncate">
                            {label}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {key}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => handleSocialChange(key, e.target.value)}
                            placeholder="username or URL..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-black font-mono"
                          />
                        </div>

                        {val && (
                          <a
                            href={fullHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-black rounded hover:bg-gray-100"
                            title={`Test ${label} link`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveSocial(key)}
                          className="p-1.5 text-red-400 hover:text-red-700 rounded hover:bg-red-50"
                          title="Remove platform"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE CARD PREVIEW */}
          {modalTab === 'preview' && (
            <div className="flex flex-col items-center justify-center p-4 bg-[#F3F0E8] rounded-xl border border-gray-300">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">
                Live Public Card Preview
              </span>

              {/* Exact Mock of Public Team Card */}
              <div className="w-full max-w-[280px] bg-white border-[2px] border-[#050505] shadow-[5px_5px_0px_#050505] flex flex-col overflow-hidden">
                {/* Accent Line */}
                <div 
                  className={`h-2 w-full ${
                    accentColor === 'red' ? 'bg-[#EA4335]' :
                    accentColor === 'yellow' ? 'bg-[#FBBC04]' :
                    accentColor === 'green' ? 'bg-[#34A853]' : 'bg-[#4285F4]'
                  } border-b-[2px] border-[#050505]`} 
                />

                {/* Photo */}
                <div className="relative w-full aspect-[4/5] border-b-[2px] border-[#050505] overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={name || 'Preview'}
                    className="w-full h-full object-cover filter grayscale contrast-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_AVATARS[0];
                    }}
                  />
                  {domain && (
                    <div className="absolute top-2 right-2 bg-white border-[2px] border-[#050505] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#050505] shadow-[2px_2px_0px_#050505]">
                      {domain}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow bg-white">
                  <h3 className="text-base font-black text-[#050505] uppercase tracking-tight mb-0.5">
                    {name || 'Member Name'}
                  </h3>
                  <p className="text-[10px] font-bold text-[#575550] uppercase tracking-widest mb-2">
                    {role || 'Role'}
                  </p>

                  {intro && (
                    <p className="text-xs text-[#575550] leading-relaxed pt-2 border-t border-dashed border-gray-200 mb-3">
                      &ldquo;{intro}&rdquo;
                    </p>
                  )}

                  {/* Social Buttons */}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {activeSocialKeys.map((k) => (
                      <div
                        key={k}
                        className="p-1 border-[1.5px] border-[#050505] bg-white shadow-[1.5px_1.5px_0px_#050505] text-[#050505]"
                      >
                        {renderPlatformIcon(k, "w-3.5 h-3.5")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-xs text-gray-400">
              {activeSocialKeys.length} channels configured
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-black hover:bg-gray-800 rounded-lg shadow-sm transition-colors uppercase tracking-wider"
              >
                {memberToEdit ? 'Save Changes' : 'Add To Roster'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TeamModal({
  isOpen,
  memberToEdit,
  onSave,
  onClose
}: TeamModalProps) {
  if (!isOpen) return null;

  return (
    <TeamModalInner
      key={memberToEdit?.id || 'new'}
      memberToEdit={memberToEdit}
      onSave={onSave}
      onClose={onClose}
    />
  );
}
