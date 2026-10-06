import { Star } from 'lucide-react';

const Reviews = () => {
  return (
    <section id="reviews" className="section-padding bg-background-alt">
      <div className="container-max">
        <div className="max-w-md mx-auto text-center space-y-8">
          {/* Google Stars */}
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={28} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold">
            Give Your Review
          </h2>

          {/* QR Code */}
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-block mx-auto border border-border">
            <img
              src="/assets/qr-code.jpg"
              alt="Scan to leave a Google Review"
              className="w-56 h-56 mx-auto"
              loading="lazy"
              width="224"
              height="224"
            />
          </div>

          <p className="text-muted-foreground text-sm">
            Scan the QR code to leave us a review on Google
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
