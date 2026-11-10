// Lines taken from keep-notes.md. Personal / romantic notes are left out.

export const quotes = [
  { text: 'Help, if strength remains. Harm, never.', source: 'The Wanderer' },
  { text: 'Love others, for all bonds will one day turn to ash.', source: 'The Wanderer' },
  { text: 'For even in ash, there’s life I saw.', source: 'Amidst the Flames' },
  { text: 'Let the winds rage, the storms descend, still, I’ll behold till the very end.', source: 'Amidst the Flames' },
  { text: 'In every ember, a truth to defend.', source: 'Amidst the Flames' },
  {
    text: 'Love travels slower than hate, but it sinks deeper, lingers longer, and builds eternities where rage only burns seconds.',
    source: 'The Wanderer',
  },
  { text: 'Love and logic dwell not in the same sphere, child; one doth burn, the other bind.', source: 'The Wanderer' },
  { text: 'I tried, and still I fail. Yet still, I do.', source: 'Life of Gray' },
  { text: 'They do not hate me, nor do they love me. And yet, I am what I do.', source: 'Life of Gray' },
  { text: 'To love is to dream. To dream is to wake up.', source: 'The Wanderer' },
  { text: 'Forgive me for underestimating the power of sin and overestimating my own power.', source: 'The Wanderer' },
  { text: 'Ruler of nothing, yet sovereign of dreams.', source: 'Voided' },
  { text: 'I am the hush before creation’s breath.', source: 'Voided' },
  { text: 'Thou shalt forgive but never forget; wisdom thus thou gain.', source: 'Code of Ojier · XIV' },
  { text: 'Let thy word be thy bond; in honesty remain.', source: 'Code of Ojier · XV' },
  { text: 'Porunmai, Endurance: through trials hold fast, for strength shall appear.', source: 'Code of Ojier · XVII' },
  { text: 'Payanilai, Purpose: in thy heart be cast, let it guide thy way.', source: 'Code of Ojier · XVIII' },
  { text: 'Live in the moment, let not time slip away; cherish each day.', source: 'Code of Ojier · XIX' },
  { text: 'Makoto, Honesty and Sincerity: let truth be thy light.', source: 'Code of Ojier · XX' },
  { text: 'Thou shalt never harbor expectation; let actions flow free of desire.', source: 'Code of Ojier · XXI' },
  { text: 'Never refuse a challenge from one bold; stand firm and be true.', source: 'Code of Ojier · XXII' },
  { text: 'Strive for the best in all that thou do.', source: 'Code of Ojier · XXIII' },
  { text: 'Stand for the weak; shield them with thine own might.', source: 'Code of Ojier · XII' },
  { text: 'Turn not thy back upon a foe in strife; face him with valor bright.', source: 'Code of Ojier · XIII' },
  { text: 'Kallāmai, the spirit of Fearlessness: be not weak; embrace thy fate.', source: 'Code of Ojier · VI' },
  {
    text: 'Honor will be my crown, Loyalty my banner, and Compassion my path.',
    source: 'Oath of Ojier, the Forgotten Wanderer',
  },
];

// One shuffled deck per page load, so scattered messages don't repeat.
const deck = [...quotes.keys()].sort(() => Math.random() - 0.5);
let cursor = 0;

export function drawQuote() {
  const quote = quotes[deck[cursor % deck.length]];
  cursor += 1;
  return quote;
}

export function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
