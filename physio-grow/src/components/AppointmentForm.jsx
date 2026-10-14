import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { DOCTOR_INFO, getWhatsAppUrl } from '../constants';

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// After creating EmailJS account, replace these values:
// 1. Go to https://www.emailjs.com → Sign Up (free)
// 2. Add Email Service → Connect Gmail → copy Service ID
// 3. Create Email Template → copy Template ID
// 4. Account → API Keys → copy Public Key
const EMAILJS_SERVICE_ID  = 'service_xqhcd3h';
const EMAILJS_TEMPLATE_ID = 'template_f8qv5ni';
const EMAILJS_PUBLIC_KEY  = 'lHIMESutzVXiLnK_K';
// ─────────────────────────────────────────────────────────────────────────────

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    treatment: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';
    if (!formData.treatment.trim()) newErrors.treatment = 'Please describe your concern';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Send email via EmailJS to zahidmirza156@gmail.com
      const templateParams = {
        from_name:      formData.fullName,
        from_phone:     formData.phone,
        from_email:     formData.email || 'Not provided',
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime || 'Not specified',
        treatment:      formData.treatment,
        message:        formData.message || 'No additional message',
        to_email:       'zahidmirza156@gmail.com',
        reply_to:       formData.email || 'zahidmirza156@gmail.com',
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        treatment: '',
        message: '',
      });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitError('Failed to send appointment request. Please try WhatsApp or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="appointment" className="section-padding bg-primary-50">
        <div className="container-max">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="text-primary" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-foreground-bold">Appointment Request Sent!</h2>
            <p className="text-muted-foreground text-lg">
              Thank you for choosing PhysioGrow Clinic. We have received your appointment
              request and will contact you shortly to confirm your booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-outline"
              >
                Book Another Appointment
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="section-padding bg-primary-50">
      <div className="container-max">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Book Appointment
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
                Schedule Your Visit
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ready to start your recovery journey? Book an appointment with
                {' '}{DOCTOR_INFO.shortName} at {DOCTOR_INFO.clinicName}.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Clinic Timings</p>
                  <p className="text-muted-foreground text-sm">{DOCTOR_INFO.clinicTimings}</p>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <p className="text-muted-foreground text-sm mb-3">Prefer to chat?</p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center gap-2 text-sm py-2.5 px-6"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-background rounded-2xl shadow-lg p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-border focus:ring-primary-200'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92-3XX-XXXXXXX"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-border focus:ring-primary-200'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com (optional)"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-400 focus:ring-red-200' : 'border-border focus:ring-primary-200'
                  } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Date */}
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.preferredDate ? 'border-red-400 focus:ring-red-200' : 'border-border focus:ring-primary-200'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                  />
                  {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-foreground mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-primary-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm text-foreground"
                  >
                    <option value="">Select time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Treatment */}
              <div>
                <label htmlFor="treatment" className="block text-sm font-medium text-foreground mb-1.5">
                  Treatment / Concern *
                </label>
                <input
                  type="text"
                  id="treatment"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  placeholder="e.g., Back pain, Sports injury, Post-surgery rehab"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.treatment ? 'border-red-400 focus:ring-red-200' : 'border-border focus:ring-primary-200'
                  } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                />
                {errors.treatment && <p className="text-red-500 text-xs mt-1">{errors.treatment}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any additional information you'd like to share..."
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-primary-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Book Appointment
                  </>
                )}
              </button>

              {/* Error message */}
              {submitError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;

