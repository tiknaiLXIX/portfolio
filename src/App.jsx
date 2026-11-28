import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { profile, about, featured, simulation, localisation, projects, experience, skills } from './data.js';
import { Icon } from './icons.jsx';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const PAGE_SIZE = 6;

/* ---------- small helpers ---------- */

// Renders **bold** segments inside a plain string.
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') ? <b key={i}>{part.slice(2, -2)}</b> : part
  );
}

function TechList({ items }) {
  return (
    <ul className="tech-list">
      {items.map((t) => (
        <li className="tech-chip" key={t}>{t}</li>
      ))}
    </ul>
  );
}

function SectionHead({ tag, title, id, lead }) {
  return (
    <>
      <p className="section-tag">{tag}</p>
      <h2 id={id} className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </>
  );
}

// Fades a card in the first time it scrolls into view.
function Reveal({ as: Tag = 'section', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setShown(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`${className} reveal${shown ? ' is-visible' : ''}`} {...rest}>
      {children}
    </Tag>
  );
}

// Which section is currently on screen (for the menu highlight).
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

// Types and deletes each phrase in turn.
function useTyping(phrases, { type = 70, erase = 35, hold = 1600 } = {}) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(phrases[0]);
      return;
    }
    const full = phrases[i % phrases.length];
    let delay = deleting ? erase : type;
    if (!deleting && text === full) delay = hold;
    if (deleting && text === '') delay = 300;
    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setI((n) => n + 1);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases, type, erase, hold]);
  return text;
}

/* ---------- top bar + side drawer ---------- */

function Topbar({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <button
              className={open ? 'nav-toggle is-open' : 'nav-toggle'}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span /><span /><span />
            </button>
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">{profile.initials}</span>
              <span>{profile.name}</span>
              <span className="brand-role">· {profile.role}</span>
            </a>
          </div>
          <a className="button button-secondary button-sm" href={profile.resume}>
            <Icon name="download" /> Resume
          </a>
        </div>
      </header>

      <div className={open ? 'scrim show' : 'scrim'} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="site-menu" className={open ? 'drawer open' : 'drawer'} aria-label="Sections" inert={open ? undefined : ''}>
        <p className="subheading">Menu</p>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="drawer-foot">
          <a href={`mailto:${profile.email}`}><Icon name="mail" /> {profile.email}</a>
          <a href={profile.linkedin}><Icon name="linkedin" /> LinkedIn</a>
        </div>
      </nav>
    </>
  );
}

/* ---------- hero ---------- */

// Blue cubes drift down the banner; click one to burst it.
function CubeRain() {
  const [cubes, setCubes] = useState([]);
  const [bursts, setBursts] = useState([]);
  useEffect(() => {
    setCubes(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 96 + 2,
        size: 8 + Math.random() * 10,
        duration: 7 + Math.random() * 8,
        delay: -Math.random() * 14,
      }))
    );
  }, []);
  const burst = (e, cube) => {
    const box = e.currentTarget.parentElement.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const parts = Array.from({ length: 8 }, (_, k) => {
      const a = (Math.PI * 2 * k) / 8;
      return { k, x: Math.cos(a) * 40, y: Math.sin(a) * 40 };
    });
    setBursts((b) => [...b, { id, x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, size: cube.size / 2, parts }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 700);
  };
  return (
    <div className="cube-rain" aria-hidden="true">
      {cubes.map((c) => (
        <button
          key={c.id}
          tabIndex={-1}
          className="cube"
          onClick={(e) => burst(e, c)}
          style={{ left: `${c.left}%`, width: c.size, height: c.size, animationDuration: `${c.duration}s`, animationDelay: `${c.delay}s` }}
        />
      ))}
      {bursts.map((b) =>
        b.parts.map((p) => (
          <span
            key={`${b.id}-${p.k}`}
            className="cube-particle"
            style={{ left: b.x, top: b.y, width: b.size, height: b.size, '--particle-x': `${p.x}px`, '--particle-y': `${p.y}px` }}
          />
        ))
      )}
    </div>
  );
}

function HeroPhoto() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="hero-photo">
      {profile.photo && !failed ? (
        <img src={profile.photo} alt={`Portrait of ${profile.name}`} onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden="true">{profile.initials}</span>
      )}
    </div>
  );
}

