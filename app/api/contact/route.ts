// SERVER-ONLY route. Runs as a Vercel serverless function.
//
// The browser POSTs here (never directly to Formspree), so:
//   1. The Formspree endpoint URL stays out of client JS.
//   2. We can validate/sanitize input before it leaves our server.
//
// POST /api/contact  { name, email, message }

import { NextRequest, NextResponse } from 'next/server';

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const message = (body.message || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are all required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  if (!FORMSPREE_ENDPOINT) {
    console.info('[contact] FORMSPREE_ENDPOINT not set — see .env.example.');
    return NextResponse.json(
      { error: 'Contact form is not configured yet. Please email directly instead.' },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const detail = data?.errors?.[0]?.message || 'Formspree rejected the submission.';
      throw new Error(detail);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn('[contact] Formspree submission failed:', (err as Error).message);
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please try again or email directly.' },
      { status: 502 }
    );
  }
}