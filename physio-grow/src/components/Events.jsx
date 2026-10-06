import { useState, useRef, useEffect } from 'react';
import { EVENTS_DATA } from '../constants';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

/* Extract unique categories from data */
const CATEGORIES = ['All', ...Array.from(new Set(EVENTS_DATA.map((e) => e.category)))];

/* Horizontal auto-scrolling marquee event strip */
const EventMarquee = ({ events, onSelect }) => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Pause/Play control */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-20 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-full text-muted-foreground hover:text-primary transition-colors shadow-sm"
        aria-label={isPaused ? 'Play auto-scroll' : 'Pause auto-scroll'}
      >
        {isPaused ? <Play size={14} /> : <Pause size={14} />}
      </button>

      <div 
        ref={trackRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`event-marquee-track flex gap-6 py-4 ${isPaused ? 'paused' : ''}`}
        >
          {/* Double the items for infinite scroll effect */}
          {[...events, ...events].map((event, index) => (
            <EventCard key={`${event.id}-${index}`} event={event} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* Reusable event card */
const EventCard = ({ event, onSelect }) => (
  <div
    className="flex-shrink-0 w-[340px] sm:w-[400px] cursor-pointer group"
    onClick={() => onSelect(event)}
  >
    <div className="relative bg-background rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            width="400"
            height="250"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="w-full h-full bg-primary-50 flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        {event.video && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-sm z-10 group-hover:scale-110 transition-transform">
            <Play size={24} fill="currentColor" className="ml-1" />
          </div>
        )}
        {/* Category ribbon */}
        <div className="absolute top-0 left-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-br-xl z-10">
          {event.category}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center z-0">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-primary font-semibold text-sm px-4 py-2 rounded-full shadow-lg z-20">
            {event.video ? 'Watch Video' : 'View Details'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-foreground-bold mb-2 line-clamp-1">{event.title}</h3>
        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
          {event.date && (
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-primary" />
              {event.date}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-primary" />
              {event.location}
            </span>
          )}
        </div>
        <p className="text-sm text-foreground line-clamp-2 leading-relaxed">{event.description}</p>
      </div>
    </div>
  </div>
);

/* Grid gallery for filtered category */
const EventGrid = ({ events, onSelect }) => (
  <div className="container-max px-4 sm:px-6 lg:px-8">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="cursor-pointer group"
          onClick={() => onSelect(event)}
        >
          <div className="relative bg-background rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Image */}
            <div className="aspect-[16/10] relative overflow-hidden">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="400"
                  height="250"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-primary-50 flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
              {event.video && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-sm z-10 group-hover:scale-110 transition-transform">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
              )}
              {/* Category ribbon */}
              <div className="absolute top-0 left-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-br-xl z-10">
                {event.category}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center z-0">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-primary font-semibold text-sm px-4 py-2 rounded-full shadow-lg z-20">
                  {event.video ? 'Watch Video' : 'View Details'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-base font-bold text-foreground-bold mb-2 line-clamp-1">{event.title}</h3>
              <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                {event.date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-primary" />
                    {event.date}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-primary" />
                    {event.location}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground line-clamp-2 leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEvents = activeCategory === 'All'
    ? EVENTS_DATA
    : EVENTS_DATA.filter((e) => e.category === activeCategory);

  /* For lightbox prev/next, navigate within filtered list */
  const handleNext = (e) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    const currentIndex = filteredEvents.findIndex(ev => ev.id === selectedEvent.id);
    const nextIndex = (currentIndex + 1) % filteredEvents.length;
    setSelectedEvent(filteredEvents[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    const currentIndex = filteredEvents.findIndex(ev => ev.id === selectedEvent.id);
    const prevIndex = (currentIndex - 1 + filteredEvents.length) % filteredEvents.length;
    setSelectedEvent(filteredEvents[prevIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedEvent) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedEvent(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <section id="events" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Our Professional Journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">Events & Professional Moments</h2>
          <p className="text-muted-foreground">
            A glimpse into our professional activities, seminars, workshops, and community engagements.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {CATEGORIES.map((category) => {
            const count = category === 'All'
              ? EVENTS_DATA.length
              : EVENTS_DATA.filter((e) => e.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === category
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                    : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {category}
                <span className={`ml-1.5 text-xs ${
                  activeCategory === category ? 'text-white/80' : 'text-muted-foreground/60'
                }`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Show marquee for "All", grid for specific categories */}
      {activeCategory === 'All' ? (
        <>
          <EventMarquee events={EVENTS_DATA} onSelect={setSelectedEvent} />

          {/* Counter dots */}
          <div className="flex justify-center gap-2 mt-6">
            {EVENTS_DATA.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-2.5 h-2.5 rounded-full bg-primary/30 hover:bg-primary transition-colors"
                aria-label={`View ${event.title}`}
              />
            ))}
          </div>
        </>
      ) : (
        <EventGrid events={filteredEvents} onSelect={setSelectedEvent} />
      )}

      {/* Lightbox Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div className="relative w-full max-w-4xl bg-background rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              onClick={() => setSelectedEvent(null)}
            >
              <X size={20} />
            </button>
            
            <div className="md:w-2/3 bg-black relative flex items-center justify-center min-h-[300px]">
              {selectedEvent.video ? (
                <video 
                  src={selectedEvent.video} 
                  controls
                  autoPlay
                  className="max-w-full max-h-[70vh] object-contain"
                />
              ) : selectedEvent.image ? (
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  className="max-w-full max-h-[70vh] object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='1'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="text-gray-500">No Image/Video</div>
              )}
              
              {/* Navigation */}
              {filteredEvents.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            <div className="md:w-1/3 p-6 flex flex-col justify-center bg-background">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full w-fit mb-4">
                {selectedEvent.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground-bold mb-4">{selectedEvent.title}</h3>
              <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                {selectedEvent.date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <span>{selectedEvent.date}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
              </div>
              <p className="text-foreground text-sm leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
