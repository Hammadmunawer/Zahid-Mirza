import { GraduationCap, Clock, MapPin, Building2, Award, Star } from 'lucide-react';
import { DOCTOR_INFO } from '../constants';

const AboutDoctor = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image/Visual */}
          <div className="relative fade-right delay-100">
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-primary-50 shadow-lg">
              <img 
                src="/assets/team/dr-zahid.jpg?v=3" 
                alt={DOCTOR_INFO.name} 
                className="w-full h-full object-cover"
                loading="lazy"
                width="500"
                height="500"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-4 right-4 sm:right-0 bg-primary text-white rounded-2xl p-4 shadow-lg zoom-in delay-400">
              <p className="text-3xl font-bold">4+</p>
              <p className="text-sm">Years Experience</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6 fade-left delay-200">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">About the Doctor</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold">
                Meet {DOCTOR_INFO.name}
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              <span className="font-semibold text-foreground">{DOCTOR_INFO.name}</span> is a trusted 
              physiotherapist providing the best <strong>physiotherapy in Lahore</strong>. Operating at <span className="font-semibold text-foreground">{DOCTOR_INFO.clinicName}</span>, 
              we specialize in the treatment of{' '}
              <span className="font-semibold text-foreground">back pain, neck pain, knee pain, sports injuries, 
              frozen shoulder, sciatica, arthritis, post-surgical rehabilitation, stroke rehabilitation, 
              and posture correction</span>.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our patient-focused approach combines detailed assessment, personalized treatment plans, 
              manual therapy, exercise therapy, and modern rehabilitation techniques to help you recover 
              faster and move pain-free. Whether you're recovering from an injury or managing chronic pain, 
              PhysioGrow Clinic is committed to restoring your mobility, strength, and quality of life 
              in a professional and caring environment.
            </p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                <GraduationCap className="text-primary flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Qualification</p>
                  <p className="text-muted-foreground text-sm">{DOCTOR_INFO.qualification}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                <Award className="text-primary flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Recognition</p>
                  <p className="text-muted-foreground text-sm">Best Physiotherapist in Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                <Star className="text-primary flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Role</p>
                  <p className="text-muted-foreground text-sm">{DOCTOR_INFO.role}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                <Clock className="text-primary flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Experience</p>
                  <p className="text-muted-foreground text-sm">{DOCTOR_INFO.experience}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                <Building2 className="text-primary flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Clinic</p>
                  <p className="text-muted-foreground text-sm">{DOCTOR_INFO.clinicName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                <MapPin className="text-primary flex-shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Location</p>
                  <p className="text-muted-foreground text-sm">{DOCTOR_INFO.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;
