import { useState } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { Eyebrow } from '@/components/Eyebrow';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { ProgramCard } from '@/components/ProgramCard';
import { Reveal } from '@/components/Reveal';
import { JoinModal } from '@/components/JoinModal';

const ALL = [
  { cat: 'Events', badge: 'Upcoming', badgeTone: 'green' as const, image: '/photos/corps-group.jpg', meta: '21 Dec 2024 \u00b7 Google Meet', title: 'Southwest Lecture: Islamic perspective on the festive period', description: 'A guided session with Ustadh Abdulfatah Akanni Adigun, open to all corps members.' },
  { cat: 'Welfare', badge: 'Ramadan', badgeTone: 'gold' as const, image: '/photos/correctional-visit.jpg', meta: 'Annual \u00b7 all six states', title: 'Feed a Soul — Ramadan relief project', description: 'Providing iftar meals and relief packages to fasting Muslims and visiting correctional centres.' },
  { cat: 'Education', badge: 'Open', badgeTone: 'neutral' as const, image: '/photos/lecture-hall.jpg', meta: 'Rolling admission', title: 'MCAN Online Madrasah', description: "Qur'an recitation, memorization, Tajweed, Arabic and Islamic studies — beginner to advanced." },
  { cat: 'Welfare', badge: 'Appeal', badgeTone: 'gold' as const, image: '/photos/mcan-bus.jpg', meta: 'Zonal logistics', title: 'Ease MCAN Logistics', description: 'Reducing interstate transport costs so members can attend regional programs.' },
  { cat: 'Events', badge: 'Annual', badgeTone: 'green' as const, image: '/photos/award-presentation.jpg', meta: 'Zonal HQ', title: 'Southwest Zonal Convention', description: 'Swearing-in of regional executives, leadership training and Islamic lectures.' },
  { cat: 'Education', badge: 'Weekly', badgeTone: 'neutral' as const, image: '/photos/mosque-block.jpg', meta: 'Every chapter', title: 'Halaqah & Tafsir circles', description: 'Recurring study circles strengthening knowledge and brotherhood across chapters.' },
];

const PROJECTS = [
  { badge: 'Ongoing', badgeTone: 'gold' as const, image: '/photos/mosque-dome.jpg', meta: 'Zonal HQ', title: "Central Mosque & Da'wah Centre", description: 'A permanent zonal mosque and learning centre under construction for the Southwest community.' },
  { badge: 'Phase 2', badgeTone: 'green' as const, image: '/photos/mosque-block.jpg', meta: 'Chapter project', title: 'Chapter Mosque Development', description: 'Block-by-block construction of state-chapter mosques for resident corps members.' },
  { badge: 'Funded', badgeTone: 'neutral' as const, image: '/photos/mcan-bus.jpg', meta: 'Logistics', title: 'MCAN Transit Bus', description: 'A dedicated bus easing interstate transport for members attending zonal programs.' },
  { badge: 'Outreach', badgeTone: 'gold' as const, image: '/photos/correctional-visit.jpg', meta: 'All states', title: "Correctional Centre Da'wah", description: 'Regular visits, relief and spiritual support to inmates across the zone.' },
  { badge: 'Education', badgeTone: 'green' as const, image: '/photos/lecture-hall.jpg', meta: 'Year-round', title: 'Learning & Halaqah Spaces', description: 'Equipping study spaces and the Online Madrasah so members keep growing in knowledge.' },
  { badge: 'Welfare', badgeTone: 'neutral' as const, image: '/photos/corps-group.jpg', meta: 'Every batch', title: 'Member Settling-in Support', description: 'Accommodation guidance and welcome welfare for newly-posted corps members.' },
];

interface ProgramsViewProps {
  about?: boolean;
  news?: boolean;
  projects?: boolean;
}

export function ProgramsView({ about, news, projects }: ProgramsViewProps) {
  const [filter, setFilter] = useState('All');
  const [joinOpen, setJoinOpen] = useState(false);
  const cats = ['All', 'Events', 'Welfare', 'Education'];

  const p = about
    ? { eyebrow: 'About MCAN Southwest', title: 'A regional body serving Muslim corps members', intro: 'MCAN Southwest coordinates welfare, spiritual development and community outreach across the six Southwest states — guided by adherence to the pristine teachings of Islam in all affairs of life.' }
    : news
    ? { eyebrow: 'News & publications', title: 'Stories from across the zone', intro: 'Updates, impact stories and announcements from MCAN Southwest chapters.' }
    : projects
    ? { eyebrow: 'Projects', title: 'Building lasting community assets', intro: 'Mosques, transport, learning spaces and outreach — the projects MCAN Southwest is building for members and the wider community.' }
    : { eyebrow: 'Programs & activities', title: 'Programs across the Southwest zone', intro: 'From the Zonal Convention to weekly halaqah and the Online Madrasah — here is what we run.' };

  const showFilters = !about && !news && !projects;
  const list = projects ? PROJECTS : (filter === 'All' ? ALL : ALL.filter((x) => x.cat === filter));

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {list.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.09}>
              <ProgramCard {...it} onClick={() => setJoinOpen(true)} />
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary" size="lg" onClick={() => setJoinOpen(true)}>Register your interest</Button>
        </div>
      </section>
      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}
