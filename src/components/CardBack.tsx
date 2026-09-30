import { useId, useMemo } from 'react';

export type EnergyId = 'moonlit-oracle' | 'cosmic-chaos' | 'solar-sovereign' | 'void-walker';

export interface Aesthetic {
  /** 1 = Accurate … 5 = Chaos (mirrors the in-app Style slider) */
  style: number;
  /** 1 = Dark … 5 = Light */
  brightness: number;
  /** 1 = Detailed … 5 = Abstract */
  detail: number;
}

export interface Energy {
  id: EnergyId;
  name: string;
  tagline: string;
  desc: string;
  traits: string[];
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  glyph: 'moon' | 'spiral' | 'sun' | 'eye';
  defaults: Aesthetic;
}

export const ENERGIES: Energy[] = [
  {
    id: 'moonlit-oracle',
    name: 'Moonlit Oracle',
    tagline: 'Intuition · Stillness · Silver light',
    desc: 'You read the room before anyone speaks. Quiet, precise, lunar. Your back is all fine lines and cool light.',
    traits: ['Intuitive', 'Precise', 'Calm'],
    primary: '#00d4ff',
    secondary: '#b8f3ff',
    dark: '#03121a',
    light: '#1d4a5c',
    glyph: 'moon',
    defaults: { style: 1, brightness: 2, detail: 1 },
  },
  {
    id: 'cosmic-chaos',
    name: 'Cosmic Chaos',
    tagline: 'Change · Rebellion · Electric violet',
    desc: 'You break patterns for a living. Restless, magnetic, a little dangerous. Your back spins off its own axis.',
    traits: ['Restless', 'Magnetic', 'Wild'],
    primary: '#7b2fff',
    secondary: '#00d4ff',
    dark: '#0d0420',
    light: '#3b1a78',
    glyph: 'spiral',
    defaults: { style: 5, brightness: 3, detail: 4 },
  },
  {
    id: 'solar-sovereign',
    name: 'Solar Sovereign',
    tagline: 'Will · Radiance · Crowned gold',
    desc: 'You walk in and the lights adjust. Bold, warm, unapologetic. Your back glows like it knows your name.',
    traits: ['Bold', 'Radiant', 'Driven'],
    primary: '#ffc857',
    secondary: '#7b2fff',
    dark: '#140a02',
    light: '#5a3a10',
    glyph: 'sun',
    defaults: { style: 2, brightness: 5, detail: 2 },
  },
  {
    id: 'void-walker',
    name: 'Void Walker',
    tagline: 'Shadow · Depth · Deep space',
    desc: 'You are comfortable in the dark because you have been there. Private, deep, unreadable. Your back is mostly silence.',
    traits: ['Private', 'Deep', 'Unshaken'],
    primary: '#9d7bff',
    secondary: '#00d4ff',
    dark: '#010103',
    light: '#1a1530',
    glyph: 'eye',
    defaults: { style: 3, brightness: 1, detail: 5 },
  },
];

export function getEnergy(id: EnergyId | null | undefined): Energy | undefined {
  return ENERGIES.find((e) => e.id === id);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
}

