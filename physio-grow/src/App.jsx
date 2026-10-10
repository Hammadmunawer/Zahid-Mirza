import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutDoctor from './components/AboutDoctor';
import Services from './components/Services';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy load below-fold components
const Team = lazy(() => import('./components/Team'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Events = lazy(() => import('./components/Events'));
const AppointmentForm = lazy(() => import('./components/AppointmentForm'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));

const SectionFallback = () => <div className="h-32 bg-background" />;

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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutDoctor />
        <Services />
        <Suspense fallback={<SectionFallback />}>
          <Team />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Events />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AppointmentForm />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
