import React, { useState } from 'react';
import { 
  Edit3, 
  Trash2,
  Plus
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { TeamMember, getTeamMemberSocials } from '@/data/team';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { renderPlatformIcon } from '@/components/ui/SocialIcons';
import { getSocialHref, getPlatformLabel } from '@/data/socialPlatforms';

interface TeamTabProps {
  onEditMember: (member: TeamMember) => void;
  onNewMember: () => void;
}

const ACCENT_BG = {
  blue: 'bg-[#4285F4]',
  red: 'bg-[#EA4335]',
  yellow: 'bg-[#FBBC04]',
  green: 'bg-[#34A853]',
};

export function TeamTab({ onEditMember, onNewMember }: TeamTabProps) {
  const { 
    teamMembers, 
    deleteTeamMember, 
    searchQuery 
  } = useAdmin();

  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const filteredMembers = teamMembers.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.domain && m.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.intro && m.intro.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = 
      roleFilter === 'all' || 
      (roleFilter === 'faculty' && m.role.toLowerCase().includes('faculty')) ||
      (roleFilter === 'organizer' && (m.role.toLowerCase().includes('organizer') || m.role.toLowerCase().includes('lead'))) ||
      (roleFilter === 'core' && (!m.role.toLowerCase().includes('faculty') && !m.role.toLowerCase().includes('organizer') && !m.role.toLowerCase().includes('lead')));

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4">
      {/* Tier Filters & Actions Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Roster' },
            { id: 'faculty', label: 'Faculty' },
            { id: 'organizer', label: 'Organizers & Leads' },
            { id: 'core', label: 'Core Team' }
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setRoleFilter(tier.id)}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase font-medium transition-colors ${
                roleFilter === tier.id
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-sans text-gray-500 font-medium">
            {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
          </span>
          <button
            onClick={onNewMember}
            className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-gray-800 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Team Roster Grid */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm font-sans">
          <p className="text-xs text-gray-500 mb-3">No members matching current filters.</p>
          <button
            onClick={onNewMember}
            className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
          >
            + Add First Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
          {filteredMembers.map((member) => {
            const socials = getTeamMemberSocials(member);
            const socialEntries = Object.entries(socials).filter(([, url]) => Boolean(url && url.trim()));
            const accentClass = ACCENT_BG[member.accentColor || 'blue'];

            return (
              <div
                key={member.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-3 hover:border-gray-300 transition-all hover:shadow-md relative overflow-hidden"
              >
                {/* Accent Top Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${accentClass}`} />

                <div className="flex items-start gap-3 pt-1">
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-300 flex-shrink-0 shadow-sm">
                    <img
                      src={member.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80'}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale contrast-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-gray-900 truncate font-sans uppercase">
                      {member.name}
                    </h4>
                    <p className="text-xs font-medium text-gray-500 truncate font-sans">
                      {member.role}
                    </p>
                    {member.domain && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-sans font-semibold bg-gray-100 border border-gray-200 text-gray-700">
                        {member.domain}
                      </span>
                    )}
                  </div>
                </div>

                {member.intro && (
                  <p className="text-[11px] text-gray-600 line-clamp-2 font-sans leading-relaxed italic border-t border-dashed border-gray-150 pt-2">
                    &ldquo;{member.intro}&rdquo;
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  {/* Dynamic Social Channel Icons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {socialEntries.slice(0, 5).map(([platform, url]) => {
                      const href = getSocialHref(platform, url);
                      const label = getPlatformLabel(platform, member.customSocialPlatforms);
                      return (
                        <a
                          key={platform}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-gray-600 hover:text-black rounded hover:bg-gray-100 transition-colors"
                          title={label}
                        >
                          {renderPlatformIcon(platform, "w-3.5 h-3.5")}
                        </a>
                      );
                    })}
                    {socialEntries.length > 5 && (
                      <span className="text-[10px] text-gray-400 font-mono">
                        +{socialEntries.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditMember(member)}
                      title="Edit Member Card"
                      className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setMemberToDelete(member)}
                      title="Remove Member"
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(memberToDelete)}
        title="Remove Member"
        itemName={memberToDelete?.name || ''}
        onCancel={() => setMemberToDelete(null)}
        onConfirm={() => {
          if (memberToDelete) {
            deleteTeamMember(memberToDelete.id);
            setMemberToDelete(null);
          }
        }}
      />
    </div>
  );
}
