import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

// SEO-keyword-rich labels — good for Lahore physiotherapy ranking
const VIDEO_REVIEWS = [
  {
    src: '/assets/patientReviews/review1.mp4',
    poster: '/assets/team/dr-zahid.jpg',
    patientLabel: 'Back Pain Recovery',
    seoTitle: 'Best Physiotherapist in Lahore – Patient Recovery',
    clinic: 'PhysioGrow Clinic, Lahore',
  },
  {
    src: '/assets/patientReviews/review2.mp4',
    poster: '/assets/team/physiogrow-team-group.jpg',
    patientLabel: 'Sports Injury Rehabilitation',
    seoTitle: 'Sports Injury Treatment in Lahore – Patient Review',
    clinic: 'PhysioGrow Clinic & Academy',
  },
  {
    src: '/assets/patientReviews/review3.mp4',
    poster: '/assets/team/dr-rumman-mehar.jpg',
    patientLabel: 'Spine & Neck Pain Treatment',
    seoTitle: 'Physiotherapy for Neck Pain in Lahore – Patient Testimonial',
    clinic: 'PhysioGrow Clinic, Lahore',
  },
];

const VideoCard = ({ src, poster, patientLabel, seoTitle, clinic }) => {
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
    <div
      className="relative flex-shrink-0 w-60 sm:w-68 rounded-2xl overflow-hidden border border-border shadow-md bg-background cursor-pointer group"
      style={{ width: '17rem' }}
      onClick={togglePlay}
    >
      {/* Poster image shown below video while loading / before play */}
      <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
        {/* Poster behind video */}
        <img
          src={poster}
          alt={seoTitle}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Video on top — transparent background shows poster */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none z-10" />

        {/* Play / Pause */}
        <div className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-200 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <div className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/70 shadow-lg">
            {playing
              ? <Pause size={22} className="text-white" />
              : <Play size={22} className="text-white ml-1" />}
          </div>
        </div>

        {/* Mute */}
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 z-30 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pointer-events-none">
          <p className="text-white font-bold text-sm leading-tight">{patientLabel}</p>
          <p className="text-white/70 text-xs mt-0.5">{clinic}</p>
        </div>
      </div>
    </div>
  );
};

const PatientReviews = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 290, behavior: 'smooth' });
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
            Real Patients, Real Recovery – PhysioGrow Lahore
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch real patient testimonials from PhysioGrow Clinic &amp; Academy —
            Lahore's trusted physiotherapy centre for back pain, sports injuries, and spine rehabilitation.
          </p>
        </div>

        {/* Scroll Container with overlapping arrows */}
        <div className="relative fade-up delay-200">

          {/* LEFT ARROW — overlaps between edge and first card */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable strip */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 px-10 scroll-smooth snap-x snap-mandatory touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {VIDEO_REVIEWS.map((v, i) => (
              <div key={i} className="snap-center">
                <VideoCard {...v} />
              </div>
            ))}
          </div>

          {/* RIGHT ARROW — overlaps between last card and edge */}
          <button
            onClick={() => scroll(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        <p className="text-center text-xs text-muted-foreground mt-2">
          Swipe or tap arrows to watch all patient reviews
        </p>
      </div>
    </section>
  );
};

export default PatientReviews;
