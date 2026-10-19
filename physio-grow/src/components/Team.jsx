import { useState, useRef, useEffect } from 'react';
import { TEAM_DATA } from '../constants';
import { GraduationCap, Award, Sparkles, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

/* ───────── Team Card ───────── */
const TeamCard = ({ member, onViewProfile }) => {
  return (
    <div className="flex-shrink-0 w-72 sm:w-80">
      <div className="relative bg-background rounded-3xl overflow-hidden border-2 border-border shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
        {/* Image */}
        <div className="relative h-80 overflow-hidden flex-shrink-0">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              width="320"
              height="320"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                e.target.className = "w-full h-full p-8 object-contain opacity-50";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-50 text-muted-foreground">
              No Image
            </div>
          )}

          {/* Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Name + Designation */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-lg font-bold mb-0.5 drop-shadow-lg">{member.name}</h3>
            <p className="text-primary-200 font-medium text-xs drop-shadow-md">{member.designation}</p>
          </div>

          {/* Specialty badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-md">
              <Sparkles size={11} />
              {member.specialty}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-5 py-4 bg-background flex flex-col gap-3 flex-grow">
          <div className="flex items-start gap-2">
            <GraduationCap size={15} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground font-semibold leading-snug">{member.qualification}</p>
          </div>
          {member.experience && member.experience !== 'Not specified' && (
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                {member.experience} Experience
              </span>
            </div>
          )}
          <button
            onClick={() => onViewProfile(member)}
            className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-50 hover:bg-primary text-primary hover:text-white rounded-xl transition-all duration-300 font-semibold text-sm"
          >
            <Eye size={15} />
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────── Profile Modal ───────── */
const ProfileModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="md:w-2/5 h-[220px] sm:h-[260px] md:h-auto relative flex-shrink-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        <div className="md:w-3/5 p-5 sm:p-8 overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground-bold mb-1">{member.name}</h3>
          <p className="text-primary font-semibold text-sm mb-4">{member.designation}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full">
              <Sparkles size={12} />
              {member.specialty}
            </span>
            {member.experience && member.experience !== 'Not specified' && (
              <span className="inline-flex items-center px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                {member.experience}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-primary" />
            <p className="text-sm text-muted-foreground font-medium">{member.qualification}</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-foreground leading-relaxed">{member.bio}</p>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-primary font-semibold">
            <Award size={14} />
            <span>PhysioGrow Clinic &amp; Academy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────── Specialty Marquee ───────── */
const SpecialtyMarquee = () => {
  const items = [
    'Musculoskeletal Rehab', 'Sports Medicine', 'Spine Adjustment',
    'Dry Needling', 'Pain Management', 'Post-Surgical Recovery',
    'Manual Therapy', 'Exercise Therapy', 'Neurological Rehab',
    'Evidence-Based Care', 'DPT Qualified', 'MS Specialists',
  ];

  return (
    <div className="relative overflow-hidden w-full py-6 mb-10">
      <div className="absolute inset-y-0 left-0 w-16 sm:w-20 bg-gradient-to-r from-background-alt to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-20 bg-gradient-to-l from-background-alt to-transparent z-10" />
      <div className="marquee-track flex gap-4">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 text-primary text-sm font-medium rounded-full whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ───────── Main Team Section ───────── */
const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);

  const CARD_WIDTH = 320 + 24; // card width + gap

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
  };

  return (
    <section id="team" className="section-padding bg-background-alt overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 px-2">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Our Specialists</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground">
            Highly qualified physiotherapy professionals dedicated to your recovery and well-being.
          </p>
        </div>

        {/* Specialty Marquee */}
        <SpecialtyMarquee />

        {/* Slider Area */}
        <div className="relative">
          {/* Left fade */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background-alt to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          {/* Right fade */}
          <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background-alt to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Hide webkit scrollbar via inline style wrapper */}
            {TEAM_DATA.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onViewProfile={setSelectedMember}
              />
            ))}
          </div>
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous"
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-primary bg-primary text-white shadow-lg hover:bg-primary-700'
                : 'border-border text-muted-foreground opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {TEAM_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollRef.current?.scrollTo({ left: i * CARD_WIDTH, behavior: 'smooth' });
                }}
                aria-label={`Go to member ${i + 1}`}
                className="w-2 h-2 rounded-full bg-border hover:bg-primary transition-colors duration-200"
              />
            ))}
          </div>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Next"
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-primary bg-primary text-white shadow-lg hover:bg-primary-700'
                : 'border-border text-muted-foreground opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          Swipe or use arrows to explore our team
        </p>

        {/* Full Team Group Showcase Banner */}
        <div className="mt-12 relative rounded-3xl overflow-hidden shadow-2xl border border-border group">
          <div className="relative w-full bg-primary-950">
            <img
              src="/assets/team/physiogrow-team-group.jpg?v=2"
              alt="PhysioGrow Clinic & Academy Clinical Team"
              className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-primary text-white text-xs font-bold rounded-full w-fit mb-2 shadow-lg">
                PhysioGrow Family
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 drop-shadow-md">
                One Team, One Mission: Restoring Your Movement
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed drop-shadow">
                Our clinical team at PhysioGrow Clinic &amp; Academy combines specialized expertise in sports medicine, spine adjustment, musculoskeletal rehab, and manual therapy to deliver outstanding patient outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
};

export default Team;
