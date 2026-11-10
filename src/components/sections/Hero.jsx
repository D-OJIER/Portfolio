import { hero } from '../../data/portfolio';

export default function Hero() {
  return (
    <div className="sectionMainHeader">
      <p className="hero-kicker">{hero.kicker}</p>
      <h1>{hero.name}</h1>
      <p className="h1_sub">
        {hero.subtitle}
        <span className="caret" aria-hidden="true">_</span>
      </p>
    </div>
  );
}
