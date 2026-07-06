export default function Loader({ fullScreen = true, label = 'Chargement...' }) {
  return (
    <div
      className={
        fullScreen
          ? 'fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-white'
          : 'flex flex-col items-center justify-center gap-6 py-16'
      }
    >
      <div className="relative flex items-center justify-center h-36 w-36">
        {/* Anneau externe */}
        <span className="absolute inset-0 rounded-full border-4 border-primary-100" />
        {/* Anneau animé */}
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-accent-400 animate-spin" />
        {/* Halo pulsé */}
        <span className="absolute inset-0 rounded-full animate-pulse-glow" />
        {/* Logo */}
        <img
          src="/logo-finacom-removebg-preview.png"
          alt="FINACOM"
          className="relative h-24 w-24 object-contain animate-pulse"
        />
      </div>

      {label && (
        <p className="text-sm font-medium tracking-wide text-primary-700 uppercase">
          {label}
        </p>
      )}
    </div>
  );
}
