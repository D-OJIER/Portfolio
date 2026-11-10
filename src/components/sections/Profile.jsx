import { profile } from '../../data/portfolio';

export default function Profile() {
  return (
    <section id="profile" className="pixel-border">
      <h2>{profile.title}</h2>
      <p>{profile.text}</p>
    </section>
  );
}
