// All visible text for the portfolio.

export const logo = 'Alfred';

// `secret` themes only appear in the picker once unlocked (Konami code).
export const themes = [
  { id: 'gold', title: 'Gold theme' },
  { id: 'green', title: 'Green theme' },
  { id: 'blue', title: 'Blue theme' },
  { id: 'red', title: 'Red theme' },
  { id: 'synth', title: 'Secret synthwave theme', secret: true },
];

// Waypoints on the header map (in page order).
export const navLinks = [
  { label: 'Profile', href: '#profile' },
  { label: 'Skills', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Bonfire', href: '#bonfire' },
];

export const hero = {
  kicker: 'Player 1 · Ready',
  name: 'Alfred Reijo Philomin F',
  subtitle: 'A Computer Science Engineering Student',
};

export const profile = {
  title: 'Profile',
  text: 'Aspiring Computer Science Engineer with a focus on Java and Full-Stack Development. Committed to solving complex engineering problems through innovative software solutions.',
};

// `level` drives both the label and the bar fill (they used to disagree).
export const expertise = {
  title: 'Expertise',
  items: [
    { name: 'Full Stack Development', level: 70, glyph: 'stack' },
    { name: 'Java', level: 95, glyph: 'java' },
    { name: 'Mobile Development', level: 60, glyph: 'mobile' },
    { name: 'Database Management', level: 85, glyph: 'database' },
  ],
};

export const education = {
  title: 'Education',
  items: [
    { school: "ST. MARY'S ANGLO-INDIAN HSS", details: '2012-2022 | HSE - 87%' },
    { school: 'LOYOLA-ICAM COLLEGE', details: '2022 - Present | CGPA: 8.0' },
  ],
};

export const skills = {
  title: 'Technical Skills',
  items: [
    'Java',
    'DSA',
    'Full-Stack Development',
    'React Native & React.js',
    'Database Management',
    'C',
    'Version Control (Git)',
    'Python',
  ],
};

// `geometry` picks the animated emblem. Each screen shows `image` (a path
// under public/) when given, otherwise an illustrative mock-up (`mock`).
export const projects = {
  title: 'Engineering Projects',
  items: [
    {
      name: 'RentEase',
      description:
        'Mobile application using React Native, implementing real-time database synchronization with Firebase and RESTful API integration.',
      geometry: 'handoff',
      tags: ['React Native', 'Firebase', 'REST'],
      repo: 'https://github.com/D-OJIER/RentEase',
      screens: [
        { label: 'Browse', mock: 'rent-browse' },
        { label: 'Cart', mock: 'rent-cart' },
        { label: 'Chat', mock: 'rent-chat' },
      ],
    },
    {
      name: 'Parker',
      description:
        'Smart parking management system with MongoDB backend, featuring real-time occupancy tracking and automated billing.',
      geometry: 'bays',
      tags: ['MongoDB', 'Real-time', 'Billing'],
      screens: [
        { label: 'Live occupancy', mock: 'parker-live' },
        { label: 'Billing', mock: 'parker-bill' },
      ],
    },
    {
      name: 'Campus One',
      description:
        'Centralized campus communication platform built with React.js, featuring JWT authentication and WebSocket integration.',
      geometry: 'hub',
      tags: ['React.js', 'JWT', 'WebSocket'],
      repo: 'https://github.com/D-OJIER/1Campus',
      screens: [
        { label: 'Event feed', mock: 'campus-feed' },
        { label: 'Calendar', mock: 'campus-cal' },
      ],
    },
  ],
};

export const contact = {
  title: 'Contact',
  lines: [
    { icon: 'phone', text: '8056291388', href: 'tel:+918056291388' },
    { icon: 'mail', text: 'reijo2314@gmail.com', href: 'mailto:reijo2314@gmail.com' },
    { icon: 'pin', text: 'Chennai - 600021' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/D-OJIER' },
    // TODO: add the LinkedIn profile URL.
    { label: 'LinkedIn', href: '#' },
  ],
};