function Hero() {
  const typed = useTyping(profile.headlines);
  return (
    <Reveal className="card hero" id="top" aria-labelledby="hero-title">
      <div className="hero-banner">
        <CubeRain />
      </div>
      <div className="hero-body">
        <HeroPhoto />
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-headline" aria-label={profile.headlines.join(', ')}>
          <span aria-hidden="true">{typed}<span className="typing-cursor">|</span></span>
        </p>
        <div className="hero-meta">
          <span className="hero-location"><Icon name="pin" /> {profile.location}</span>
          {profile.meta.map((m) => <span key={m}>{m}</span>)}
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href={profile.resume}><Icon name="download" /> Download resume</a>
          <a className="button button-secondary" href="#projects">View projects <Icon name="arrow" /></a>
          <div className="social-links">
            <a href={profile.linkedin} aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- about ---------- */

function About() {
  const work = experience.filter((e) => !e.role.startsWith('Bachelor'));
  const study = experience.filter((e) => e.role.startsWith('Bachelor'));
  return (
    <Reveal className="card section" id="about" aria-labelledby="about-title">
      <SectionHead tag="About" id="about-title" title={about.title} lead={about.lead} />
      <div className="about-grid">
        <div>
          <p className="subheading">Experience</p>
          <ol className="timeline">
            {work.map((e) => (
              <li className="timeline-item" key={e.role}>
                <div className="timeline-heading">
                  <h4>{e.role}</h4>
                  <span className="timeline-period">{e.when}</span>
                </div>
                <p className="timeline-org">{e.where}</p>
                <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="subheading">Education</p>
          <ol className="timeline">
            {study.map((e) => (
              <li className="timeline-item" key={e.role}>
                <div className="timeline-heading">
                  <h4>{e.role}</h4>
                </div>
                <p className="timeline-org">{e.where} · {e.when}</p>
                <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </li>
            ))}
          </ol>
          <p className="subheading spaced">Focus areas</p>
          <ul className="award-list">
            {about.focus.map((f) => (
              <li className="award-item" key={f}><Icon name="check" /> {f}</li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- skills ---------- */

function SkillIcon({ skill }) {
  const [failed, setFailed] = useState(false);
  if (skill.icon && !failed) {
    return <img src={`${DEVICON}${skill.icon}.svg`} alt="" loading="lazy" onError={() => setFailed(true)} />;
  }
  return <span className="skill-mono" aria-hidden="true">{skill.name.replace(/[^A-Za-z]/g, '').slice(0, 2)}</span>;
}

function Skills() {
  return (
    <Reveal className="card section" id="skills" aria-labelledby="skills-title">
      <SectionHead
        tag="Tech Stack"
        id="skills-title"
        title="Languages and tools I work with."
        lead="Used across the projects below, from control design and circuit simulation to web and cloud."
      />
      <ul className="skill-grid">
        {skills.map((s) => (
          <li className="skill-item" key={s.name}>
            <SkillIcon skill={s} /> {s.name}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ---------- projects ---------- */

function Zoomable({ image, onOpen, className = '' }) {
  return (
    <button className={`zoom ${className}`} onClick={() => onOpen(image)} aria-label={`Enlarge: ${image.alt}`}>
      <img src={image.src} alt={image.alt} className={image.contain ? 'contain' : ''} loading="lazy" />
    </button>
  );
}

function FeatureBody({ data }) {
  return (
    <div className="feature-body">
      <span className="project-category">{data.meta}</span>
      <h3>{data.title}</h3>
      {data.body.map((p, i) => <p key={i}>{p}</p>)}
      {data.result && <p className="result"><Rich text={data.result} /></p>}
      <TechList items={data.tags} />
    </div>
  );
}

function Featured({ onOpen }) {
  return (
    <article className="feature">
      <div className="feature-media">
        {featured.images.map((img) => <Zoomable key={img.src} image={img} onOpen={onOpen} />)}
      </div>
      <FeatureBody data={featured} />
    </article>
  );
}

function VideoShowcase({ data, wide = false }) {
  const [active, setActive] = useState(0);
  const video = data.videos[active];
  return (
    <article className={wide ? 'feature feature-video wide' : 'feature feature-video'}>
      <div className="player">
        <video key={video.src} src={video.src} poster={video.poster} autoPlay muted loop playsInline controls preload="metadata" aria-label={video.caption} />
        <div className="filter-group" role="tablist" aria-label="Videos">
          {data.videos.map((v, i) => (
            <button key={v.src} role="tab" aria-selected={i === active} className={i === active ? 'filter-button is-active' : 'filter-button'} onClick={() => setActive(i)}>
              <Icon name="play" /> {v.label}
            </button>
          ))}
        </div>
        <p className="vcaption">{video.caption}</p>
      </div>
      <FeatureBody data={data} />
    </article>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card">
      {project.video ? (
        <div className="project-media media-video">
          <video src={project.video.src} poster={project.image?.src} autoPlay muted loop playsInline controls preload="metadata" aria-label={project.video.caption} />
        </div>
      ) : (
        project.image && <Zoomable image={project.image} onOpen={onOpen} className="project-media" />
      )}
      <span className="project-category">{project.category}</span>
      <h3>{project.title}</h3>
      <p className="project-meta">{project.meta}</p>
      <p>{project.body}</p>
      {project.result && <p className="result"><Rich text={project.result} /></p>}
      {[project.extraImage, ...(project.extraImages || [])].filter(Boolean).map((img) => (
        <button key={img.src} className="text-link" onClick={() => onOpen(img)}>
          {img.label || 'View screenshot →'}
        </button>
      ))}
      <TechList items={project.tags} />
    </article>
  );
}

function Projects({ onOpen }) {
  const categories = useMemo(() => {
    const counts = projects.reduce((m, p) => ({ ...m, [p.category]: (m[p.category] || 0) + 1 }), {});
    return [['All', projects.length], ...Object.entries(counts)];
  }, []);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const matches = projects.filter(
    (p) =>
      (filter === 'All' || p.category === filter) &&
      (!q || [p.title, p.body, p.meta, ...p.tags].join(' ').toLowerCase().includes(q))
  );
  const shown = matches.slice(0, limit);

  useEffect(() => setLimit(PAGE_SIZE), [filter, q]);

  return (
    <Reveal className="card section" id="projects" aria-labelledby="projects-title">
      <SectionHead
        tag="Projects"
        id="projects-title"
        title="Selected work."
        lead="Honours research, internship work and university projects, with results taken from my reports."
      />

      <p className="subheading spaced">Highlights</p>
      <div className="feature-stack">
        <Featured onOpen={onOpen} />
        <VideoShowcase data={simulation} />
        <VideoShowcase data={localisation} wide />
      </div>

      <p className="subheading spaced">All projects</p>
      <div className="project-controls">
        <div className="filter-group" role="group" aria-label="Filter projects">
          {categories.map(([c, n]) => (
            <button key={c} className={c === filter ? 'filter-button is-active' : 'filter-button'} onClick={() => setFilter(c)} aria-pressed={c === filter}>
              {c} <span className="filter-count">{n}</span>
            </button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search projects</span>
          <Icon name="search" className="search-icon" />
          <input type="search" placeholder="Search projects or tools" value={query} onChange={(e) => setQuery(e.target.value)} />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="x" /></button>
          )}
        </label>
      </div>
      <p className="project-results" aria-live="polite">
        Showing {shown.length} of {matches.length} project{matches.length === 1 ? '' : 's'}
        {filter !== 'All' && ` in ${filter}`}{q && ` matching “${query.trim()}”`}
      </p>

      {matches.length === 0 ? (
        <div className="empty-state">
          <p>No projects match that search.</p>
          <button className="button button-secondary" onClick={() => { setQuery(''); setFilter('All'); }}>Reset filters</button>
        </div>
      ) : (
        <div className="project-grid">
          {shown.map((p) => <ProjectCard key={p.title} project={p} onOpen={onOpen} />)}
        </div>
      )}
      {matches.length > limit && (
        <div className="project-more">
          <button className="button button-secondary" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
            Show more projects <Icon name="chevron" />
          </button>
        </div>
      )}
    </Reveal>
  );
}

/* ---------- contact + footer ---------- */

function Contact() {
  return (
    <footer className="footer">
      <Reveal className="card section" id="contact" aria-labelledby="contact-title">
        <SectionHead
          tag="Contact"
          id="contact-title"
          title="Let's talk about graduate roles."
          lead="I'm open to 2027 electrical, controls and engineering graduate roles across Australia. Email is the quickest way to reach me."
        />
        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}><Icon name="mail" /> {profile.email}</a>
          <a className="button button-secondary" href={profile.linkedin}><Icon name="linkedin" /> LinkedIn</a>
          <a className="button button-secondary" href={profile.resume}><Icon name="download" /> Resume (PDF)</a>
        </div>
      </Reveal>
      <div className="footer-bar">
        <span className="footer-brand"><span className="brand-mark" aria-hidden="true">{profile.initials}</span> {profile.name}</span>
        <span>© {new Date().getFullYear()} · {profile.location}</span>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <a className="back-to-top" href="#top" aria-label="Back to top"><Icon name="up" /></a>
  );
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);
  if (!image) return null;
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={image.alt}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.alt}</figcaption>
      </figure>
      <button className="lightbox-close" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
    </div>
  );
}

/* ---------- app ---------- */

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function App() {
  const [zoomed, setZoomed] = useState(null);
  const close = useCallback(() => setZoomed(null), []);
  const active = useActiveSection(SECTION_IDS);
  return (
    <>
      <Topbar active={active} />
      <main className="container" id="main">
        <Hero />
        <About />
        <Skills />
        <Projects onOpen={setZoomed} />
      </main>
      <div className="container">
        <Contact />
      </div>
      <BackToTop />
      <Lightbox image={zoomed} onClose={close} />
    </>
  );
}
