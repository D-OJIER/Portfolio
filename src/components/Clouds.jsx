import { useClouds, cloudSrc } from '../hooks/useClouds';

export default function Clouds({ appearance }) {
  const { clouds, size, removeCloud } = useClouds(appearance);

  return (
    <div id="backgroundHeader">
      {clouds.map((cloud) => {
        const src = cloudSrc(appearance.theme, cloud.number);
        return (
          <img
            key={cloud.id}
            className="clouds"
            src={src}
            alt=""
            style={{
              width: `${size}px`,
              '--duration': `${cloud.duration}s`,
              '--ypos': `${cloud.yPos}px`,
              '--animation-name': cloud.direction,
              opacity: cloud.opacity,
            }}
            onAnimationEnd={() => removeCloud(cloud.id)}
            onError={() => {
              console.error(`Failed to load cloud image: ${src}`);
              removeCloud(cloud.id);
            }}
          />
        );
      })}
    </div>
  );
}
