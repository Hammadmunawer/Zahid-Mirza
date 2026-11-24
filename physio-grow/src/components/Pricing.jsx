import { useState, useMemo } from 'react';
import {
  Stethoscope,
  Activity,
  HeartPulse,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  Search,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  Zap,
  Layers,
  Award,
} from 'lucide-react';
import { DOCTOR_INFO, getWhatsAppUrl } from '../constants';

const fmt = (n) => new Intl.NumberFormat('en-PK').format(n);

const CATEGORIES = [
  { id: 'all', label: 'All Services (24)' },
  { id: 'consult', label: 'Consultations' },
  { id: 'therapy', label: 'Advanced Therapies' },
  { id: 'manual', label: 'Manual Therapy' },
  { id: 'wellness', label: 'Wellness & Rehab' },
];

const INDIVIDUAL_SERVICES = [
  // Consultations & Assessments
  {
    id: 1,
    name: 'Physiotherapy Consultation',
    category: 'consult',
    categoryLabel: 'Consultation',
    price: 3000,
    unit: 'per session',
    desc: 'Comprehensive clinical assessment, diagnosis & treatment by qualified physiotherapist.',
    icon: Stethoscope,
  },
  {
    id: 2,
    name: 'Chiropractic Adjustment',
    category: 'consult',
    categoryLabel: 'Spine & Joint',
    price: 5000,
    unit: 'per session',
    desc: 'Specialized spinal manipulation and musculoskeletal alignment therapy.',
    icon: Activity,
  },
  {
    id: 3,
    name: 'Sports Injury Checkup',
    category: 'consult',
    categoryLabel: 'Sports Medicine',
    price: 3500,
    unit: 'per checkup',
    desc: 'Detailed biomechanical evaluation of athletic injuries, ligaments & joints.',
    icon: HeartPulse,
  },
  {
    id: 4,
    name: 'Women Health Checkup',
    category: 'consult',
    categoryLabel: "Women's Health",
    price: 3000,
    unit: 'per checkup',
    desc: 'Specialized physical evaluation for postural strain, pregnancy & musculoskeletal health.',
    icon: ShieldCheck,
  },
  {
    id: 5,
    name: 'Pelvic Floor Checkup',
    category: 'consult',
    categoryLabel: 'Pelvic Health',
    price: 3000,
    unit: 'per checkup',
    desc: 'Confidential assessment of pelvic floor muscles, core stability and rehabilitation.',
    icon: Activity,
  },
  {
    id: 6,
    name: 'Kids Assessment',
    category: 'consult',
    categoryLabel: 'Pediatric Care',
    price: 4000,
    unit: 'per assessment',
    desc: 'Pediatric physical evaluation for posture, gait, developmental delay & growing pains.',
    icon: Sparkles,
  },

  // Advanced Therapies & Needling
  {
    id: 7,
    name: 'Dry Needling Therapy',
    category: 'therapy',
    categoryLabel: 'Advanced Needling',
    price: 10000,
    unit: 'per session',
    desc: 'Targeted myofascial trigger point release using sterile acupuncture-grade needles.',
    icon: Zap,
  },
  {
    id: 8,
    name: 'Cupping Therapy (Wet / Hijama)',
    category: 'therapy',
    categoryLabel: 'Clinical Cupping',
    price: 10000,
    unit: 'per session',
    desc: 'Sterile medicinal wet cupping for deep tissue detoxification, circulation & pain relief.',
    icon: HeartPulse,
  },
  {
    id: 9,
    name: 'Dry Cupping – Spine',
    category: 'therapy',
    categoryLabel: 'Spinal Therapy',
    price: 3000,
    unit: 'per session',
    desc: 'Negative pressure myofascial decompression across the cervical, thoracic & lumbar spine.',
    icon: Layers,
  },
  {
    id: 10,
    name: 'Dry Cupping – Lower Limb',
    category: 'therapy',
    categoryLabel: 'Leg & Knee Care',
    price: 3000,
    unit: 'per session',
    desc: 'Targeted vacuum therapy for quads, hamstrings, IT-band, calf and knee recovery.',
    icon: Layers,
  },
  {
    id: 11,
    name: 'Dry Cupping – Upper Limb',
    category: 'therapy',
    categoryLabel: 'Shoulder & Arm',
    price: 3000,
    unit: 'per session',
    desc: 'Myofascial cupping decompression for rotator cuff, biceps, elbow and neck strain.',
    icon: Layers,
  },
  {
    id: 12,
    name: 'Trigger Point Release Therapy',
    category: 'therapy',
    categoryLabel: 'Pain Relief',
    price: 3000,
    unit: 'per session',
    desc: 'Ischemic compression and manual deactivation of painful hypersensitive muscle knots.',
    icon: Activity,
  },
  {
    id: 13,
    name: 'Electrotherapy Session',
    category: 'therapy',
    categoryLabel: 'Electro-Modalities',
    price: 1500,
    unit: 'per session',
    desc: 'TENS, IFT, or ultrasound modalities for acute swelling, nerve stimulation & pain control.',
    icon: Zap,
  },
  {
    id: 14,
    name: 'Kinesiology Taping (Add-on)',
    category: 'therapy',
    categoryLabel: 'Support Add-on',
    price: 3000,
    unit: 'per application',
    desc: 'Elastic therapeutic tape application for joint stability, edema reduction & muscle support.',
    icon: ShieldCheck,
  },

  // Manual Therapy & Body Work
  {
    id: 15,
    name: 'Soft Tissue – Complete Body',
    category: 'manual',
    categoryLabel: 'Full Body Work',
    price: 10000,
    unit: 'per session',
    desc: 'Full-body clinical myofascial release, deep tissue therapy and muscular mobilization.',
    icon: Activity,
  },
  {
    id: 16,
    name: 'Soft Tissue – Lower Body',
    category: 'manual',
    categoryLabel: 'Lower Body Work',
    price: 6000,
    unit: 'per session',
    desc: 'Deep soft tissue mobilization for lower back, glutes, quads, hamstrings and calves.',
    icon: Activity,
  },
  {
    id: 17,
    name: 'Stretching – Complete Body',
    category: 'manual',
    categoryLabel: 'Assisted Stretch',
    price: 5000,
    unit: 'per session',
    desc: 'Therapist-assisted PNF full-body stretching for maximum joint flexibility and mobility.',
    icon: Sparkles,
  },
  {
    id: 18,
    name: 'Stretching – Lower Body',
    category: 'manual',
    categoryLabel: 'Assisted Stretch',
    price: 2000,
    unit: 'per session',
    desc: 'Targeted passive and active-assisted stretching for hip flexors, hamstrings & pelvis.',
    icon: Sparkles,
  },
  {
    id: 19,
    name: 'Stretching – Upper Body',
    category: 'manual',
    categoryLabel: 'Assisted Stretch',
    price: 2000,
    unit: 'per session',
    desc: 'Assisted stretching for cervical spine, shoulders, chest openers and thoracic mobility.',
    icon: Sparkles,
  },

  // Wellness & Specialized Rehab
  {
    id: 20,
    name: 'Home Physiotherapy Visit',
    category: 'wellness',
    categoryLabel: 'Doorstep Care',
    price: 5000,
    unit: 'per visit',
    desc: 'Professional physiotherapist visits your home with full equipment for elderly or post-op care.',
    icon: Stethoscope,
  },
  {
    id: 21,
    name: 'Stroke Rehab Plan (Package)',
    category: 'wellness',
    categoryLabel: 'Neurological Plan',
    price: 40000,
    unit: 'per plan',
    desc: 'Intensive neurological physical therapy for gait re-education, limb function & neuroplasticity.',
    icon: HeartPulse,
  },
  {
    id: 22,
    name: 'Health & Wellness Plan',
    category: 'wellness',
    categoryLabel: 'Preventive Plan',
    price: 10000,
    unit: 'per plan',
    desc: 'Holistic clinical roadmap combining posture correction, mobility workouts & lifestyle guidance.',
    icon: ShieldCheck,
  },
  {
    id: 23,
    name: 'Fitness Diet Plan (1 Month)',
    category: 'wellness',
    categoryLabel: 'Clinical Nutrition',
    price: 5000,
    unit: '1 month plan',
    desc: 'Personalized anti-inflammatory meal blueprint for joint recovery, muscle build & fat loss.',
    icon: Activity,
  },
  {
    id: 24,
    name: 'Fitness Diet Plan (3 Months)',
    category: 'wellness',
    categoryLabel: 'Clinical Nutrition',
    price: 10000,
    unit: '3 months plan',
    desc: 'Long-term nutritional coaching with fortnightly follow-ups, recipe guide & body composition tracking.',
    icon: Activity,
  },
];

