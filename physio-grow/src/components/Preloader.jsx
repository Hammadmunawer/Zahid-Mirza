import { useState, useEffect } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth progress counter
    const startTime = Date.now();
    const duration = 1600; // 1.6s total loading time

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsFading(true);
        setTimeout(() => {
          setIsDone(true);
        }, 500); // 500ms fade transition
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-500 ease-out select-none ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading PhysioGrow Clinic"
    >
      {/* Background ambient medical glows */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Running / Rehabilitation Figure & Pulse */}
        <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
          {/* Pulsing circular halo */}
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
          <div className="absolute inset-2 rounded-full border border-primary/20 bg-primary-50/50 dark:bg-primary-950/20 backdrop-blur-sm" />

          {/* Running Athlete Silhouette SVG with kinetic motion */}
          <div className="relative z-10 flex items-center justify-center animate-bounce duration-700">
            <svg
              className="w-20 h-20 text-primary drop-shadow-[0_4px_12px_rgba(13,148,136,0.35)]"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Speed motion lines behind runner */}
              <line x1="8" y1="26" x2="16" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" className="animate-pulse" />
              <line x1="4" y1="34" x2="14" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" className="animate-pulse delay-100" />
              <line x1="6" y1="42" x2="16" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" className="animate-pulse delay-200" />

              {/* Head */}
              <circle cx="38" cy="14" r="5" fill="currentColor" />

              {/* Torso leaning forward */}
              <path
                d="M34 19L27 34"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Front Arm pumping */}
              <path
                d="M31 22L40 27L47 22"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Back Arm */}
              <path
                d="M31 23L22 25L17 31"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />

              {/* Front Leg extending forward in stride */}
              <path
                d="M27 34L37 42L48 40"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Back Leg kicking back */}
              <path
                d="M27 34L21 44L14 41"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* ECG Lifeline Pulse under the runner */}
        <div className="w-56 h-8 mb-5 relative flex items-center justify-center overflow-hidden">
          <svg
            className="w-full h-full text-primary"
            viewBox="0 0 200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background faint pulse path */}
            <path
              d="M0 20 L60 20 L70 6 L80 34 L90 12 L100 24 L108 20 L200 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.2"
            />
            {/* Animated glowing moving pulse line */}
            <path
              d="M0 20 L60 20 L70 6 L80 34 L90 12 L100 24 L108 20 L200 20"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="200"
              strokeDashoffset="200"
              className="ecg-pulse-anim"
            />
          </svg>
        </div>

        {/* Clinic Name & Tagline */}
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-bold tracking-wider text-foreground-bold uppercase">
            Physio<span className="text-primary font-extrabold">Grow</span>
          </h2>
          <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
            Restoring Movement • Empowering Life
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-48 space-y-2">
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(13,148,136,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-semibold text-muted-foreground px-1">
            <span className="uppercase tracking-wider">Rehabilitation</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
