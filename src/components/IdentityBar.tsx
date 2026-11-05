
import { useEffect, useState } from 'react';

const IDENTITIES: { label: string; href: string; match: RegExp }[] = [
  { label: 'AGENCY', href: 'https://calitoy.org', match: /^\/?(agency)?$/ },
  { label: 'SONGWRITER', href: 'https://xcalitoy.com', match: /^\/?(home)?$/ },
  { label: 'CONSULTANT', href: 'https://josephcalitoy.com', match: /consultant/ },
  { label: 'AUTHOR', href: 'https://author.calitoy.com', match: /author/ },
  { label: 'ARTIST', href: 'https://art.calitoy.com', match: /artist/ },
];

export function IdentityBar({ active }: { active: string }) {
  return (
    <nav className="identity-nav" aria-label="The five identities">
      {IDENTITIES.map((i) => (
        <a key={i.label} href={i.href} className={i.label === active ? 'active' : ''}
           aria-current={i.label === active ? 'page' : undefined}>{i.label}</a>
      ))}
    </nav>
  );
}
