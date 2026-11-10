// All visible text from the original index.html, unchanged.

export const logo = 'ALFRED';

export const themes = [
  { id: 'gold', title: 'Gold theme' },
  { id: 'green', title: 'Green theme' },
  { id: 'blue', title: 'Blue theme' },
  { id: 'red', title: 'Red theme' },
];

export const navLinks = [
  { label: 'Profile', href: '#profile' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  name: 'Alfred Reijo Philomin F',
  subtitle: 'A Computer Science Engineering Student',
};

export const profile = {
  title: 'Profile',
  text: 'Aspiring Computer Science Engineer with a focus on Java and Full-Stack Development. Committed to solving complex engineering problems through innovative software solutions.',
};

// `level` is the label shown; `width` is the bar fill. They differ in the
// original page and are kept as-is.
export const expertise = [
  { name: 'Full Stack Development', level: '70%', width: '90%' },
  { name: 'Java', level: '95%', width: '85%' },
  { name: 'Mobile Development', level: '60%', width: '80%' },
  { name: 'Database Management', level: '85%', width: '85%' },
];

export const education = {
  title: '[ EDUCATION ]',
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

export const projects = {
  title: 'Engineering Projects',
  items: [
    {
      name: 'RentEase',
      description:
        'Mobile application using React Native, implementing real-time database synchronization with Firebase and RESTful API integration.',
    },
    {
      name: 'Parker',
      description:
        'Smart parking management system with MongoDB backend, featuring real-time occupancy tracking and automated billing.',
    },
    {
      name: 'Campus One',
      description:
        'Centralized campus communication platform built with React.js, featuring JWT authentication and WebSocket integration.',
    },
  ],
};

export const contact = {
  title: '[ CONTACT ]',
  lines: ['📞 8056291388', '✉️ reijo2314@gmail.com', '📍 Chennai - 600021'],
  socials: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
};
