import { useRef } from 'react';
import { CheckCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const INDIVIDUAL_SERVICES = [
  { name: 'Physiotherapy', price: 3000, emoji: '🦴' },
  { name: 'Chiropractic', price: 5000, emoji: '🫀' },
  { name: 'Dry Needling', price: 10000, emoji: '💉' },
  { name: 'Cupping (Wet)', price: 10000, emoji: '🩸' },
  { name: 'Home Physiotherapy', price: 5000, emoji: '🏠' },
  { name: 'Sports Injury Checkup', price: 3500, emoji: '⚽' },
  { name: 'Women Health Checkup', price: 3000, emoji: '👩‍⚕️' },
  { name: 'Pelvic Floor Checkup', price: 3000, emoji: '🏥' },
  { name: 'Dry Cupping – Spine', price: 3000, emoji: '🧠' },
  { name: 'Dry Cupping – Lower Limb', price: 3000, emoji: '🦵' },
  { name: 'Dry Cupping – Upper Limb', price: 3000, emoji: '💪' },
  { name: 'Kinesiology Taping (Add-on)', price: 3000, emoji: '🩹' },
  { name: 'Soft Tissue – Lower Body', price: 6000, emoji: '🦶' },
  { name: 'Soft Tissue – Complete Body', price: 10000, emoji: '🧘' },
  { name: 'Stretching – Lower Body', price: 2000, emoji: '🤸' },
  { name: 'Stretching – Upper Body', price: 2000, emoji: '🙆' },
  { name: 'Stretching – Complete Body', price: 5000, emoji: '🧗' },
  { name: 'Trigger Point Release Therapy', price: 3000, emoji: '🎯' },
  { name: 'Electrotherapy', price: 1500, emoji: '⚡' },
  { name: 'Health & Wellness Plan', price: 10000, emoji: '🌿' },
  { name: 'Fitness Diet Plan (1 Month)', price: 5000, emoji: '🥗' },
  { name: 'Fitness Diet Plan (3 Months)', price: 10000, emoji: '🥦' },
  { name: 'Stroke Rehab Plan (Package)', price: 40000, emoji: '🧬' },
  { name: 'Kids Assessment', price: 4000, emoji: '👶' },
];

const PACKAGES = [
  {
    name: 'Physiotherapy Monthly Package',
    price: 50000,
    highlight: false,
    tag: 'Most Booked',
    features: ['Full month unlimited sessions', 'Personalized treatment plan', 'Progress tracking', 'Exercise program'],
  },
  {
    name: 'Low Back Pain Reversal',
    price: 45000,
    highlight: false,
    tag: null,
    features: ['Targeted lumbar rehabilitation', 'Manual therapy sessions', 'Home exercise plan', 'Postural correction'],
  },
  {
    name: 'Post-Op Joint Replacement',
    price: 50000,
    highlight: false,
    tag: null,
    features: ['Complete post-surgical rehab', 'Strength restoration', 'Gait training', 'Pain management'],
  },
  {
    name: 'Post-Op ACL Reconstruction',
    price: 80000,
    highlight: true,
    tag: 'Premium',
    features: ['Sports-specific rehab protocol', 'Neuromuscular training', 'Return-to-sport testing', 'Full recovery support'],
  },
  {
    name: "Super Kid's Therapy",
    price: 30000,
    highlight: false,
    tag: null,
    features: ['Paediatric assessment', 'Child-friendly sessions', 'Parent guidance program', 'Progress reporting'],
  },
  {
    name: 'Home Physiotherapy Package',
    price: 80000,
    highlight: false,
    tag: null,
    features: ['Doorstep therapy visits', 'Equipment provided', 'Caregiver training', 'Flexible scheduling'],
  },
  {
    name: 'Manual Therapy Series 2.0',
    price: 20000,
    highlight: false,
    tag: null,
    features: ['Advanced manual techniques', 'Joint mobilization', 'Soft tissue work', 'Customized protocol'],
  },
];

const fmt = (n) => new Intl.NumberFormat('en-PK').format(n);

// Reusable scroll strip with overlapping arrows
const ScrollStrip = ({ label, heading, children, scrollRef, onScroll }) => (
  <div className="mb-16">
    <div className="mb-6 text-center sm:text-left">
      <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-2xl sm:text-3xl font-bold text-foreground-bold">{heading}</h3>
    </div>

    {/* Relative wrapper so arrows are inside the visible area */}
    <div className="relative">
      {/* LEFT arrow — overlaps between screen edge and first card */}
      <button
        onClick={() => onScroll(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 px-10 scroll-smooth snap-x snap-mandatory touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* RIGHT arrow — overlaps between last card and screen edge */}
      <button
        onClick={() => onScroll(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm border border-border rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
);

const Pricing = () => {
  const servRef = useRef(null);
  const pkgRef  = useRef(null);

  const scrollServ = (dir) => servRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  const scrollPkg  = (dir) => pkgRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  return (
    <section id="pricing" className="section-padding bg-background overflow-hidden">
      <div className="container-max">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 fade-up delay-100">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Physiotherapy Services &amp; Package Fees in Lahore
          </h2>
          <p className="text-muted-foreground text-lg">
            Clear, upfront fees for all physiotherapy services at PhysioGrow Clinic, Lahore.
            No hidden charges — all prices in PKR.
          </p>
        </div>

        {/* ── SERVICES FIRST (best for Pakistani local audience) ── */}
        <div className="fade-up delay-200">
          <ScrollStrip
            label="Single Session Fees"
            heading="Individual Physiotherapy Services"
            scrollRef={servRef}
            onScroll={scrollServ}
          >
            {INDIVIDUAL_SERVICES.map((s, i) => (
              <div
                key={i}
                className="snap-start flex-shrink-0 w-48 bg-background border border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="text-3xl">{s.emoji}</div>
                <p className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors min-h-[40px]">
                  {s.name}
                </p>
                <div className="mt-auto">
                  <span className="text-primary font-bold text-lg">Rs.&nbsp;{fmt(s.price)}</span>
                  <p className="text-muted-foreground text-xs mt-0.5">per session</p>
                </div>
              </div>
            ))}
          </ScrollStrip>
        </div>

        {/* ── PACKAGES SECOND ── */}
        <div className="fade-up delay-300">
          <ScrollStrip
            label="Complete Treatment Plans"
            heading="Physiotherapy Packages in Lahore"
            scrollRef={pkgRef}
            onScroll={scrollPkg}
          >
            {PACKAGES.map((pkg, i) => (
              <div
                key={i}
                className={`snap-start flex-shrink-0 w-64 sm:w-72 rounded-2xl border p-6 flex flex-col gap-4 transition-all hover:shadow-lg ${
                  pkg.highlight
                    ? 'bg-primary border-primary text-white shadow-xl'
                    : 'bg-background border-border'
                }`}
              >
                {pkg.tag && (
                  <span className={`self-start text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    pkg.highlight ? 'bg-yellow-400 text-yellow-900' : 'bg-primary-50 text-primary'
                  }`}>
                    <Star size={10} fill="currentColor" /> {pkg.tag}
                  </span>
                )}

                <div>
                  <h4 className={`font-bold text-base leading-snug ${pkg.highlight ? 'text-white' : 'text-foreground-bold'}`}>
                    {pkg.name}
                  </h4>
                  <p className={`text-2xl font-extrabold mt-2 ${pkg.highlight ? 'text-white' : 'text-primary'}`}>
                    Rs.&nbsp;{fmt(pkg.price)}
                  </p>
                </div>

                <ul className="flex flex-col gap-1.5 flex-grow">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs">
                      <CheckCircle
                        size={13}
                        className={`flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-yellow-300' : 'text-primary'}`}
                      />
                      <span className={pkg.highlight ? 'text-white/90' : 'text-muted-foreground'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#appointment"
                  className={`block text-center py-2 px-4 rounded-xl font-semibold text-sm transition-all mt-1 ${
                    pkg.highlight
                      ? 'bg-white text-primary hover:bg-primary-50'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  Book Now
                </a>
              </div>
            ))}
          </ScrollStrip>
        </div>

        <p className="text-center text-muted-foreground text-xs -mt-8">
          * Prices may vary based on condition severity. Contact us for a personalized consultation.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
