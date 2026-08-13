'use client';
import { useState, useRef, type FormEvent } from 'react';
import type { BookingType } from '../../../lib/types/property';
import TypingIndicator from './TypingIndicator';

interface ConciergeSearchProps {
  bookingType: BookingType;
  propertyName: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ConciergeSearch({ bookingType, propertyName }: ConciergeSearchProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, bookingType }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `Error ${res.status}`);
      }

      const data = await res.json() as { answer: string };
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <section aria-label="Concierge">
      <h2 className="mb-3 text-base font-semibold text-sand/70 uppercase tracking-widest">
        Concierge
      </h2>
      <div className="rounded-lg border border-sand/10 bg-navy-dark p-4 space-y-4">
        {messages.length > 0 && (
          <div className="space-y-3 max-h-64 overflow-y-auto" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'text-sand/80 text-right'
                    : 'text-sand/60'
                }`}
              >
                {msg.role === 'assistant' && (
                  <span className="mr-1 text-gold text-xs font-medium uppercase tracking-wider">
                    {propertyName} ·{' '}
                  </span>
                )}
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2">
                <span className="text-gold text-xs font-medium uppercase tracking-wider">
                  {propertyName} ·{' '}
                </span>
                <TypingIndicator />
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="text-xs text-amber-300" role="alert">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask anything about your stay…"
            className="flex-1 rounded bg-navy border border-sand/20 px-3 py-2 text-sm text-sand placeholder-sand/30 focus:outline-none focus:border-gold/50 transition-colors"
            disabled={isLoading}
            aria-label="Ask the concierge"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="px-4 py-2 rounded bg-gold text-navy text-sm font-semibold tracking-wide transition-opacity disabled:opacity-40 hover:opacity-90"
          >
            Send
          </button>
        </form>

        {messages.length === 0 && !isLoading && (
          <p className="text-xs text-sand/30 text-center">
            Ask about check-out times, local recommendations, property rules, and more.
          </p>
        )}
      </div>
    </section>
  );
}
