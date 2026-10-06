import { useState } from 'react';
import { TEAM_DATA } from '../constants';
import { GraduationCap, Award, Sparkles, X, Eye } from 'lucide-react';

const TeamCard = ({ member, onViewProfile }) => {
  return (
    <div className="w-full max-w-md mx-auto h-full">
      <div className="relative bg-background rounded-3xl overflow-hidden border-2 border-border transition-all duration-500 shadow-lg hover:shadow-2xl h-full flex flex-col">
        {/* Image + Gradient Overlay */}
        <div className="relative h-[320px] sm:h-[360px] overflow-hidden flex-shrink-0">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover object-top"
              loading="lazy"
              width="400"
              height="533"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                e.target.className = "w-full h-full p-8 object-contain opacity-50";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-50 text-muted-foreground">
              No Image
            </div>
          )}
          
          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Name + Designation overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{member.name}</h3>
            <p className="text-primary-200 font-medium text-sm drop-shadow-md">{member.designation}</p>
          </div>

          {/* Specialty Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-md">
              <Sparkles size={12} />
              {member.specialty}
            </span>
          </div>
        </div>

        {/* Info Bar */}
        <div className="px-6 py-4 bg-background flex-grow flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={16} className="text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-semibold">{member.qualification}</p>
          </div>
          {member.experience && (
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                {member.experience} Experience
              </span>
            </div>
          )}
          
          {/* View Profile Button */}
          <button
            onClick={() => onViewProfile(member)}
            className="mt-auto w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary-50 hover:bg-primary text-primary hover:text-white rounded-xl transition-all duration-300 font-semibold text-sm"
          >
            <Eye size={16} />
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

/* Profile Modal */
const ProfileModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button 
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Photo */}
        <div className="md:w-2/5 h-[250px] md:h-auto relative flex-shrink-0">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* Details */}
        <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-foreground-bold mb-1">{member.name}</h3>
          <p className="text-primary font-semibold text-sm mb-4">{member.designation}</p>
          
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full">
              <Sparkles size={12} />
              {member.specialty}
            </span>
            {member.experience && (
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
            <span>PhysioGrow Clinic & Academy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Scrolling Marquee for specialties */
const SpecialtyMarquee = () => {
  const items = [
    'Musculoskeletal Rehab', 'Sports Medicine', 'Spine Adjustment', 
    'Dry Needling', 'Pain Management', 'Post-Surgical Recovery',
    'Manual Therapy', 'Exercise Therapy', 'Neurological Rehab',
    'Evidence-Based Care', 'DPT Qualified', 'MS Specialists',
  ];

  return (
    <div className="relative overflow-hidden py-6 mb-12">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background-alt to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background-alt to-transparent z-10" />
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

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="team" className="section-padding bg-background-alt">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Our Specialists</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground">
            Highly qualified physiotherapy professionals dedicated to your recovery and well-being.
          </p>
        </div>

        {/* Specialty Marquee */}
        <SpecialtyMarquee />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {TEAM_DATA.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              onViewProfile={setSelectedMember}
            />
          ))}
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
