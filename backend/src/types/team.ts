export type GoogleColor = 'blue' | 'red' | 'yellow' | 'green';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain?: string;
  imageUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  intro?: string;
  accentColor: GoogleColor;
  socials?: Record<string, string>;
  customSocialPlatforms?: Record<string, { name: string; icon?: string }>;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateTeamMemberDTO = Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTeamMemberDTO = Partial<CreateTeamMemberDTO>;
