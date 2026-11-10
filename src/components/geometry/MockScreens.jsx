// Illustrative app screens built from simple blocks. Used when a project has
// no real screenshot yet; add `image` to a screen in portfolio.js to show a
// real one instead.

function Phone({ children }) {
  return (
    <div className="mk-phone">
      <span className="mk-notch" />
      {children}
    </div>
  );
}

function Browser({ children }) {
  return (
    <div className="mk-browser">
      <div className="mk-chrome">
        <i />
        <i />
        <i />
        <span className="mk-url" />
      </div>
      <div className="mk-body">{children}</div>
    </div>
  );
}

const T = ({ children, className = '' }) => <span className={`mk-t ${className}`}>{children}</span>;

const MOCKS = {
  'rent-browse': () => (
    <Phone>
      <div className="mk-bar">
        <T className="title">RentEase</T>
        <T className="dim">Renter</T>
      </div>
      <span className="mk-search">
        <T className="dim">Search items…</T>
      </span>
      <div className="mk-grid2">
        {[
          ['Camera', 300],
          ['Tent', 450],
          ['Drill', 150],
          ['Bicycle', 200],
        ].map(([name, price]) => (
          <div className="mk-card" key={name}>
            <span className="mk-thumb" />
            <T>{name}</T>
            <span className="mk-chip">₹{price}/day</span>
          </div>
        ))}
      </div>
      <div className="mk-tabs">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={i === 0 ? 'on' : ''} />
        ))}
      </div>
    </Phone>
  ),
  'rent-cart': () => (
    <Phone>
      <div className="mk-bar">
        <T className="title">Cart · 3</T>
      </div>
      {[
        ['Camera', '2 days', 600],
        ['Tent', '1 day', 450],
        ['Drill', '2 days', 300],
      ].map(([name, days, price]) => (
        <div className="mk-row" key={name}>
          <span className="mk-thumb sm" />
          <div className="mk-col">
            <T>{name}</T>
            <T className="dim">{days}</T>
          </div>
          <T className="accent">₹{price}</T>
        </div>
      ))}
      <div className="mk-total">
        <T>Total</T>
        <span className="mk-chip">₹1,350</span>
      </div>
      <span className="mk-button">Rent now</span>
    </Phone>
  ),
  'rent-chat': () => (
    <Phone>
      <div className="mk-bar">
        <T className="title">Lender</T>
        <T className="dim">online</T>
      </div>
      <div className="mk-chat">
        <span className="mk-bubble l">Is the tent free on Sat?</span>
        <span className="mk-bubble r">Yes! Pick up at 10.</span>
        <span className="mk-bubble l">Booking it now.</span>
        <span className="mk-bubble r">Done, see you.</span>
        <span className="mk-bubble l typing">
          <i />
          <i />
          <i />
        </span>
      </div>
    </Phone>
  ),
  'parker-live': () => (
    <Browser>
      <div className="mk-bar">
        <T className="title">Lot A · Live</T>
        <T className="accent">● Online</T>
      </div>
      <div className="mk-stats">
        <span className="mk-stat">
          <b>42</b>free
        </span>
        <span className="mk-stat">
          <b>78%</b>full
        </span>
        <span className="mk-stat">
          <b>₹6k</b>today
        </span>
      </div>
      <div className="mk-bays">
        {Array.from({ length: 16 }, (_, i) => (
          <i key={i} className={(i * 5) % 7 < 4 ? 'taken' : ''} style={{ animationDelay: `${(i % 5) * 0.7}s` }}>
            {String.fromCharCode(65 + Math.floor(i / 8))}
            {(i % 8) + 1}
          </i>
        ))}
      </div>
    </Browser>
  ),
  'parker-bill': () => (
    <Browser>
      <div className="mk-receipt">
        <T className="title">Receipt #2041</T>
        {[
          ['Slot', 'B4'],
          ['Entry', '09:12'],
          ['Exit', '13:40'],
          ['Duration', '4h 28m'],
        ].map(([k, v]) => (
          <div className="mk-leader" key={k}>
            <T className="dim">{k}</T>
            <span className="dots" />
            <T>{v}</T>
          </div>
        ))}
        <div className="mk-leader total">
          <T>Total</T>
          <span className="dots" />
          <span className="mk-chip">₹240</span>
        </div>
        <span className="mk-stamp">Paid</span>
      </div>
    </Browser>
  ),
  'campus-feed': () => (
    <Browser>
      <span className="mk-banner">
        <T className="title">Tech Fest ’26</T>
        <T className="dim">Registrations open</T>
      </span>
      <div className="mk-grid3">
        {[
          ['Hackathon', 'Fri'],
          ['Workshop', 'Sat'],
          ['Music night', 'Sun'],
        ].map(([name, day]) => (
          <div className="mk-card" key={name}>
            <span className="mk-thumb" />
            <T>{name}</T>
            <T className="dim">{day}</T>
          </div>
        ))}
      </div>
    </Browser>
  ),
  'campus-cal': () => (
    <Browser>
      <div className="mk-bar">
        <T className="title">October</T>
        <T className="dim">5 events</T>
      </div>
      <div className="mk-cal">
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} className={[3, 9, 10, 17, 24].includes(i) ? 'ev' : i === 15 ? 'today' : ''}>
            {i + 1}
          </i>
        ))}
      </div>
      <span className="mk-toast">
        <i /> Live · new event
      </span>
    </Browser>
  ),
};

export default function MockScreen({ id }) {
  const Mock = MOCKS[id];
  return Mock ? <Mock /> : null;
}
