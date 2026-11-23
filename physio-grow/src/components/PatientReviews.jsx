import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VIDEO_REVIEWS = [
  {
    src: '/assets/patientReviews/review1.mp4',
    patientName: 'Patient Review 1',
    label: 'Real Patient Experience',
  },
  {
    src: '/assets/patientReviews/review2.mp4',
    patientName: 'Patient Review 2',
    label: 'Real Patient Experience',
  },
  {
    src: '/assets/patientReviews/review3.mp4',
    patientName: 'Patient Review 3',
    label: 'Real Patient Experience',
  },
];

const VideoCard = ({ src, patientName, label }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden border border-border shadow-md bg-black group cursor-pointer"
         onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        className="w-full aspect-[9/16] object-cover"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

      {/* Play / Pause button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/60">
          {playing
            ? <Pause size={22} className="text-white" />
            : <Play size={22} className="text-white ml-1" />}
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        <p className="text-white font-semibold text-sm">{patientName}</p>
        <p className="text-white/70 text-xs">{label}</p>
      </div>
    </div>
  );
};

const PatientReviews = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="section-padding bg-background-alt overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 fade-up delay-100">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Patient Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Real Patients, Real Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch what our patients have to say about their recovery journey at PhysioGrow Clinic &amp; Academy.
          </p>
        </div>

        {/* Scroll Arrows + Strip */}
        <div className="relative fade-up delay-200">
          {/* Left Arrow */}
          <button
            onClick={() => scroll(-1)}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-background border border-border rounded-full shadow items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            ‹
          </button>

          {/* Scrollable Strip */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 px-2 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {VIDEO_REVIEWS.map((v, i) => (
              <div key={i} className="snap-center">
                <VideoCard {...v} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll(1)}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-background border border-border rounded-full shadow items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            ›
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Swipe or use arrows to watch all reviews
        </p>
      </div>
    </section>
  );
};

export default PatientReviews;
