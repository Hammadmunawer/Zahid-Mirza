import { ClipboardList, BookOpen, Heart, SearchCheck, GraduationCap, TrendingUp, CheckCircle } from 'lucide-react';
import { WHY_CHOOSE_US } from '../constants';

const iconMap = {
  ClipboardList,
  BookOpen,
  Heart,
  SearchCheck,
  GraduationCap,
  TrendingUp,
  CheckCircle,
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="section-padding bg-background">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Why Choose PhysioGrow Clinic
          </h2>
          <p className="text-muted-foreground text-lg">
            We are committed to providing the highest quality physiotherapy care
            with a focus on your complete recovery and well-being.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = iconMap[item.icon] || CheckCircle;
            return (
              <div key={index} className="text-center space-y-4 p-6">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto">
                  <IconComponent className="text-primary" size={30} />
                </div>
                <h3 className="text-lg font-bold text-foreground-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
