import { Bone, Dumbbell, HeartPulse, Stethoscope, Brain, Activity } from 'lucide-react';

const iconMap = {
  Bone,
  Dumbbell,
  HeartPulse,
  Stethoscope,
  Brain,
  Activity,
};

const ServiceCard = ({ title, description, icon }) => {
  const IconComponent = iconMap[icon] || Activity;

  return (
    <div className="card group hover:border-primary-100 border border-transparent">
      <div className="w-14 h-14 bg-primary-50 group-hover:bg-primary-100 rounded-xl flex items-center justify-center transition-colors mb-5">
        <IconComponent className="text-primary" size={28} />
      </div>
      <h3 className="text-xl font-bold text-foreground-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
