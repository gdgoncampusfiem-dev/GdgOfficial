import { TeamMember } from '@/data/team';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

const DEFAULT_TIMEOUT = 8000;

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/team`);
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }
    const json: ApiResponse<TeamMember[]> = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    throw new Error(json.error || 'Invalid API payload');
  } catch (err) {
    console.warn('[teamApi.fetchTeamMembers] Could not fetch live from backend:', err);
    throw err;
  }
}

export async function createTeamMemberApi(memberData: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  const res = await fetchWithTimeout(`${API_BASE}/api/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberData),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `HTTP ${res.status}: Failed to create team member`);
  }

  const json: ApiResponse<TeamMember> = await res.json();
  if (json.success && json.data) {
    return json.data;
  }
  throw new Error(json.error || 'Failed to parse created member data');
}

export async function updateTeamMemberApi(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
  const res = await fetchWithTimeout(`${API_BASE}/api/team/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `HTTP ${res.status}: Failed to update team member`);
  }

  const json: ApiResponse<TeamMember> = await res.json();
  if (json.success && json.data) {
    return json.data;
  }
  throw new Error(json.error || 'Failed to parse updated member data');
}

export async function deleteTeamMemberApi(id: string): Promise<boolean> {
  const res = await fetchWithTimeout(`${API_BASE}/api/team/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `HTTP ${res.status}: Failed to delete team member`);
  }

  const json: ApiResponse<{ id: string }> = await res.json();
  return Boolean(json.success);
}

export async function resetTeamMembersApi(): Promise<TeamMember[]> {
  const res = await fetchWithTimeout(`${API_BASE}/api/team/reset`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: Failed to reset team`);
  }

  const json: ApiResponse<TeamMember[]> = await res.json();
  if (json.success && Array.isArray(json.data)) {
    return json.data;
  }
  throw new Error('Failed to reset team data');
}
