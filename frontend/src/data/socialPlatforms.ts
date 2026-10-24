export interface PlatformConfig {
  key: string;
  name: string;
  iconName: string;
  iconColor: string;
  placeholder: string;
  inputType?: 'text' | 'email' | 'url';
}

export const PREDEFINED_PLATFORMS: PlatformConfig[] = [
  {
    key: 'linkedin',
    name: 'LinkedIn',
    iconName: 'linkedin',
    iconColor: '#0A66C2',
    placeholder: 'https://linkedin.com/in/username',
  },
  {
    key: 'github',
    name: 'GitHub',
    iconName: 'github',
    iconColor: '#111111',
    placeholder: 'https://github.com/username',
  },
  {
    key: 'twitter',
    name: 'X (Twitter)',
    iconName: 'twitter',
    iconColor: '#111111',
    placeholder: 'https://x.com/username',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    iconName: 'instagram',
    iconColor: '#E4405F',
    placeholder: 'https://instagram.com/username',
  },
  {
    key: 'website',
    name: 'Portfolio / Website',
    iconName: 'globe',
    iconColor: '#4285F4',
    placeholder: 'https://yourportfolio.dev',
  },
  {
    key: 'email',
    name: 'Email Address',
    iconName: 'mail',
    iconColor: '#34A853',
    placeholder: 'member@example.com',
    inputType: 'email',
  },
  {
    key: 'discord',
    name: 'Discord',
    iconName: 'discord',
    iconColor: '#5865F2',
    placeholder: 'https://discord.com/users/...',
  },
  {
    key: 'youtube',
    name: 'YouTube',
    iconName: 'youtube',
    iconColor: '#EA4335',
    placeholder: 'https://youtube.com/@handle',
  },
  {
    key: 'medium',
    name: 'Medium',
    iconName: 'medium',
    iconColor: '#111111',
    placeholder: 'https://medium.com/@username',
  },
  {
    key: 'substack',
    name: 'Substack',
    iconName: 'substack',
    iconColor: '#FF6719',
    placeholder: 'https://substack.com/@username',
  },
  {
    key: 'spotify',
    name: 'Spotify',
    iconName: 'spotify',
    iconColor: '#1DB954',
    placeholder: 'https://open.spotify.com/user/...',
  },
  {
    key: 'twitch',
    name: 'Twitch',
    iconName: 'twitch',
    iconColor: '#9146FF',
    placeholder: 'https://twitch.tv/username',
  },
];

export const AVAILABLE_CUSTOM_ICONS = [
  { id: 'globe', label: 'Globe / Web' },
  { id: 'github', label: 'GitHub' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'X / Twitter' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'mail', label: 'Email' },
  { id: 'discord', label: 'Discord' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'sparkles', label: 'Sparkles' },
];

export function getPlatformConfig(key: string): PlatformConfig | undefined {
  return PREDEFINED_PLATFORMS.find((p) => p.key === key);
}

export function getPlatformLabel(
  key: string,
  customPlatforms?: Record<string, { name: string; icon?: string }>
): string {
  if (customPlatforms?.[key]?.name) {
    return customPlatforms[key].name;
  }
  const config = getPlatformConfig(key);
  if (config) return config.name;
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function getPlatformColor(
  key: string,
  customPlatforms?: Record<string, { name: string; icon?: string }>
): string {
  const config = getPlatformConfig(key);
  if (config) return config.iconColor;
  if (customPlatforms?.[key]) return '#4285F4';
  return '#111111';
}

export function isValidSocialEntry(platform: string, rawVal: string): boolean {
  if (!rawVal) return false;
  const val = rawVal.trim();
  if (!val) return false;

  if (platform === 'email' || val.startsWith('mailto:')) {
    const emailCandidate = val.replace(/^mailto:/i, '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCandidate);
  }

  return val.length >= 2;
}

export function getSocialHref(platform: string, rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '#';

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }

  // Handle email addresses
  if (platform === 'email' || (trimmed.includes('@') && !trimmed.includes('/'))) {
    return `mailto:${trimmed.replace(/^mailto:/i, '')}`;
  }

  // Handle platform handles without full domains
  if (platform === 'github' && !trimmed.includes('.')) {
    return `https://github.com/${trimmed.replace(/^@/, '')}`;
  }
  if (platform === 'linkedin' && !trimmed.includes('.')) {
    return `https://linkedin.com/in/${trimmed.replace(/^@/, '')}`;
  }
  if (platform === 'twitter' && !trimmed.includes('.')) {
    return `https://x.com/${trimmed.replace(/^@/, '')}`;
  }
  if (platform === 'instagram' && !trimmed.includes('.')) {
    return `https://instagram.com/${trimmed.replace(/^@/, '')}`;
  }
  if (platform === 'youtube' && !trimmed.includes('.')) {
    return `https://youtube.com/${trimmed.startsWith('@') ? trimmed : `@${trimmed}`}`;
  }
  if (platform === 'discord' && !trimmed.includes('.')) {
    return `https://discord.gg/${trimmed}`;
  }
  if (platform === 'spotify' && !trimmed.includes('.')) {
    return `https://open.spotify.com/user/${trimmed}`;
  }
  if (platform === 'twitch' && !trimmed.includes('.')) {
    return `https://twitch.tv/${trimmed.replace(/^@/, '')}`;
  }

  return `https://${trimmed}`;
}
