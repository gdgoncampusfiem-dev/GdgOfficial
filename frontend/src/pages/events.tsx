import { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/navigation/Navbar';

// Deterministic date formatter – no hydration mismatch
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  return `${parseInt(day, 10)} ${MONTH_NAMES[parseInt(month, 10) - 1]} ${year}`;
};

const FALLBACK_IMG = '/placeholder-event.svg';

type Event = {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  url: string;
  status: 'draft' | 'published';
};

/* ── Add Event URL box ───────────────────────────────── */
const AddEventBox = ({
  onAdd,
}: {
  onAdd: (event: Event, action: 'draft' | 'published') => void;
}) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAction = async (action: 'draft' | 'published') => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/scrape-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      const data = await res.json();

      const newEvent: Event = {
        id: Date.now().toString(),
        title: data.title || 'Untitled Event',
        date: data.date || new Date().toISOString().split('T')[0],
        image: data.image || '',
        description: data.description || '',
        url: trimmed,
        status: action,
      };

      onAdd(newEvent, action);
      setUrl('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border-[2px] border-[#050505] bg-white p-6 shadow-[4px_4px_0px_#4285F4]">
      <h3 className="text-lg font-bold text-[#050505] mb-3 tracking-tight">Add New Event</h3>
      <p className="text-sm text-[#575550] mb-4 font-light">
        Paste the official GDG event URL below, then save as draft or publish directly.
      </p>

      <input
        type="url"
        value={url}
        onChange={(e) => { setUrl(e.target.value); setError(''); }}
        placeholder="https://gdg.community.dev/events/details/..."
        className="w-full rounded-xl border-[2px] border-[#050505] bg-[#F3F0E8] px-4 py-3 text-sm text-[#050505] placeholder:text-[#575550]/60 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition font-sans"
      />

      {error && (
        <p className="mt-2 text-sm text-[#EA4335] font-medium">{error}</p>
      )}

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => handleAction('draft')}
          disabled={!url.trim() || loading}
          className="px-5 py-2.5 rounded-xl border-[2px] border-[#050505] bg-white text-sm font-bold text-[#050505] shadow-[2px_2px_0px_#F9AB00] hover:shadow-[3px_3px_0px_#F9AB00] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Loading…' : '📝 Draft'}
        </button>
        <button
          onClick={() => handleAction('published')}
          disabled={!url.trim() || loading}
          className="px-5 py-2.5 rounded-xl border-[2px] border-[#050505] bg-[#4285F4] text-sm font-bold text-white shadow-[2px_2px_0px_#050505] hover:shadow-[3px_3px_0px_#050505] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-[#3367D6] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Loading…' : '🚀 Publish'}
        </button>
      </div>
    </div>
  );
};

/* ── Latest event – big hero-style card ──────────────── */
const LatestEventCard = ({ event }: { event: Event }) => (
  <a
    href={event.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block w-full rounded-3xl overflow-hidden border-[3px] border-[#050505] shadow-[6px_6px_0px_#4285F4] hover:shadow-[8px_8px_0px_#4285F4] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-300"
  >
    <div className="relative w-full h-[420px] bg-[#F0F0F0]">
      <img
        src={event.image || FALLBACK_IMG}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/85 via-[#1E1E1E]/30 to-transparent" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-8">
      <span className="inline-block px-3 py-1 mb-3 text-xs font-black tracking-[0.15em] uppercase border-[2px] border-white bg-[#EA4335] text-white shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
        Latest
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight tracking-tight">
        {event.title}
      </h3>
      <p className="text-white/70 text-sm mb-1 font-medium">{formatDate(event.date)}</p>
      <p className="text-white/80 text-sm line-clamp-2 max-w-xl font-light">{event.description}</p>
    </div>
  </a>
);

/* ── Past event – smaller card ───────────────────────── */
const PastEventCard = ({ event, idx }: { event: Event; idx: number }) => {
  // Cycle through GDG accent colors for shadow
  const accentColors = ['#4285F4', '#EA4335', '#34A853', '#F9AB00'];
  const accent = accentColors[idx % accentColors.length];

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border-[2px] border-[#050505] transition-all duration-300"
      style={{
        boxShadow: `3px 3px 0px ${accent}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `5px 5px 0px ${accent}`;
        e.currentTarget.style.transform = 'translate(-1px, -1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `3px 3px 0px ${accent}`;
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      <div className="relative w-full h-48 overflow-hidden bg-[#F0F0F0]">
        <img
          src={event.image || FALLBACK_IMG}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-[#575550] font-bold uppercase tracking-wider mb-1">{formatDate(event.date)}</p>
        <h3 className="text-lg font-bold text-[#050505] mb-2 line-clamp-2 tracking-tight">{event.title}</h3>
        <p className="text-sm text-[#575550] line-clamp-3 flex-1 font-light">{event.description}</p>
        <span
          className="mt-4 text-sm font-black uppercase tracking-wider group-hover:underline"
          style={{ color: accent }}
        >
          View Event ↗
        </span>
      </div>
    </a>
  );
};

/* ── Page ─────────────────────────────────────────────── */
export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const handleAddEvent = (newEvent: Event) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const published = events.filter((e) => e.status === 'published');
  const latest = published[0];
  const older = published.slice(1);

  return (
    <>
      <Head>
        <title>Events | GDG on Campus FIEM</title>
        <meta name="description" content="Upcoming and past events by GDG on Campus FIEM, Kolkata." />
      </Head>

      <main className="min-h-screen bg-[#F3F0E8] font-sans selection:bg-[#050505] selection:text-[#F3F0E8]">
        <Navbar theme="light" />

        {/* Spacer for fixed navbar */}
        <div className="pt-20" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* ── Add Event URL box ── */}
          <section className="mb-10">
            <AddEventBox onAdd={handleAddEvent} />
          </section>

          {/* ── Section: Latest Event ── */}
          {latest && (
            <section className="mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#050505] mb-6 uppercase tracking-tighter">
                <span className="subheading-words font-light">Latest </span>
                <span className="subheading-last font-bold">Event</span>
              </h2>
              <LatestEventCard event={latest} />
            </section>
          )}

          {/* ── Section: Past Events ── */}
          {older.length > 0 && (
            <section>
              <h2 className="text-3xl md:text-4xl font-black text-[#050505] mb-6 uppercase tracking-tighter">
                <span className="subheading-words font-light">Past </span>
                <span className="subheading-last font-bold">Events</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {older.map((ev, idx) => (
                  <PastEventCard key={ev.id} event={ev} idx={idx} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {published.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-[#575550] font-light">No events published yet.</p>
              <p className="text-sm mt-1 text-[#575550]/60">Paste a GDG event URL above and hit Publish!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
