import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load below-fold components for faster initial load
const AboutDoctor = lazy(() => import('./components/AboutDoctor'));
const Services = lazy(() => import('./components/Services'));
const Team = lazy(() => import('./components/Team'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Events = lazy(() => import('./components/Events'));
const Reviews = lazy(() => import('./components/Reviews'));
const AppointmentForm = lazy(() => import('./components/AppointmentForm'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const observeElements = () => {
      const hiddenElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in');
      hiddenElements.forEach((el) => observer.observe(el));
    };

    // Run once on mount, and then set a timeout to catch lazy-loaded elements
    observeElements();
    const timeout = setTimeout(observeElements, 1000);
    const interval = setInterval(observeElements, 3000); // periodically catch dynamic elements

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Suspense fallback={<div className="h-20" />}>
          <AboutDoctor />
          <Services />
          <Team />
          <WhyChooseUs />
          <Events />
          <Reviews />
          <AppointmentForm />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <WhatsAppButton />
      </Suspense>
    </div>
  );
}

export default App;
