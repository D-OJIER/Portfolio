import { hero } from '../../data/portfolio';

export default function Hero() {
  return (
    <div className="sectionMainHeader">
      <h1>{hero.name}</h1>
      <h1 className="h1_sub">{hero.subtitle}</h1>
    </div>
  );
}
