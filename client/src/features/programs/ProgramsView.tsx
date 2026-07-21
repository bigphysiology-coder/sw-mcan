import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProgramCard } from '@/components/ui/ProgramCard';
import { Reveal } from '@/components/ui/Reveal';
import { JoinModal } from '@/components/ui/JoinModal';
import { usePrograms } from '@/features/programs/hooks/usePrograms';
import type { ProgramItem } from '@/types';

const IMAGES = ['/photos/corps-group.jpg', '/photos/correctional-visit.jpg', '/photos/lecture-hall.jpg', '/photos/mcan-bus.jpg', '/photos/award-presentation.jpg', '/photos/mosque-block.jpg', '/photos/mosque-dome.jpg'];
const BADGES = ['Upcoming', 'Annual', 'Open', 'Weekly', 'Ongoing', 'Phase 2', 'Funded', 'Outreach', 'Education', 'Welfare'];
const BADGE_TONES = ['green', 'gold', 'neutral'] as const;

function toDisplay(item: ProgramItem, index: number) {
  return {
    title: item.title,
    description: item.description,
    image: item.image || IMAGES[index % IMAGES.length],
    badge: item.category || BADGES[index % BADGES.length],
    badgeTone: BADGE_TONES[index % BADGE_TONES.length],
    meta: item.link || '',
    cat: item.category || 'Events',
  }
}

interface ProgramsViewProps {
  about?: boolean;
  news?: boolean;
  projects?: boolean;
  allowJoinModal?: boolean;
}

export function ProgramsView({ about, news, projects, allowJoinModal = !news && !projects && !about }: ProgramsViewProps) {
  const [filter, setFilter] = useState('All');
  const [joinOpen, setJoinOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase().trim() || '';
  const { programs, isLoading } = usePrograms(projects ? 'project' : undefined);
  const cats = ['All', ...new Set(programs.map((p) => p.category || 'Events'))];

  const p = about
    ? { eyebrow: 'About MCAN Southwest', title: 'A regional body serving Muslim corps members', intro: 'MCAN Southwest coordinates welfare, spiritual development and community outreach across the six Southwest states — guided by adherence to the pristine teachings of Islam in all affairs of life.' }
    : news
    ? { eyebrow: 'News & publications', title: 'Stories from across the zone', intro: 'Updates, impact stories and announcements from MCAN Southwest chapters.' }
    : projects
    ? { eyebrow: 'Projects', title: 'Building lasting community assets', intro: 'Mosques, transport, learning spaces and outreach — the projects MCAN Southwest is building for members and the wider community.' }
    : { eyebrow: 'Programs & activities', title: 'Programs across the Southwest zone', intro: 'From the Zonal Convention to weekly halaqah and the Online Madrasah — here is what we run.' };

  const showFilters = !about && !news && !projects && !isLoading;
  const list = (() => {
    let items = programs.map(toDisplay);
    if (filter !== 'All') items = items.filter((x) => x.cat === filter);
    if (searchQuery) {
      items = items.filter((x) =>
        x.title.toLowerCase().includes(searchQuery) ||
        x.description.toLowerCase().includes(searchQuery)
      );
    }
    return items;
  })();

  return (
    <div>
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ padding: '72px var(--container-pad) 40px' }}>
          <SectionHeading {...p} />
          {showFilters && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}>
              {cats.map((c) => (
                <button key={c} onClick={() => setFilter(c)} style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  padding: '9px 18px', borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid ' + (filter === c ? 'var(--green-primary)' : 'var(--border-default)'),
                  background: filter === c ? 'var(--green-primary)' : 'transparent',
                  color: filter === c ? '#fff' : 'var(--text-body)',
                  transition: 'all var(--dur-fast) var(--ease-standard)',
                }}>{c}</button>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="container" style={{ padding: '56px var(--container-pad) 96px' }}>
        <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {list.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.09}>
              <ProgramCard {...it} onClick={allowJoinModal ? () => setJoinOpen(true) : undefined} />
            </Reveal>
          ))}
        </div>
          {allowJoinModal && (
            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
              <Button variant="secondary" size="lg" onClick={() => setJoinOpen(true)}>Register your interest</Button>
            </div>
          )}
      </section>
        {allowJoinModal && joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}
