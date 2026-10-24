import { TeamMember, GoogleColor } from '../types/team';

const colors: GoogleColor[] = ['blue', 'red', 'yellow', 'green'];
const getRandomColor = (index: number) => colors[index % colors.length];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  // Faculty Coordinator
  {
    id: 'tm-1',
    name: '[Faculty Name]',
    role: 'Faculty Coordinator',
    domain: 'Leadership',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80',
    linkedinUrl: 'https://linkedin.com',
    intro: 'Guiding the community with experience and vision, enabling students to explore beyond the curriculum.',
    accentColor: 'blue',
    socials: {
      linkedin: 'https://linkedin.com',
    },
  },
  // Organizers
  ...Array.from({ length: 3 }).map((_, i) => ({
    id: `org-${i}`,
    name: `[Organizer ${i + 1}]`,
    role: 'Organizer',
    domain: 'Leadership',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    intro: 'Leading by example and driving the GDG FIEM community forward through collaborative efforts.',
    accentColor: getRandomColor(i + 1),
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  })),
  // Core Team
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `core-${i}`,
    name: `[Core Member ${i + 1}]`,
    role: 'Core Team',
    domain: i % 3 === 0 ? 'Web Dev' : i % 3 === 1 ? 'AI/ML' : 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&q=80',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    intro: 'Passionate about building cool things, exploring new tech stacks, and helping others learn.',
    accentColor: getRandomColor(i + 2),
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  })),
];
