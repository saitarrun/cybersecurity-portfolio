import { VercelRequest, VercelResponse } from '@vercel/node';

interface LinkedInPost {
  id: string;
  text?: string;
  createdTime?: number;
  visibility?: string;
}

// Rate limiting: 30 req/min per IP (higher than chat since this is a read-only cache)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(401).json({ error: 'LinkedIn access token not configured' });
  }

  try {
    const response = await fetch('https://api.linkedin.com/v2/me/posts?count=10', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error('LinkedIn API error:', response.status);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }

    const data = (await response.json()) as any;
    const posts: LinkedInPost[] = data.elements || [];

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({ posts, total: posts.length });
  } catch (error) {
    console.error('Fetch posts error:', error instanceof Error ? error.message : String(error));
    res.status(500).json({ error: 'Failed to fetch LinkedIn posts' });
  }
}
