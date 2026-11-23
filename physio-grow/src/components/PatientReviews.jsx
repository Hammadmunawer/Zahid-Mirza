import { Star, Quote } from 'lucide-react';

// ✏️ EDIT THESE 3 REVIEWS — Replace name, role, rating, text and avatar initials
const REVIEWS = [
  {
    name: 'Ahmed Raza',
    role: 'Patient – Back Pain Recovery',
    rating: 5,
    text: 'Dr. Zahid Mirza treated my chronic lower back pain that had been bothering me for over two years. After just 8 sessions at PhysioGrow Clinic, I was completely pain-free. His approach is professional, evidence-based, and genuinely patient-focused. Highly recommended!',
    initials: 'AR',
    color: 'bg-teal-500',
  },
  {
    name: 'Fatima Malik',
    role: 'Patient – Sports Injury Rehab',
    rating: 5,
    text: 'I had an ACL injury from football and was worried I would never play again. The team at PhysioGrow put together a detailed rehab plan and guided me every step of the way. I am back on the field stronger than before. Exceptional care and facilities!',
    initials: 'FM',
    color: 'bg-cyan-500',
  },
  {
    name: 'Tariq Hussain',
    role: 'Patient – Neck Pain & Cervical Spondylosis',
    rating: 5,
    text: 'Dr. Rumman Mehar treated my severe cervical spondylosis with amazing results. The spine adjustment techniques she used gave me relief in just a few sessions. The whole clinic staff is welcoming and caring. Best physiotherapy clinic in Lahore, without doubt.',
    initials: 'TH',
    color: 'bg-indigo-500',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={16}
        className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section id="reviews" className="section-padding bg-background-alt">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 fade-up delay-100">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Patient Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real experiences from real patients who recovered at PhysioGrow Clinic &amp; Academy.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className={`relative bg-background rounded-2xl border border-border p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow fade-up delay-${(i + 1) * 100}`}
            >
              {/* Quote Icon */}
              <div className="absolute top-5 right-5 text-primary/10">
                <Quote size={48} />
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} />

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow relative z-10">
                "{review.text}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${review.color}`}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 fade-up delay-400">
          <p className="text-muted-foreground text-sm mb-4">
            Experienced great results at PhysioGrow? We'd love to hear from you.
          </p>
          <a
            href="https://wa.me/923086010520"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Share Your Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
