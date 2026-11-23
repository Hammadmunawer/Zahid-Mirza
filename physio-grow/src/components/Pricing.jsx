import { useState } from 'react';
import { CheckCircle, Star, Zap } from 'lucide-react';

const INDIVIDUAL_SERVICES = [
  { name: 'Physiotherapy', price: 3000 },
  { name: 'Chiropractic', price: 5000 },
  { name: 'Dry Needling', price: 10000 },
  { name: 'Cupping (Wet)', price: 10000 },
  { name: 'Home Physiotherapy', price: 5000 },
  { name: 'Sports Injury Checkup', price: 3500 },
  { name: 'Women Health Checkup', price: 3000 },
  { name: 'Pelvic Floor Checkup', price: 3000 },
  { name: 'Dry Cupping – Spine', price: 3000 },
  { name: 'Dry Cupping – Lower Limb', price: 3000 },
  { name: 'Dry Cupping – Upper Limb', price: 3000 },
  { name: 'Kinesiology Taping (Add-on)', price: 3000 },
  { name: 'Soft Tissue – Lower Body', price: 6000 },
  { name: 'Soft Tissue – Complete Body', price: 10000 },
  { name: 'Stretching – Lower Body', price: 2000 },
  { name: 'Stretching – Upper Body', price: 2000 },
  { name: 'Stretching – Complete Body', price: 5000 },
  { name: 'Trigger Point Release Therapy', price: 3000 },
  { name: 'Electrotherapy', price: 1500 },
  { name: 'Health & Wellness Plan', price: 10000 },
  { name: 'Fitness Diet Plan (1 Month)', price: 5000 },
  { name: 'Fitness Diet Plan (3 Months)', price: 10000 },
  { name: 'Stroke Rehab Plan (Package)', price: 40000 },
  { name: 'Kids Assessment', price: 4000 },
];

const PACKAGES = [
  {
    name: 'Physiotherapy Monthly Package',
    price: 50000,
    highlight: false,
    features: ['Full month unlimited sessions', 'Personalized treatment plan', 'Progress tracking', 'Exercise program'],
  },
  {
    name: 'Low Back Pain Reversal Package',
    price: 45000,
    highlight: false,
    features: ['Targeted lumbar rehabilitation', 'Manual therapy sessions', 'Home exercise plan', 'Postural correction'],
  },
  {
    name: 'Post-Op Joint Replacement Package',
    price: 50000,
    highlight: false,
    features: ['Complete post-surgical rehab', 'Strength restoration', 'Gait training', 'Pain management'],
  },
  {
    name: 'Post-Op ACL Reconstruction Package',
    price: 80000,
    highlight: true,
    features: ['Sports-specific rehab protocol', 'Neuromuscular training', 'Return-to-sport testing', 'Full recovery support'],
  },
  {
    name: "Super Kid's Therapy",
    price: 30000,
    highlight: false,
    features: ['Paediatric assessment', 'Child-friendly sessions', 'Parent guidance program', 'Progress reporting'],
  },
  {
    name: 'Home Physiotherapy Service Package',
    price: 80000,
    highlight: false,
    features: ['Doorstep therapy visits', 'Equipment provided', 'Family caregiver training', 'Flexible scheduling'],
  },
  {
    name: 'Manual Therapy Series 2.0',
    price: 20000,
    highlight: false,
    features: ['Advanced manual techniques', 'Joint mobilization', 'Soft tissue work', 'Customized protocol'],
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat('en-PK').format(price);

const Pricing = () => {
  const [tab, setTab] = useState('services');

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 fade-up delay-100">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Services &amp; Package Fees
          </h2>
          <p className="text-muted-foreground text-lg">
            Clear, upfront pricing for all our physiotherapy services and wellness packages.
            All fees are in Pakistani Rupees (PKR).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-background-alt border border-border rounded-xl p-1 gap-1">
            <button
              onClick={() => setTab('services')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === 'services'
                  ? 'bg-primary text-white shadow'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Individual Services
            </button>
            <button
              onClick={() => setTab('packages')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === 'packages'
                  ? 'bg-primary text-white shadow'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Packages
            </button>
          </div>
        </div>

        {/* Individual Services */}
        {tab === 'services' && (
          <div className="max-w-4xl mx-auto fade-up delay-200">
            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1fr_auto] bg-primary-50 px-6 py-3 border-b border-border">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Service</span>
                <span className="text-xs font-bold text-primary uppercase tracking-wider text-right">Fee (PKR)</span>
              </div>
              {INDIVIDUAL_SERVICES.map((s, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto] items-center px-6 py-4 border-b border-border/50 last:border-0 transition-colors hover:bg-primary-50/40 ${
                    i % 2 === 0 ? '' : 'bg-background-alt/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium text-sm sm:text-base">{s.name}</span>
                  </div>
                  <span className="text-primary font-bold text-sm sm:text-base whitespace-nowrap ml-4">
                    Rs. {formatPrice(s.price)}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-xs mt-4">
              * Prices may vary based on condition severity. Contact us for a personalized quote.
            </p>
          </div>
        )}

        {/* Packages */}
        {tab === 'packages' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto fade-up delay-200">
            {PACKAGES.map((pkg, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-all hover:shadow-lg ${
                  pkg.highlight
                    ? 'border-primary bg-primary text-white shadow-xl scale-[1.02]'
                    : 'border-border bg-background'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                      <Star size={11} fill="currentColor" /> Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className={`font-bold text-lg leading-snug mb-1 ${pkg.highlight ? 'text-white' : 'text-foreground-bold'}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-3xl font-extrabold ${pkg.highlight ? 'text-white' : 'text-primary'}`}>
                      Rs. {formatPrice(pkg.price)}
                    </span>
                    <span className={`text-xs ${pkg.highlight ? 'text-primary-100' : 'text-muted-foreground'}`}>/package</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 flex-grow">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Zap
                        size={14}
                        className={`flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-yellow-300' : 'text-primary'}`}
                      />
                      <span className={pkg.highlight ? 'text-white/90' : 'text-muted-foreground'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#appointment"
                  className={`block text-center py-2.5 px-4 rounded-xl font-semibold text-sm transition-all mt-2 ${
                    pkg.highlight
                      ? 'bg-white text-primary hover:bg-primary-50'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  Book This Package
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
