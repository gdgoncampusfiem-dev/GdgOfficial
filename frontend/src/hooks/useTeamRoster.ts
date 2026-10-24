import { useState, useEffect } from 'react';
import { TeamMember, teacherMentor as defaultMentor, organizers as defaultOrganizers, coreTeam as defaultCore } from '@/data/team';

const LOCAL_STORAGE_KEY = 'gdg_fiem_admin_state_v1';

export interface GroupedTeam {
  faculty: TeamMember[];
  organizers: TeamMember[];
  coreTeam: TeamMember[];
  all: TeamMember[];
}

const getInitialRoster = (): TeamMember[] => {
  const defaults = [...defaultMentor, ...defaultOrganizers, ...defaultCore];
  if (typeof window === 'undefined') return defaults;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.teamMembers) && parsed.teamMembers.length > 0) {
        return parsed.teamMembers;
      }
    }
  } catch {
    // Fallback to defaults
  }
  return defaults;
};

export function useTeamRoster(): GroupedTeam {
  const [roster, setRoster] = useState<TeamMember[]>(getInitialRoster);

  useEffect(() => {

    // Listen to storage events across tabs or local updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed.teamMembers)) {
            setRoster(parsed.teamMembers);
          }
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const faculty = roster.filter(m => 
    m.role.toLowerCase().includes('faculty') || 
    m.role.toLowerCase().includes('coordinator') || 
    m.role.toLowerCase().includes('mentor')
  );

  const organizers = roster.filter(m => 
    !faculty.includes(m) && (
      m.role.toLowerCase().includes('organizer') || 
      m.role.toLowerCase().includes('lead')
    )
  );

  const coreTeam = roster.filter(m => 
    !faculty.includes(m) && !organizers.includes(m)
  );

  return {
    faculty: faculty.length > 0 ? faculty : defaultMentor,
    organizers: organizers.length > 0 ? organizers : defaultOrganizers,
    coreTeam: coreTeam.length > 0 ? coreTeam : defaultCore,
    all: roster,
  };
}
