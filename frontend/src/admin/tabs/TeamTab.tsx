import React, { useState } from 'react';
import { 
  Edit3, 
  Trash2 
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { TeamMember } from '@/data/team';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface TeamTabProps {
  onEditMember: (member: TeamMember) => void;
  onNewMember: () => void;
}

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
      (roleFilter === 'organizer' && m.role.toLowerCase().includes('organizer')) ||
      (roleFilter === 'core' && (m.role.toLowerCase().includes('core') || !m.role.toLowerCase().includes('faculty')));

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4">
      {/* Tier Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Roster' },
            { id: 'faculty', label: 'Faculty' },
            { id: 'organizer', label: 'Organizers' },
            { id: 'core', label: 'Core Team' }
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setRoleFilter(tier.id)}
              className={`px-3 py-1 rounded-lg text-xs uppercase font-medium transition-colors ${
                roleFilter === tier.id
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-sans text-gray-400">
          {filteredMembers.length} members
        </span>
      </div>

      {/* Team Roster Grid */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm font-sans">
          <p className="text-xs text-gray-500 mb-3">No members found.</p>
          <button
            onClick={onNewMember}
            className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
          >
            + Add Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-3 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-gray-900 truncate font-sans">{member.name}</h4>
                  <p className="text-xs text-gray-500 truncate font-sans">{member.role}</p>
                  {member.domain && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-sans bg-gray-100 border border-gray-200 text-gray-600">
                      {member.domain}
                    </span>
                  )}
                </div>
              </div>

              {member.intro && (
                <p className="text-[11px] text-gray-600 line-clamp-2 font-sans leading-relaxed">
                  "{member.intro}"
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-900 rounded hover:bg-gray-100"
                      title="LinkedIn"
                    >
                      <LinkedinIcon />
                    </a>
                  )}
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-900 rounded hover:bg-gray-100"
                      title="GitHub"
                    >
                      <GithubIcon />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditMember(member)}
                    title="Edit Member"
                    className="p-1 text-gray-500 hover:text-gray-900 rounded hover:bg-gray-100"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setMemberToDelete(member)}
                    title="Remove Member"
                    className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
