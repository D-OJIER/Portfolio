import { useEffect, useRef, useState } from 'react';
import { contact } from '../../data/portfolio';
import { useGame } from '../../game/GameContext';
import { useInView } from '../../hooks/useInView';

const COUNTDOWN_FROM = 9;

// "CONTINUE?" countdown that starts when the section scrolls into view.
function useCountdown(active) {
  const [count, setCount] = useState(COUNTDOWN_FROM);
  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) clearInterval(id);
        return Math.max(c - 1, 0);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [active]);
  return count;
}

export default function Contact() {
  const { actions } = useGame();
  const ref = useRef(null);
  const inView = useInView(ref, 0.5);
  const [joined, setJoined] = useState(false);
  const count = useCountdown(inView && !joined);

  const onContact = () => {
    setJoined(true);
    actions.contactClick();
  };

  let status;
  if (joined) status = 'Player 2 has entered';
  else if (count > 0) status = (
    <>
      Continue? <span className="countdown">{count}</span>
    </>
  );
  else status = 'Insert a message to continue';

  return (
    <section id="contact" className="pixel-border" ref={ref}>
      <p className="continue" aria-hidden="true">
        {status}
      </p>
      <h2>{contact.title}</h2>
      <div className="contact-info">
        {contact.lines.map((line) => (
          <p key={line.text}>
            <span aria-hidden="true">{line.icon}</span>{' '}
            {line.href ? (
              <a href={line.href} className="contact-link" onClick={onContact}>
                {line.text}
              </a>
            ) : (
              line.text
            )}
          </p>
        ))}
        <div className="social-links">
          {contact.socials.map((social) => {
            const external = social.href.startsWith('http');
            return (
              <a
                key={social.label}
                href={social.href}
                className="pixel-button"
                onClick={onContact}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
