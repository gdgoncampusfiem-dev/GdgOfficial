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
}

const colors: GoogleColor[] = ['blue', 'red', 'yellow', 'green'];

const getRandomColor = (index: number) => colors[index % colors.length];

export const teacherMentor: TeamMember[] = [
  {
    id: 'tm-1',
    name: '[Faculty Name]',
    role: 'Faculty Coordinator',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80',
    linkedinUrl: '#',
    intro: 'Guiding the community with experience and vision, enabling students to explore beyond the curriculum.',
    accentColor: 'blue',
  }
];

export const organizers: TeamMember[] = Array.from({ length: 3 }).map((_, i) => ({
  id: `org-${i}`,
  name: `[Organizer ${i + 1}]`,
  role: 'Organizer',
  domain: 'Leadership',
  imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
  linkedinUrl: '#',
  githubUrl: '#',
  intro: 'Leading by example and driving the GDG FIEM community forward through collaborative efforts.',
  accentColor: getRandomColor(i + 1),
}));

export const coreTeam: TeamMember[] = Array.from({ length: 25 }).map((_, i) => ({
  id: `core-${i}`,
  name: `[Core Member ${i + 1}]`,
  role: 'Core Team',
  domain: i % 3 === 0 ? 'Web Dev' : i % 3 === 1 ? 'AI/ML' : 'Design',
  imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&q=80',
  linkedinUrl: '#',
  githubUrl: '#',
  intro: 'Passionate about building cool things, exploring new tech stacks, and helping others learn.',
  accentColor: getRandomColor(i + 2),
}));
