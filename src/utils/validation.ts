// Input validation utilities (OWASP standards)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationError {
  field: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .slice(0, 10000); // Limit length
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const cleaned = sanitizeInput(email);
  return EMAIL_REGEX.test(cleaned) && cleaned.length <= 254;
};

// Validate name (allow letters, spaces, hyphens, apostrophes)
export const validateName = (name: string): boolean => {
  const cleaned = sanitizeInput(name);
  return cleaned.length >= 2 && cleaned.length <= 100 && /^[a-zA-Z\s\-']+$/.test(cleaned);
};

// Validate message
export const validateMessage = (message: string): boolean => {
  const cleaned = sanitizeInput(message);
  return cleaned.length >= 10 && cleaned.length <= 5000;
};

// Validate entire contact form
export const validateContactForm = (data: ContactFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Name must be 2-100 characters (letters, spaces, hyphens only)',
    });
  }

  if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }

  if (!validateMessage(data.message)) {
    errors.push({
      field: 'message',
      message: 'Message must be 10-5000 characters',
    });
  }

  return errors;
};

// Rate limiting (client-side, basic check)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 3, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter((time) => now - time < this.windowMs);

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }

  getRemainingTime(key: string): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length === 0) return 0;

    const oldestAttempt = Math.min(...attempts);
    const remaining = this.windowMs - (Date.now() - oldestAttempt);
    return Math.max(0, remaining);
  }
}
