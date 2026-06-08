import { VercelRequest, VercelResponse } from '@vercel/node';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;

  if (!code) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>LinkedIn Token Generator</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; background: #0a0e27; color: #fff; }
          a { color: #ff9249; text-decoration: none; padding: 0.75rem 1.5rem; background: #ff9249; color: #000; border-radius: 2rem; display: inline-block; }
          .code { background: #1a1f3a; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; word-break: break-all; }
          h2 { margin-top: 2rem; }
        </style>
      </head>
      <body>
        <h1>LinkedIn Access Token Generator</h1>
        <p>Step 1: Click below to authorize</p>
        <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${escapeHtml(process.env.LINKEDIN_CLIENT_ID || '')}&redirect_uri=http://localhost:3000/api/linkedin-get-token&scope=profile,openid">
          Authorize with LinkedIn
        </a>

        <h2>For Production</h2>
        <p>Change redirect_uri to: <code>https://software-engineer-portfolio.vercel.app/api/linkedin-get-token</code></p>

        <h2>Instructions</h2>
        <ol>
          <li>Click &ldquo;Authorize with LinkedIn&rdquo; above</li>
          <li>You&rsquo;ll be redirected back with an access token</li>
          <li>Copy the token and add to Vercel env var: <code>LINKEDIN_ACCESS_TOKEN</code></li>
          <li>Redeploy and posts will display automatically</li>
        </ol>
      </body>
      </html>
    `);
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = 'https://software-engineer-portfolio-wuzw.vercel.app/api/linkedin-get-token';

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'LinkedIn OAuth not configured.' });
  }

  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }).toString(),
    });

    const data = (await tokenResponse.json()) as any;

    if (!tokenResponse.ok) {
      console.error('LinkedIn token error:', data.error_description || data.error);
      return res.status(400).json({ error: 'Token exchange failed' });
    }

    const safeToken = escapeHtml(String(data.access_token ?? ''));
    const safeExpiry = escapeHtml(String(data.expires_in ?? ''));

    res.setHeader('Content-Type', 'text/html');
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>LinkedIn Token</title>
        <style>
          body { font-family: monospace; padding: 2rem; background: #0a0e27; color: #0f0; }
          .token { background: #1a1f3a; padding: 1rem; border-radius: 0.5rem; word-break: break-all; margin: 1rem 0; }
          button { padding: 0.5rem 1rem; background: #ff9249; color: #000; border: none; border-radius: 0.5rem; cursor: pointer; }
        </style>
      </head>
      <body>
        <h2>&#10003; Token Generated</h2>
        <p>Copy this token and add to Vercel as <code>LINKEDIN_ACCESS_TOKEN</code>:</p>
        <div class="token" id="tok">${safeToken}</div>
        <p>Expires in: ${safeExpiry} seconds</p>
        <button onclick="navigator.clipboard.writeText(document.getElementById('tok').textContent||'')">Copy Token</button>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Token error:', error instanceof Error ? error.message : String(error));
    try {
      res.status(500).json({ error: 'Token generation failed' });
    } catch {
      // response already sent
    }
  }
}
