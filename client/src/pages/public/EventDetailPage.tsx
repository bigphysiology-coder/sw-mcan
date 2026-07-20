import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { eventsApi } from '@/features/events/services/eventsApi';
import type { EventItem } from '@/types';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadEvent() {
      setLoading(true);
      const data = await eventsApi.getEvent(id ?? '');
      if (!active) return;
      setEvent(data ?? null);
      setLoading(false);
    }

    loadEvent();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section style={{ padding: '72px 0 96px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <Loader text="Loading event" />
        </div>
      </section>
    );
  }

  if (!event) {
    return (
      <section style={{ padding: '72px 0 96px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <p style={{ color: 'var(--text-muted)' }}>The requested event could not be found.</p>
          <Link to="/events" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--green-primary)', fontWeight: 600 }}>
            Back to events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '72px 0 96px' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <Link to="/events" style={{ display: 'inline-block', marginBottom: '16px', color: 'var(--green-primary)', fontWeight: 600 }}>
          ← Back to events
        </Link>

        <p style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-500)', fontWeight: 700 }}>
          Upcoming event
        </p>
        <h1 style={{ fontSize: '34px', lineHeight: 1.2, margin: '8px 0 12px', color: 'var(--text-heading)' }}>
          {event.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          {new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          {event.location.venue ? ` · ${event.location.venue}` : ''}
          {event.location.city ? `, ${event.location.city}` : ''}
        </p>

        {event.coverImage && (
          <img src={event.coverImage} alt={event.title} style={{ width: '100%', borderRadius: '18px', marginBottom: '24px', objectFit: 'cover', maxHeight: '360px' }} />
        )}

        <p style={{ lineHeight: 1.8, color: 'var(--text-body)', whiteSpace: 'pre-line' }}>{event.description}</p>
      </div>
    </section>
  );
}
