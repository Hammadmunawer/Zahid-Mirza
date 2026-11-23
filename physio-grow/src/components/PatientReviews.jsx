import { useRef, useState, useEffect } from 'react';
import { Play, X, Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PATIENT_REVIEWS_DATA } from '../constants';

// High-performance video frame thumbnail generator
// Captures non-black frame to Canvas once, then frees video memory completely
const VideoThumbnail = ({ src, alt, seekTime = 2.5 }) => {
  const [thumb, setThumb] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let attempts = 0;
    const initialSeek = seekTime || 2.5;

    const video = document.createElement('video');
    video.src = `${src}#t=${initialSeek}`;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';

    const captureFrame = () => {
      try {
        if (!isMounted) return;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 360;
        canvas.height = video.videoHeight || 640;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Check if captured frame is completely dark (e.g. black intro/fade)
        const sampleW = Math.min(60, canvas.width);
        const sampleH = Math.min(60, canvas.height);
        const imgData = ctx.getImageData(0, 0, sampleW, sampleH).data;
        let sum = 0;
        for (let i = 0; i < imgData.length; i += 4) {
          sum += (imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3;
        }
        const avgBrightness = sum / (imgData.length / 4);

        // If the frame is pitch black (< 20 brightness) and video has more time, advance 1.5s
        if (avgBrightness < 20 && attempts < 3 && video.currentTime + 1.5 < (video.duration || 30)) {
          attempts++;
          video.currentTime += 1.5;
          return; // Wait for next seeked event
        }

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        if (dataUrl && dataUrl.length > 500) {
          setThumb(dataUrl);
        }
      } catch (e) {
        // Fallback: keep native video element showing decoded frame
      }
      cleanup();
    };

    const handleLoadedMetadata = () => {
      video.currentTime = initialSeek;
    };

    const cleanup = () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', captureFrame);
      video.src = '';
      video.load();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', captureFrame);

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [src, seekTime]);

  if (thumb) {
    return (
      <img
        src={thumb}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={`${src}#t=${seekTime || 2.5}`}
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={(e) => {
        try {
          e.target.currentTime = seekTime || 2.5;
        } catch (_) {}
      }}
      className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
    />
  );
};

const PatientReviews = () => {
  const scrollRef = useRef(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  // Keyboard navigation for popup
  useEffect(() => {
    if (!selectedReview) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedReview(null);
      if (e.key === 'ArrowRight') {
        const idx = PATIENT_REVIEWS_DATA.findIndex((r) => r.id === selectedReview.id);
        setSelectedReview(PATIENT_REVIEWS_DATA[(idx + 1) % PATIENT_REVIEWS_DATA.length]);
      }
      if (e.key === 'ArrowLeft') {
        const idx = PATIENT_REVIEWS_DATA.findIndex((r) => r.id === selectedReview.id);
        setSelectedReview(PATIENT_REVIEWS_DATA[(idx - 1 + PATIENT_REVIEWS_DATA.length) % PATIENT_REVIEWS_DATA.length]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReview]);

  return (
    <section id="reviews" className="section-padding bg-background-alt overflow-hidden">
      <div className="container-max">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 fade-up delay-100">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} />
            <span>Verified Patient Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Patient Recovery Reviews – PhysioGrow Lahore
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Hear directly from patients treated by <strong>Dr. Zahid Ghaffar Mirza</strong> and team for back pain,
            sports injuries, and spine rehabilitation at Lahore's premier physiotherapy clinic.
          </p>
        </div>

        {/* Scroll Container with overlapping side arrows */}
        <div className="relative fade-up delay-200">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll(-1)}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/95 text-foreground border border-border rounded-full shadow-xl items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Scrollable strip */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4 sm:px-12 scroll-smooth snap-x snap-mandatory touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PATIENT_REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                onClick={() => setSelectedReview(rev)}
                className="snap-start flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden border border-border bg-background shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col hover:-translate-y-1"
              >
                {/* Video Preview Container (Aspect 9/14 vertical portrait) */}
                <div className="relative w-full aspect-[9/14] bg-neutral-900 overflow-hidden">
                  <VideoThumbnail src={rev.src} alt={rev.seoTitle} seekTime={rev.seekTime} />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

                  {/* Top Badge: Category & 5 Stars */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="bg-primary/95 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow backdrop-blur-sm">
                      {rev.tag}
                    </span>
                    <div className="flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Centered Play Button (matches Events section) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Play size={28} fill="currentColor" className="ml-1" />
                    </div>
                    <span className="mt-3 text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity">
                      Click to Watch Video
                    </span>
                  </div>

                  {/* Bottom Info on Card */}
                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 pointer-events-none">
                    <h3 className="text-white font-bold text-base leading-snug line-clamp-2 drop-shadow-sm mb-1">
                      {rev.title}
                    </h3>
                    <p className="text-white/80 text-xs flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                      <span>{rev.doctor}</span>
                    </p>
                    <p className="text-white/60 text-[11px] mt-0.5">{rev.clinic}</p>
                  </div>
                </div>

                {/* Card footer description */}
                <div className="p-4 bg-background flex flex-col justify-between flex-grow">
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 italic mb-3">
                    "{rev.quote}"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                    <span className="font-semibold text-primary">{rev.condition}</span>
                    <span className="text-primary font-medium group-hover:underline flex items-center gap-1">
                      Watch <Play size={10} fill="currentColor" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll(1)}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/95 text-foreground border border-border rounded-full shadow-xl items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Swipe or tap arrows to view all patient video reviews • Click any video to play in full screen
        </p>
      </div>

      {/* POPUP / MODAL LIGHTBOX FOR VIDEO */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 z-30 p-2.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors border border-white/20 shadow-lg"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video Player Column */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center aspect-[9/16] md:aspect-auto md:min-h-[460px] max-h-[60vh] md:max-h-[85vh]">
              <video
                src={selectedReview.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />

              {/* Prev / Next within modal */}
              {PATIENT_REVIEWS_DATA.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = PATIENT_REVIEWS_DATA.findIndex((r) => r.id === selectedReview.id);
                      setSelectedReview(PATIENT_REVIEWS_DATA[(idx - 1 + PATIENT_REVIEWS_DATA.length) % PATIENT_REVIEWS_DATA.length]);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-white/10"
                    aria-label="Previous video"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = PATIENT_REVIEWS_DATA.findIndex((r) => r.id === selectedReview.id);
                      setSelectedReview(PATIENT_REVIEWS_DATA[(idx + 1) % PATIENT_REVIEWS_DATA.length]);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-white/10"
                    aria-label="Next video"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Details Column */}
            <div className="md:w-2/5 p-6 sm:p-7 flex flex-col justify-between bg-neutral-900 text-white overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {selectedReview.tag}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                  {selectedReview.title}
                </h3>

                <p className="text-primary-300 text-xs font-semibold mb-4">
                  {selectedReview.seoTitle}
                </p>

                <div className="space-y-3 py-3 border-y border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-400 block">Condition Treated</span>
                    <span className="font-semibold text-white">{selectedReview.condition}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Consultant</span>
                    <span className="font-semibold text-white">{selectedReview.doctor}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Clinic</span>
                    <span className="text-neutral-300">{selectedReview.clinic}</span>
                  </div>
                </div>

                <p className="text-neutral-300 text-xs leading-relaxed italic mt-4">
                  "{selectedReview.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2">
                <a
                  href="#appointment"
                  onClick={() => setSelectedReview(null)}
                  className="btn-primary block text-center text-xs py-2.5 rounded-xl font-bold"
                >
                  Book Consultation
                </a>
                <a
                  href="https://wa.me/923086010520?text=Assalam-o-Alaikum%20Dr.%20Zahid,%20I%20saw%20your%20patient%20recovery%20video%20and%20want%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp block text-center text-xs py-2 rounded-xl font-bold"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientReviews;
