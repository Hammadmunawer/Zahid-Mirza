import ServiceCard from './ServiceCard';
import { SERVICES } from '../constants';

const Services = () => {
  return (
    <section id="services" className="section-padding bg-background-alt">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 fade-up delay-100">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Physiotherapy Services We Offer
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive physiotherapy solutions tailored to your specific needs,
            designed to help you recover and live a healthier, pain-free life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`fade-up delay-${(index % 3 + 1) * 100}`}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
