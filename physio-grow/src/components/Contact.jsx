import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { DOCTOR_INFO, getWhatsAppUrl } from '../constants';

const Contact = () => {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!DOCTOR_INFO.googleMapsUrl || !mapRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Contact {DOCTOR_INFO.clinicName.split('&')[0].trim()}
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions or need to reach us? We are here to help you on your path to recovery.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground-bold mb-1">Clinic Address</h3>
                <p className="text-muted-foreground">{DOCTOR_INFO.clinicName}</p>
                <p className="text-muted-foreground">{DOCTOR_INFO.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground-bold mb-1">Phone</h3>
                <a
                  href={`tel:${DOCTOR_INFO.phone}`}
                  className="text-primary hover:text-primary-700 transition-colors"
                >
                  {DOCTOR_INFO.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-green-600" size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground-bold mb-1">WhatsApp</h3>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
                >
                  Chat with us on WhatsApp
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground-bold mb-1">Email</h3>
                <a
                  href={`mailto:${DOCTOR_INFO.email}`}
                  className="text-primary hover:text-primary-700 transition-colors"
                >
                  {DOCTOR_INFO.email}
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground-bold mb-1">Clinic Timings</h3>
                <p className="text-muted-foreground">{DOCTOR_INFO.clinicTimings}</p>
              </div>
            </div>
          </div>

          {/* Map - Lazy loaded */}
          <div ref={mapRef} className="rounded-2xl overflow-hidden shadow-lg border border-border">
            {DOCTOR_INFO.googleMapsUrl && showMap ? (
              <iframe
                src={DOCTOR_INFO.googleMapsUrl}
                width="100%"
                height="100%"
                style={{ minHeight: '400px', border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PhysioGrow Clinic Location"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 bg-background rounded-full mx-auto flex items-center justify-center shadow-md">
                    <MapPin className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{DOCTOR_INFO.clinicName}</h3>
                    <p className="text-muted-foreground mt-1">{DOCTOR_INFO.address}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Loading map...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