const PACKAGES = [
  {
    id: 'monthly',
    name: 'Physiotherapy Monthly Package',
    badge: 'Most Popular',
    highlight: false,
    price: 50000,
    duration: '30 Days Comprehensive Care',
    subtitle: 'Ideal for chronic pain, frozen shoulder, sciatica & progressive recovery.',
    features: [
      'Unlimited physiotherapy sessions for 30 days',
      'Initial comprehensive biomechanical assessment',
      'Personalized manual therapy & exercise plan',
      'Weekly objective recovery & mobility re-evaluation',
      'Direct guidance from Dr. Zahid Mirza & senior team',
      'Custom home exercise program & posture coaching',
    ],
  },
  {
    id: 'back-pain',
    name: 'Low Back Pain Reversal Package',
    badge: 'Spine Protocol',
    highlight: false,
    price: 45000,
    duration: 'Targeted Spine Rehabilitation',
    subtitle: 'Proven root-cause treatment for herniated discs, sciatica & postural back pain.',
    features: [
      'Complete lumbar spine diagnostic assessment',
      'Targeted spinal decompression & manual therapy',
      'Core & deep stabilizer muscle progressive strengthening',
      'Ergonomic, sitting & lifting posture correction',
      'Long-term recurrence prevention protocol',
      'WhatsApp doctor support throughout treatment',
    ],
  },
  {
    id: 'joint-replacement',
    name: 'Post-Op Joint Replacement Package',
    badge: 'Post-Surgical',
    highlight: false,
    price: 50000,
    duration: 'Surgeon-Aligned Protocol',
    subtitle: 'Safe, structured physical therapy following total knee or hip replacement.',
    features: [
      'Evidence-based post-arthroplasty rehab phases',
      'Safe joint mobilization & surgical edema control',
      'Gait re-training & crutch-free walking restoration',
      'Quad, glute & hamstring progressive resistance training',
      'Scar tissue mobilization & flex/extension goals',
      'Home exercise chart provided for family caregivers',
    ],
  },
  {
    id: 'acl',
    name: 'Post-Op ACL Reconstruction Package',
    badge: 'Elite Sports Rehab',
    highlight: true,
    price: 80000,
    duration: 'Full Return-To-Sport Program',
    subtitle: 'Phased athletic rehabilitation to return athletes safely to competitive sports.',
    features: [
      'Phase 1 to Phase 4 standardized return-to-sport testing',
      'Kinetic chain & high-load quadriceps strengthening',
      'Proprioception, balance & neuromuscular retraining',
      'Agility, deceleration, cutting & plyometric drills',
      'Limb Symmetry Index (LSI) objective clearance',
      'Re-injury prevention & athletic performance enhancement',
    ],
  },
  {
    id: 'super-kids',
    name: "Super Kid's Therapy Package",
    badge: 'Pediatric Care',
    highlight: false,
    price: 30000,
    duration: 'Child-Centered Program',
    subtitle: 'Gentle, play-based physical rehabilitation tailored for growing children.',
    features: [
      'Pediatric posture, spinal alignment & gait checkup',
      'Flat feet, toe-walking & coordination treatment',
      'Child-friendly, comfortable & pain-free sessions',
      'Weekly parent progress counseling & reports',
      'School bag posture & active lifestyle training',
      'Certified pediatric rehabilitation specialist',
    ],
  },
  {
    id: 'home-package',
    name: 'Home Physiotherapy Service Package',
    badge: 'Doorstep Clinic',
    highlight: false,
    price: 80000,
    duration: 'Full Clinical Visits at Home',
    subtitle: 'Hospital-grade physical therapy delivered in the comfort of your home.',
    features: [
      'Dedicated qualified physiotherapist visits your home',
      'All portable therapy equipment & modalities provided',
      'Specialized geriatric, stroke & bedridden patient care',
      'Family caregiver training for safe transfers & lifting',
      'Flexible scheduling 6 days a week across Lahore',
      'Continuous progress logging shared with primary doctor',
    ],
  },
  {
    id: 'manual-series',
    name: 'Manual Therapy Series 2.0',
    badge: 'Hands-On Specialty',
    highlight: false,
    price: 20000,
    duration: 'Intensive Mobilization Block',
    subtitle: 'Hands-on joint mobilization and high-grade myofascial release for severe stiffness.',
    features: [
      'Spinal mobilization & chiropractic-style adjustments',
      'Myofascial trigger point deactivation & deep work',
      'Peripheral joint distraction (shoulder, hip, ankle)',
      'Instant range-of-motion improvement for stiff joints',
      'Neuro-muscular facilitation (PNF) techniques',
      'Includes dry cupping / taping add-on when indicated',
    ],
  },
];

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'services'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered services
  const filteredServices = useMemo(() => {
    return INDIVIDUAL_SERVICES.filter((s) => {
      const matchesCat = activeCategory === 'all' || s.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="pricing" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary-50/50 to-transparent pointer-events-none" />

      <div className="container-max relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 fade-up delay-100">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} />
            <span>Transparent Clinical Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-bold mb-4">
            Physiotherapy Services &amp; Packages in Lahore
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Clear, transparent fees with no hidden charges. All treatment sessions are conducted
            by qualified Doctors of Physical Therapy (DPT) at PhysioGrow Clinic &amp; Academy.
          </p>
        </div>

        {/* Main Tab Switcher (Packages vs Single Services) */}
        <div className="flex justify-center mb-10 fade-up delay-200">
          <div className="inline-flex p-1.5 bg-background-alt border border-border rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                activeTab === 'packages'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
              }`}
            >
              <Award size={18} />
              <span>Care Packages ({PACKAGES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                activeTab === 'services'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
              }`}
            >
              <Stethoscope size={18} />
              <span>Single Session Services ({INDIVIDUAL_SERVICES.length})</span>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            TAB 1: CARE PACKAGES (Professional Pricing Cards)
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'packages' && (
          <div className="fade-up delay-300">
            {/* Grid of Packages */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    pkg.highlight
                      ? 'bg-gradient-to-b from-primary-900 to-primary-950 text-white shadow-2xl ring-2 ring-primary scale-[1.02] lg:scale-[1.03]'
                      : 'bg-background border-2 border-border/80 hover:border-primary/50 shadow-sm hover:shadow-xl'
                  }`}
                >
                  {/* Highlight Ribbon / Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        pkg.highlight
                          ? 'bg-white/20 text-white backdrop-blur-sm'
                          : 'bg-primary-50 text-primary border border-primary-100'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        pkg.highlight ? 'text-primary-200' : 'text-muted-foreground'
                      }`}
                    >
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl font-bold leading-snug mb-2 ${
                        pkg.highlight ? 'text-white' : 'text-foreground-bold'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 min-h-[38px] ${
                        pkg.highlight ? 'text-primary-100/90' : 'text-muted-foreground'
                      }`}
                    >
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div
                    className={`py-5 my-2 border-y ${
                      pkg.highlight ? 'border-white/15' : 'border-border/60'
                    }`}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          pkg.highlight ? 'text-primary-200' : 'text-muted-foreground'
                        }`}
                      >
                        Fee
                      </span>
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                          pkg.highlight ? 'text-white' : 'text-primary'
                        }`}
                      >
                        Rs. {fmt(pkg.price)}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] mt-1 ${
                        pkg.highlight ? 'text-white/60' : 'text-muted-foreground'
                      }`}
                    >
                      All clinical sessions &amp; doctor supervision included
                    </p>
                  </div>

                  {/* Included Features List */}
                  <div className="my-6 flex-grow">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                        pkg.highlight ? 'text-primary-200' : 'text-foreground'
                      }`}
                    >
                      What's Included:
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2
                            size={16}
                            className={`flex-shrink-0 mt-0.5 ${
                              pkg.highlight ? 'text-emerald-300' : 'text-primary'
                            }`}
                          />
                          <span
                            className={
                              pkg.highlight ? 'text-white/90' : 'text-foreground/90'
                            }
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-2 space-y-2">
                    <a
                      href="#appointment"
                      className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                        pkg.highlight
                          ? 'bg-white text-primary hover:bg-primary-50 shadow-lg'
                          : 'bg-primary text-white hover:bg-primary/90 shadow'
                      }`}
                    >
                      <span>Book Package</span>
                      <ArrowRight size={16} />
                    </a>
                    <a
                      href={`https://wa.me/923086010520?text=Assalam-o-Alaikum%20Dr.%20Zahid,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                        pkg.name
                      )}%20(Rs.%20${fmt(pkg.price)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                        pkg.highlight
                          ? 'border-white/20 text-white/80 hover:bg-white/10'
                          : 'border-border text-muted-foreground hover:text-primary hover:bg-primary-50'
                      }`}
                    >
                      <PhoneCall size={13} />
                      <span>Inquire via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 2: INDIVIDUAL SERVICES (Clean, Professional Clinical Catalog)
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'services' && (
          <div className="fade-up delay-300">
            {/* Filter Bar & Search */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8 pb-4 border-b border-border">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-primary text-white shadow'
                        : 'bg-background-alt text-muted-foreground hover:text-foreground hover:bg-border/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative min-w-[260px]">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search service name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                />
              </div>
            </div>

            {/* Services Grid (2 Columns on Desktop) */}
            {filteredServices.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                {filteredServices.map((service) => {
                  const IconComponent = service.icon || Stethoscope;
                  return (
                    <div
                      key={service.id}
                      className="group bg-background border border-border/80 hover:border-primary/50 rounded-2xl p-5 sm:p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-md"
                    >
                      {/* Icon in clean clinical badge (NO EMOJIS) */}
                      <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <IconComponent size={22} />
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 bg-primary-50 rounded-md">
                            {service.categoryLabel}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-foreground-bold leading-snug mb-1 group-hover:text-primary transition-colors">
                          {service.name}
                        </h4>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                          {service.desc}
                        </p>

                        <div className="flex items-baseline justify-between pt-2 border-t border-border/50">
                          <div>
                            <span className="text-lg sm:text-xl font-bold text-primary">
                              Rs. {fmt(service.price)}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1.5 font-normal">
                              /{service.unit}
                            </span>
                          </div>

                          <a
                            href="#appointment"
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                          >
                            <span>Book</span>
                            <ArrowRight size={13} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-background-alt rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground text-sm">
                  No service matched your search "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-3 text-xs font-bold text-primary underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Clinical Trust & Transparency Footer */}
        <div className="mt-14 p-6 sm:p-8 bg-background-alt border border-border/80 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 fade-up delay-400">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-base sm:text-lg">
                PhysioGrow Clinical Guarantee
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 leading-relaxed">
                All procedures are carried out by DPT-qualified physical therapists. Consultation
                includes full movement assessment, pain diagnosis &amp; personalized home exercise guidance.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href="#appointment"
              className="btn-primary text-xs sm:text-sm py-3 px-6 text-center"
            >
              Book an Appointment
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs sm:text-sm py-3 px-6 text-center flex items-center justify-center gap-2"
            >
              <PhoneCall size={15} />
              <span>Ask via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
