export const SECTION_IDS = ['profile', 'expertise', 'education', 'skills', 'projects', 'contact'];
export const STANDARD_THEMES = ['gold', 'green', 'blue', 'red'];

export const POINTS = { cloud: 100, achievement: 50 };
export const HIGH_ROLLER_SCORE = 2500;
export const SPEEDRUN_MS = 15000;
export const WISDOM_COUNT = 5;

// `secret` achievements show as ??? until unlocked.
export const ACHIEVEMENTS = [
  { id: 'insert-coin', icon: '●', title: 'Insert Coin', desc: 'Pressed start.' },
  { id: 'first-pop', icon: '◌', title: 'First Pop', desc: 'Shot down your first cloud.' },
  { id: 'cloud-buster', icon: '◎', title: 'Cloud Buster', desc: 'Shot down 10 clouds.' },
  { id: 'storm-chaser', icon: '≋', title: 'Storm Chaser', desc: 'Shot down 50 clouds.' },
  {
    id: 'high-roller',
    icon: '★',
    title: 'High Roller',
    desc: `Scored ${HIGH_ROLLER_SCORE.toLocaleString('en')} points in one run.`,
  },
  { id: 'explorer', icon: '⌖', title: 'Explorer', desc: 'Scrolled through every section.' },
  {
    id: 'speedrunner',
    icon: '»',
    title: 'Speedrunner',
    desc: `Reached Contact within ${SPEEDRUN_MS / 1000} seconds of pressing start.`,
  },
  { id: 'level-select', icon: '►', title: 'Level Select', desc: 'Checked out every project.' },
  { id: 'chameleon', icon: '◐', title: 'Chameleon', desc: 'Tried all four colour themes.' },
  { id: 'lights-out', icon: '☾', title: 'Lights Out', desc: 'Switched between light and dark mode.' },
  { id: 'sound-check', icon: '♪', title: 'Sound Check', desc: 'Turned the sound on.' },
  { id: 'degauss', icon: '▤', title: 'Degauss', desc: 'Toggled the CRT effect.' },
  { id: 'button-masher', icon: '✱', title: 'Button Masher', desc: 'Clicked the logo 5 times in a row.' },
  { id: 'player-two', icon: '@', title: 'Player 2 Has Entered', desc: 'Opened a contact link.' },
  { id: 'fellow-traveller', icon: '✧', title: 'Fellow Traveller', desc: 'Poked the wanderer in the header.' },
  { id: 'bonfire-lit', icon: '▲', title: 'Bonfire Lit', desc: 'Rested at the bonfire.' },
  {
    id: 'wanderer',
    icon: '◇',
    title: 'Words of the Wanderer',
    desc: `Read ${WISDOM_COUNT} different messages.`,
  },
  { id: 'trophy-room', icon: '♛', title: 'Trophy Room', desc: 'Opened this list.' },
  {
    id: 'cheat-code',
    icon: '↑',
    title: 'Cheat Code',
    desc: 'Entered the classic code and unlocked the synthwave theme.',
    secret: true,
    hint: 'Old-school gamers will know: ↑ ↑ ↓ ↓ …',
  },
  { id: 'completionist', icon: '✦', title: '100% Complete', desc: 'Unlocked every other achievement.' },
];