/** Small deterministic PRNG so the same inputs always render the same card. */
function seeded(seedText: string) {
  let h = 1779033703 ^ seedText.length;
  for (let i = 0; i < seedText.length; i++) {
    h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

const W = 300;
const H = 500;
const CX = W / 2;
const CY = H / 2 - 10;

function Glyph({ kind, color, accent, maskId }: { kind: Energy['glyph']; color: string; accent: string; maskId: string }) {
  switch (kind) {
    case 'moon':
      return (
        <g>
          <mask id={maskId}>
            <rect x={CX - 40} y={CY - 40} width="80" height="80" fill="#fff" />
            <circle cx={CX + 13} cy={CY - 9} r="25" fill="#000" />
          </mask>
          <circle cx={CX} cy={CY} r="30" fill={color} mask={`url(#${maskId})`} />
          <circle cx={CX} cy={CY} r="36" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.7" />
        </g>
      );
    case 'spiral': {
      const pts: string[] = [];
      for (let i = 0; i <= 160; i++) {
        const t = (i / 160) * Math.PI * 6;
        const r = 2 + t * 1.75;
        pts.push(`${(CX + Math.cos(t) * r).toFixed(1)},${(CY + Math.sin(t) * r).toFixed(1)}`);
      }
      return (
        <g>
          <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx={CX} cy={CY} r="3.5" fill={accent} />
        </g>
      );
    }
    case 'sun':
      return (
        <g>
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const r1 = 22;
            const r2 = i % 2 ? 34 : 42;
            return (
              <line
                key={i}
                x1={CX + Math.cos(a) * r1}
                y1={CY + Math.sin(a) * r1}
                x2={CX + Math.cos(a) * r2}
                y2={CY + Math.sin(a) * r2}
                stroke={color}
                strokeWidth={i % 2 ? 1.2 : 2.2}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={CX} cy={CY} r="17" fill={color} />
          <circle cx={CX} cy={CY} r="9" fill="none" stroke={accent} strokeWidth="1.4" />
        </g>
      );
    case 'eye':
    default:
      return (
        <g>
          <path
            d={`M ${CX - 40} ${CY} Q ${CX} ${CY - 30} ${CX + 40} ${CY} Q ${CX} ${CY + 30} ${CX - 40} ${CY} Z`}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <circle cx={CX} cy={CY} r="11" fill={color} />
          <circle cx={CX} cy={CY} r="4" fill={accent} />
        </g>
      );
  }
}

interface CardBackProps {
  energy: Energy;
  aesthetic: Aesthetic;
  name?: string;
  className?: string;
  title?: string;
}

/** Procedural SVG mock-up of a Tarosyn Card Back. Purely presentational. */
export default function CardBack({ energy, aesthetic, name, className, title }: CardBackProps) {
  const uid = useId().replace(/:/g, '');
  const { style, brightness, detail } = aesthetic;

  const art = useMemo(() => {
    const rand = seeded(`${energy.id}|${style}|${detail}`);
    const chaos = (style - 1) / 4; // 0 … 1
    const t = (brightness - 1) / 4;
    const bgInner = mix(energy.dark, energy.light, 0.35 + t * 0.65);
    const bgOuter = mix('#000000', energy.dark, 0.6 + t * 0.4);
    const rings = [6, 5, 4, 3, 2][detail - 1];
    const rays = [36, 24, 16, 10, 6][detail - 1];
    const stars = Array.from({ length: 14 + Math.round(chaos * 26) }, () => ({
      x: 22 + rand() * (W - 44),
      y: 22 + rand() * (H - 44),
      r: 0.4 + rand() * (0.8 + chaos * 1.4),
      o: 0.25 + rand() * 0.6,
    }));
    const ringData = Array.from({ length: rings }, (_, i) => ({
      r: 52 + i * (detail >= 4 ? 26 : 16),
      rot: (i % 2 ? 1 : -1) * chaos * (8 + rand() * 22) * (i + 1),
      dash: detail <= 2 ? `${2 + (i % 3)} ${3 + i}` : undefined,
      dx: (rand() - 0.5) * chaos * 16,
      dy: (rand() - 0.5) * chaos * 16,
    }));
    return { chaos, t, bgInner, bgOuter, rays, stars, ringData };
  }, [energy, style, brightness, detail]);

  const glow = 0.35 + art.t * 0.5;
  const label = title ?? `${energy.name} Tarosyn Card Back preview`;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="45%" r="75%">
          <stop offset="0%" stopColor={art.bgInner} />
          <stop offset="100%" stopColor={art.bgOuter} />
        </radialGradient>
        <radialGradient id={`halo-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={energy.primary} stopOpacity={glow} />
          <stop offset="100%" stopColor={energy.primary} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`frame-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="55%" stopColor={energy.primary} />
          <stop offset="100%" stopColor="#7b2fff" />
        </linearGradient>
        <filter id={`soft-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={2 + art.t * 2} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={`clip-${uid}`}>
          <rect x="0" y="0" width={W} height={H} rx="18" />
        </clipPath>
      </defs>

      <g clipPath={`url(#clip-${uid})`}>
        <rect width={W} height={H} fill={`url(#bg-${uid})`} />

        {art.stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={i % 3 ? '#ffffff' : energy.secondary} opacity={s.o} />
        ))}

        <circle cx={CX} cy={CY} r="150" fill={`url(#halo-${uid})`} />

        {/* Rays */}
        <g opacity={0.3 + art.t * 0.25} transform={`rotate(${art.chaos * 11} ${CX} ${CY})`}>
          {Array.from({ length: art.rays }, (_, i) => {
            const a = (i / art.rays) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={CX + Math.cos(a) * 48}
                y1={CY + Math.sin(a) * 48}
                x2={CX + Math.cos(a) * 138}
                y2={CY + Math.sin(a) * 138}
                stroke={i % 2 ? energy.secondary : energy.primary}
                strokeWidth={art.rays > 20 ? 0.5 : 1.1}
              />
            );
          })}
        </g>

        {/* Rings */}
        <g filter={`url(#soft-${uid})`}>
          {art.ringData.map((ring, i) => (
            <g key={i} transform={`rotate(${ring.rot} ${CX} ${CY}) translate(${ring.dx} ${ring.dy})`}>
              <circle
                cx={CX}
                cy={CY}
                r={ring.r}
                fill="none"
                stroke={i % 2 ? energy.secondary : energy.primary}
                strokeWidth={i === 0 ? 1.6 : 0.9}
                strokeDasharray={ring.dash}
                opacity={0.9 - i * 0.1}
              />
              {i % 2 === 0 && (
                <polygon
                  points={[0, 1, 2, 3]
                    .map((k) => {
                      const a = (k / 4) * Math.PI * 2 - Math.PI / 2;
                      return `${CX + Math.cos(a) * ring.r},${CY + Math.sin(a) * ring.r}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={energy.primary}
                  strokeWidth="0.6"
                  opacity="0.55"
                />
              )}
            </g>
          ))}
        </g>

        <g filter={`url(#soft-${uid})`}>
          <Glyph kind={energy.glyph} color={energy.primary} accent={energy.secondary} maskId={`m-${uid}`} />
        </g>

        {/* Mirrored top/bottom sigils — every card back reads the same upside down */}
        {[1, -1].map((dir) => (
          <g key={dir} transform={`translate(${CX} ${dir === 1 ? 62 : H - 62}) scale(1 ${dir})`} opacity="0.85">
            <path d="M -14 8 L 0 -10 L 14 8 Z" fill="none" stroke={energy.primary} strokeWidth="1.2" />
            <circle cx="0" cy="2" r="3" fill={energy.secondary} />
            <line x1="-46" y1="8" x2="-22" y2="8" stroke={energy.primary} strokeWidth="0.8" />
            <line x1="22" y1="8" x2="46" y2="8" stroke={energy.primary} strokeWidth="0.8" />
          </g>
        ))}
      </g>

      {/* Frame */}
      <rect x="1.5" y="1.5" width={W - 3} height={H - 3} rx="17" fill="none" stroke={`url(#frame-${uid})`} strokeWidth="3" />
      <rect x="12" y="12" width={W - 24} height={H - 24} rx="10" fill="none" stroke={energy.primary} strokeOpacity="0.45" strokeWidth="0.8" />
      {[[20, 20], [W - 20, 20], [20, H - 20], [W - 20, H - 20]].map(([x, y], i) => (
        <path
          key={i}
          d={`M ${x - 5} ${y} L ${x} ${y - 5} L ${x + 5} ${y} L ${x} ${y + 5} Z`}
          fill={energy.primary}
          opacity="0.9"
        />
      ))}

      <text
        x={CX}
        y={H - 96}
        textAnchor="middle"
        fill="#ffffff"
        fillOpacity="0.9"
        style={{ font: '600 11px Inter, sans-serif', letterSpacing: '0.5em' }}
      >
        TAROSYN
      </text>
      {name && (
        <text
          x={CX}
          y={H - 78}
          textAnchor="middle"
          fill={energy.secondary}
          fillOpacity="0.85"
          style={{ font: 'italic 400 12px "Playfair Display", Georgia, serif', letterSpacing: '0.08em' }}
        >
          {name.length > 26 ? `${name.slice(0, 25)}…` : name}
        </text>
      )}
    </svg>
  );
}
