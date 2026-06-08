import { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

function validateLinkedInSignature(signature: string, body: string, clientSecret: string): boolean {
  const hash = crypto.createHmac('sha256', clientSecret).update(body).digest('base64');

  return hash === signature;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-linkedin-signature'] as string;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

  if (!signature || !clientSecret) {
    return res.status(401).json({ error: 'Invalid request' });
  }

  // Validate signature
  const bodyString = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  if (!validateLinkedInSignature(signature, bodyString, clientSecret)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  try {
    const event = req.body;

    // Handle LinkedIn webhook event
    // event.eventId, event.timestamp, event.triggerId, etc.
    console.warn('Webhook received:', event);

    // TODO: Update post cache or trigger re-fetch
    // For now, just acknowledge receipt
    res.json({ success: true, received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
