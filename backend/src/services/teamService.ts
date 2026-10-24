import fs from 'fs';
import path from 'path';
import { TeamMember, CreateTeamMemberDTO, UpdateTeamMemberDTO } from '../types/team';
import { INITIAL_TEAM_MEMBERS } from '../data/initialTeam';

const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'team.json');

class TeamService {
  private ensureDataStore(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_TEAM_MEMBERS, null, 2), 'utf-8');
    }
  }

  private readFromDisk(): TeamMember[] {
    try {
      this.ensureDataStore();
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        return data;
      }
      return INITIAL_TEAM_MEMBERS;
    } catch (err) {
      console.error('[TeamService] Error reading team data:', err);
      return INITIAL_TEAM_MEMBERS;
    }
  }

  private writeToDisk(members: TeamMember[]): void {
    try {
      this.ensureDataStore();
      fs.writeFileSync(DATA_FILE, JSON.stringify(members, null, 2), 'utf-8');
    } catch (err) {
      console.error('[TeamService] Error writing team data:', err);
      throw new Error('Failed to persist team data to disk');
    }
  }

  public getAll(): TeamMember[] {
    return this.readFromDisk();
  }

  public getById(id: string): TeamMember | null {
    const members = this.readFromDisk();
    return members.find(m => m.id === id) || null;
  }

  public create(dto: CreateTeamMemberDTO): TeamMember {
    const members = this.readFromDisk();
    const now = new Date().toISOString();
    const newMember: TeamMember = {
      id: 'team-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      name: dto.name.trim(),
      role: dto.role.trim(),
      domain: dto.domain ? dto.domain.trim() : 'General',
      imageUrl: dto.imageUrl.trim(),
      intro: dto.intro ? dto.intro.trim() : '',
      accentColor: dto.accentColor || 'blue',
      linkedinUrl: dto.linkedinUrl?.trim(),
      githubUrl: dto.githubUrl?.trim(),
      socials: dto.socials || {},
      customSocialPlatforms: dto.customSocialPlatforms || {},
      createdAt: now,
      updatedAt: now,
    };

    members.unshift(newMember);
    this.writeToDisk(members);
    return newMember;
  }

  public update(id: string, dto: UpdateTeamMemberDTO): TeamMember | null {
    const members = this.readFromDisk();
    const index = members.findIndex(m => m.id === id);
    if (index === -1) return null;

    const existing = members[index];
    const now = new Date().toISOString();

    const updated: TeamMember = {
      ...existing,
      ...dto,
      name: dto.name !== undefined ? dto.name.trim() : existing.name,
      role: dto.role !== undefined ? dto.role.trim() : existing.role,
      domain: dto.domain !== undefined ? dto.domain.trim() : existing.domain,
      imageUrl: dto.imageUrl !== undefined ? dto.imageUrl.trim() : existing.imageUrl,
      intro: dto.intro !== undefined ? dto.intro.trim() : existing.intro,
      accentColor: dto.accentColor || existing.accentColor,
      socials: dto.socials !== undefined ? dto.socials : existing.socials,
      customSocialPlatforms: dto.customSocialPlatforms !== undefined ? dto.customSocialPlatforms : existing.customSocialPlatforms,
      updatedAt: now,
    };

    members[index] = updated;
    this.writeToDisk(members);
    return updated;
  }

  public delete(id: string): boolean {
    const members = this.readFromDisk();
    const filtered = members.filter(m => m.id !== id);
    if (filtered.length === members.length) {
      return false;
    }
    this.writeToDisk(filtered);
    return true;
  }

  public reset(): TeamMember[] {
    this.writeToDisk(INITIAL_TEAM_MEMBERS);
    return INITIAL_TEAM_MEMBERS;
  }
}

export const teamService = new TeamService();
