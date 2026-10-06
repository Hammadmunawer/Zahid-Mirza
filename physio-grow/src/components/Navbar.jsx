import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Palette } from 'lucide-react';
import { NAV_LINKS, DOCTOR_INFO } from '../constants';

const THEMES = [
  { id: 'medicalBlue', name: 'Medical Blue', color: 'bg-blue-600' },
  { id: 'physiotherapyGreen', name: 'Physiotherapy Green', color: 'bg-teal-600' },
  { id: 'premiumDark', name: 'Premium Dark', color: 'bg-slate-800' },
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('physiotherapyGreen');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'physiotherapyGreen';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary-50 focus:outline-none"
        aria-label="Theme options"
        title="Change Theme"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Select Theme</div>
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${currentTheme === theme.id ? 'bg-primary-50 text-primary font-medium' : 'text-foreground hover:bg-background-alt'}`}
              >
                <span className={`w-4 h-4 rounded-full ${theme.color}`}></span>
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border/50'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container-max flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <img 
            src="/assets/logo.jpg" 
            alt="PhysioGrow Clinic & Academy" 
            className="w-10 h-10 rounded-lg object-cover"
            width="40"
            height="40"
          />
          <div>
            <span className="text-xl font-bold text-foreground-bold group-hover:text-primary transition-colors">
              Physio<span className="text-primary">Grow</span>
            </span>
            <p className="text-xs text-muted-foreground -mt-1">Clinic &amp; Academy</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA & Theme */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeSwitcher />
          <a
            href={`tel:${DOCTOR_INFO.phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone size={16} />
            <span className="hidden xl:inline">Call Now</span>
          </a>
          <a
            href="#appointment"
            onClick={(e) => handleNavClick(e, '#appointment')}
            className="btn-primary text-sm py-2 px-5"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100 border-t border-border' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-max pb-6 space-y-1 bg-background">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-3 px-4 text-muted-foreground hover:text-primary hover:bg-primary-50 rounded-lg transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 space-y-3 px-4">
            <a
              href={`tel:${DOCTOR_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 text-muted-foreground hover:text-primary border border-border rounded-full transition-colors"
            >
              <Phone size={16} />
              <span>Call Now</span>
            </a>
            <a
              href="#appointment"
              onClick={(e) => handleNavClick(e, '#appointment')}
              className="block text-center btn-primary"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
