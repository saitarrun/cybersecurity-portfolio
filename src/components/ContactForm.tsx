import { useState } from 'react';
import {
  validateContactForm,
  sanitizeInput,
  RateLimiter,
  type ValidationError,
} from '../utils/validation';
import { Button } from './ui/Button';
import { Mail } from 'lucide-react';

const rateLimiter = new RateLimiter(3, 60000); // 3 attempts per 60 seconds

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
  errors: ValidationError[];
}

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
    errors: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
    // Clear errors on input change
    setState((prev) => ({
      ...prev,
      errors: prev.errors.filter((err) => err.field !== name),
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit
    if (!rateLimiter.isAllowed('contact-form')) {
      const remaining = rateLimiter.getRemainingTime('contact-form');
      setState({
        loading: false,
        success: false,
        error: `Too many requests. Please try again in ${Math.ceil(remaining / 1000)} seconds.`,
        errors: [],
      });
      return;
    }

    // Validate form
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      setState({
        loading: false,
        success: false,
        error: 'Please fix the errors below',
        errors: validationErrors,
      });
      return;
    }

    setState({ loading: true, success: false, error: null, errors: [] });

    try {
      // Fallback: Open email client if no backend
      const contactEmail =
        (import.meta as any).env?.VITE_CONTACT_EMAIL || 'saitarrunpitta@gmail.com';
      const mailtoLink = `mailto:${contactEmail}?subject=Portfolio Contact: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

      // Try to send via API if available
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to send');

        setState({
          loading: false,
          success: true,
          error: null,
          errors: [],
        });
        setFormData({ name: '', email: '', message: '' });
      } catch {
        // Fallback to mailto
        window.location.href = mailtoLink;
        setState({
          loading: false,
          success: true,
          error: null,
          errors: [],
        });
      }
    } catch {
      setState({
        loading: false,
        success: false,
        error: 'Failed to send message. Please try again.',
        errors: [],
      });
    }
  };

  const getFieldError = (fieldName: string) => {
    return state.errors.find((err) => err.field === fieldName)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-on-surface">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          disabled={state.loading}
          required
          className="px-4 py-3 bg-surface-container-low/40 border border-white/10 rounded-lg text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          maxLength={100}
        />
        {getFieldError('name') && (
          <span className="text-xs text-error">{getFieldError('name')}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-on-surface">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          disabled={state.loading}
          required
          className="px-4 py-3 bg-surface-container-low/40 border border-white/10 rounded-lg text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          maxLength={254}
        />
        {getFieldError('email') && (
          <span className="text-xs text-error">{getFieldError('email')}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-on-surface">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message (10-5000 characters)"
          disabled={state.loading}
          required
          rows={6}
          className="px-4 py-3 bg-surface-container-low/40 border border-white/10 rounded-lg text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          maxLength={5000}
        />
        <div className="text-xs text-on-surface-variant">{formData.message.length}/5000</div>
        {getFieldError('message') && (
          <span className="text-xs text-error">{getFieldError('message')}</span>
        )}
      </div>

      {/* Error message */}
      {state.error && !state.success && (
        <div className="px-4 py-3 bg-error/10 border border-error/50 rounded-lg text-error text-sm">
          {state.error}
        </div>
      )}

      {/* Success message */}
      {state.success && (
        <div className="px-4 py-3 bg-primary/10 border border-primary/50 rounded-lg text-primary text-sm">
          Message sent! I'll get back to you soon.
        </div>
      )}

      {/* Submit button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        icon={<Mail className="w-5 h-5" />}
        onClick={() => {}} // form submission handled by onSubmit
      >
        {state.loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
