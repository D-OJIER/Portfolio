import { contact } from '../../data/portfolio';

export default function Contact() {
  return (
    <section id="contact" className="pixel-border">
      <h2>{contact.title}</h2>
      <div className="contact-info">
        {contact.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <div className="social-links">
          {contact.socials.map((social) => (
            <a key={social.label} href={social.href} className="pixel-button">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
