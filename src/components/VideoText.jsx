/**
 * VideoText — équivalent open-source du composant Magic UI.
 * Affiche un texte rempli avec une vidéo en background, grâce à un mask SVG
 * généré dynamiquement (CSS `mask-image` + URL data SVG).
 *
 * Usage :
 *   <VideoText src="/finacom.mp4" fontSize={22}>FINACOM</VideoText>
 */
export default function VideoText({
  children,
  src,
  className = '',
  fontSize = 22,
  fontWeight = 900,
  fontFamily = 'system-ui, sans-serif',
  letterSpacing = '-0.05em',
  autoPlay = true,
  muted = true,
  loop = true,
  preload = 'auto',
}) {
  const content = typeof children === 'string' ? children : '';

  // SVG mask sous forme de data URL
  const svgMask = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid slice'><text x='50%' y='50%' font-size='${fontSize}' font-weight='${fontWeight}' text-anchor='middle' dominant-baseline='central' font-family='${fontFamily}' letter-spacing='${letterSpacing}'>${content}</text></svg>`;

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  const maskStyles = {
    maskImage: dataUrlMask,
    WebkitMaskImage: dataUrlMask,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center" style={maskStyles}>
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          preload={preload}
          aria-hidden="true"
        >
          <source src={src} />
        </video>
      </div>
      {/* Texte SEO/accessibilité (caché visuellement) */}
      <span className="sr-only">{content}</span>
    </div>
  );
}
