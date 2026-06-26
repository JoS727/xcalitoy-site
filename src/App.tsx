import { Router, Route, Switch, useLocation } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import Home from './pages/Home';
import SongPage from './pages/SongPage';
import Merch from './pages/Merch';
import Blog from './pages/Blog';
import About from './pages/About';
import EPK from './pages/EPK';

const navLinks = [
  { href: '/', label: 'Music' },
  { href: '/about', label: 'About' },
  { href: '/epk', label: 'EPK' },
  { href: '/blog', label: 'Journal' },
  { href: '/merch', label: 'Merch' },
];

function NavLink({ href, label, className = 'site-nav__link' }: { href: string; label: string; className?: string }) {
  const [, navigate] = useLocation();

  return (
    <a
      href={`#${href}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {label}
    </a>
  );
}

function Navigation() {
  return (
    <header className="site-nav-wrap">
      <div className="container site-nav">
        <div className="site-nav__brand">
          <NavLink href="/" label="Joseph Calitoy" className="site-nav__brand-mark" />
          <span className="site-nav__brand-sub">xcalitoy.com</span>
        </div>
        <nav className="site-nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <a href="https://open.spotify.com/album/5P8XnbH0PEqtNq9bRed1I1?si=12vIiVzeRrqGoqY7Qr_8HQ" target="_blank" rel="noreferrer" className="btn btn--accent site-nav__cta">
            Stream Lioness Lost
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <Router hook={useHashLocation}>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/epk" component={EPK} />
        <Route path="/music/:slug" component={SongPage} />
        <Route path="/lyrics/:slug" component={SongPage} />
        <Route path="/merch" component={Merch} />
        <Route path="/blog" component={Blog} />
        <Route>
          <div className="container section" style={{ textAlign: 'center' }}>
            <h1>404</h1>
            <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>Page not found.</p>
            <NavLink href="/" label="← Home" className="btn" />
          </div>
        </Route>
      </Switch>
      <footer>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '.75rem', alignItems: 'center' }}>
          <span>© {new Date().getFullYear()} Joseph Calitoy · Wicked Youth Goods</span>
          <span style={{ display: 'flex', gap: '.9rem', flexWrap: 'wrap' }}>
            <NavLink href="/about" label="About" className="footer-link" />
            <NavLink href="/epk" label="EPK" className="footer-link" />
            <NavLink href="/blog" label="Journal" className="footer-link" />
            <NavLink href="/merch" label="Merch" className="footer-link" />
          </span>
        </div>
      </footer>
    </Router>
  );
}
