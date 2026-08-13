import { describe, it, expect } from 'vitest';
import { POST } from '../../../../app/api/concierge/route';

async function makeRequest(body: unknown): Promise<Request> {
  return new Request('http://localhost/api/concierge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/concierge', () => {
  it('returns 200 with an answer for a valid query', async () => {
    const req = await makeRequest({ query: 'What time is checkout?', bookingType: 'family' });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json() as { answer: string };
    expect(typeof body.answer).toBe('string');
    expect(body.answer.length).toBeGreaterThan(0);
  });

  it('returns 400 when query is missing', async () => {
    const req = await makeRequest({ bookingType: 'family' });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('query is required');
  });

  it('returns 400 when query is empty string', async () => {
    const req = await makeRequest({ query: '   ', bookingType: 'family' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 when query is non-string', async () => {
    const req = await makeRequest({ query: 42 });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
