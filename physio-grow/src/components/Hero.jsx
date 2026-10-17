import { ArrowRight, MessageCircle, Shield, Award, Clock } from 'lucide-react';
import { DOCTOR_INFO, getWhatsAppUrl } from '../constants';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />

      <div className="container-max relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-left delay-100">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <Shield size={16} />
              <span>Trusted Physiotherapy Care in Lahore</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground-bold leading-tight">
                {DOCTOR_INFO.name}
              </h1>
              <p className="text-lg sm:text-2xl text-primary font-semibold leading-snug">
                {DOCTOR_INFO.role} — {DOCTOR_INFO.clinicName}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                {DOCTOR_INFO.qualification}. Award-winning specialist recognized as the
                {' '}<span className="font-semibold text-foreground">"Best Physiotherapist in Pakistan"</span>.
                Offering top-rated <strong>physiotherapy in Lahore</strong> to help you recover, move better, and live pain-free through evidence-based treatment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#appointment"
                className="btn-primary flex items-center justify-center gap-2 text-base"
              >
                Book an Appointment
                <ArrowRight size={18} />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award size={20} className="text-primary" />
                <span className="text-sm font-medium">{DOCTOR_INFO.qualification}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={20} className="text-primary" />
                <span className="text-sm font-medium">{DOCTOR_INFO.experience}</span>
              </div>
            </div>
          </div>

          {/* Right - Image/Visual */}
          <div className="relative hidden lg:block fade-right delay-200">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-primary-50">
              <img 
                src="/assets/team/dr-zahid.jpg?v=3" 
                alt={DOCTOR_INFO.name} 
                className="w-full h-full object-cover"
                width="600"
                height="750"
                fetchpriority="high"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Award size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Best Physiotherapist</p>
                <p className="text-xs text-muted-foreground">{DOCTOR_INFO.clinicName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
