import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json() as { query?: string; bookingType?: string };
  const query = typeof body.query === 'string' ? body.query.trim() : '';

  if (!query) {
    return NextResponse.json({ error: 'query is required' }, { status: 400 });
  }

  // Sprint 1 stub — AI integration deferred to Sprint 2 (CHR-08)
  return NextResponse.json({
    answer:
      "Thanks for your question! Our full concierge AI will be available soon. In the meantime, please call us on the number provided in your welcome pack.",
  });
}
