export interface Song {
  slug: string;
  title: string;
  era: string;
  status: 'needs-transcription' | 'partial' | 'ready';
  summary: string;
  themes: string[];
  coverArt: string;
  embedUrl?: string;
  appleMusicUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  lyrics?: string;
  notes?: string;
}

export interface Playlist {
  slug: string;
  title: string;
  summary: string;
  soundcloudUrl: string;
  note?: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface JournalEntry {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
}

export const links = {
  instagram: 'https://www.instagram.com/josephcalitoy/',
  tiktok: 'https://www.tiktok.com/@that.joemad',
  soundcloud: 'https://soundcloud.com/calitoy',
  spotifyAlbum: 'https://open.spotify.com/album/5P8XnbH0PEqtNq9bRed1I1?si=12vIiVzeRrqGoqY7Qr_8HQ',
  merch: '#/merch',
  book: 'mailto:joseph@tarosyn.com?subject=Book%20Joseph%20Calitoy',
  blog: '#/blog',
  epk: '#/epk',
  about: '#/about',
  home: 'https://josephcalitoy.com',
  legacyHome: 'https://xcalitoy.com',
};

export const artistProfile = {
  name: 'Joseph Calitoy',
  alias: 'CaliToy',
  siteName: 'xcalitoy.com',
  tagline: 'Dark pop, night-drive confessionals, and pressure-heavy records built to linger.',
  featuredRelease: 'Lioness Lost',
  featuredReleaseArt: '/calitoy-cover.jpg',
  bio: 'Joseph Calitoy is a California artist shaping moody, melodic records that sit somewhere between confession, cinema, ambition, and aftermath. Under the CaliToy name, he builds songs that feel intimate on first listen and larger every time you come back.',
  intro: 'The official home for the music, visuals, lyrics, and the world that keeps unfolding around the catalog.',
  featuredReleaseNote: 'Current featured release: Lioness Lost by Calitoy.',
  knownSourceNote: 'Start with the featured songs, move through the archive, then stay for the playlists, lyrics, and press-ready materials.',
  location: 'California',
  contactEmail: 'joseph@tarosyn.com',
};

const placeholder = `Lyrics coming soon.`;

export const songs: Song[] = [
  {
    slug: 'snow',
    title: 'Snow',
    era: 'SoundCloud single',
    status: 'needs-transcription',
    summary: 'A cold-night record that drifts through memory and distance without ever losing its pulse.',
    themes: ['memory', 'atmosphere', 'winter'],
    coverArt: '/lioness-cover.png',
    soundcloudUrl: 'https://soundcloud.com/calitoy/snow',
    lyrics: placeholder,
  },
  {
    slug: 'happy-when-im-rich',
    title: "Happy When I'm Rich",
    era: 'SoundCloud single',
    status: 'needs-transcription',
    summary: 'Ambition with a smirk—sharp, restless, and locked on the version of success that finally feels earned.',
    themes: ['ambition', 'hustle', 'self-belief'],
    coverArt: '/calitoy-cover.jpg',
    soundcloudUrl: 'https://soundcloud.com/calitoy/happy-when-im-rich',
    lyrics: placeholder,
  },
  {
    slug: 'matter-mp3',
    title: 'Matter',
    era: 'SoundCloud single',
    status: 'needs-transcription',
    summary: 'Heavy-hearted and hypnotic, built around the feeling that presence can weigh as much as absence.',
    themes: ['weight', 'presence', 'duality'],
    coverArt: '/calitoy-cover.jpg',
    soundcloudUrl: 'https://soundcloud.com/calitoy/matter-mp3',
    lyrics: placeholder,
  },
  {
    slug: 'its-time-for-a-better-world',
    title: "It's time for a better world",
    era: 'SoundCloud single',
    status: 'needs-transcription',
    summary: 'A hopeful transmission from the edge—idealistic, urgent, and bigger than the room it starts in.',
    themes: ['hope', 'change', 'vision'],
    coverArt: '/placeholder-cover-1.svg',
    soundcloudUrl: 'https://soundcloud.com/calitoy/its-time-for-a-better-world',
    lyrics: placeholder,
  },
  {
    slug: 'disbelief',
    title: 'Disbelief',
    era: 'SoundCloud single',
    status: 'needs-transcription',
    summary: 'Tense and clear-eyed, like trying to hold onto the truth while everything around you bends.',
    themes: ['friction', 'truth', 'tension'],
    coverArt: '/placeholder-cover-2.svg',
    soundcloudUrl: 'https://soundcloud.com/calitoy/disbelief',
    lyrics: placeholder,
  },
  {
    slug: 'a-loyal-dog',
    title: 'A Loyal Dog',
    era: 'SoundCloud episode',
    status: 'needs-transcription',
    summary: 'A character piece with devotion at its center—part story, part confession, part late-night signal.',
    themes: ['story', 'character', 'devotion'],
    coverArt: '/placeholder-cover-3.svg',
    soundcloudUrl: 'https://soundcloud.com/calitoy/a-loyal-dog',
    lyrics: placeholder,
  },
  {
    slug: 'show-must-go-on',
    title: 'Show Must Go On',
    era: 'SoundCloud single',
    status: 'needs-transcription',
    summary: 'A survival record with stage lights in its eyes—worn down, still moving, still refusing to fold.',
    themes: ['resilience', 'performance', 'momentum'],
    coverArt: '/placeholder-cover-1.svg',
    soundcloudUrl: 'https://soundcloud.com/calitoy/show-must-go-on-mp3',
    lyrics: placeholder,
  },
];

export const playlists: Playlist[] = [
  {
    slug: 'roses',
    title: 'Roses',
    summary: 'A romantic and bruised playlist—soft edges, long nights, and songs that leave a stain.',
    soundcloudUrl: 'https://soundcloud.com/calitoy/sets/roses',
    note: 'A mood piece built for after-hours listening.',
  },
  {
    slug: 'seven',
    title: 'Seven',
    summary: 'A curated run of records that feels personal, symbolic, and close to the core of the CaliToy world.',
    soundcloudUrl: 'https://soundcloud.com/calitoy/sets/seven',
  },
  {
    slug: 'dance-play',
    title: 'Dance & Play',
    summary: 'Movement-first selections with flirt, rhythm, and a little chaos underneath the shine.',
    soundcloudUrl: 'https://soundcloud.com/calitoy/sets/dance-play',
  },
  {
    slug: 'paper-boy',
    title: 'Paper Boy',
    summary: 'A hustle-minded set wired with tension, motion, and the hunger to keep stacking meaning.',
    soundcloudUrl: 'https://soundcloud.com/calitoy/sets/paper-boy',
    note: 'Lean, driven, and built for replay.',
  },
  {
    slug: 'djs',
    title: 'DJs',
    summary: 'A crate of club instincts, selector energy, and records meant to hit hard in the right room.',
    soundcloudUrl: 'https://soundcloud.com/calitoy/sets/djs',
    note: 'Curated like a late set with no filler.',
  },
];

export const highlights: Highlight[] = [
  {
    title: 'Late-night catalog',
    description: 'Songs made for the hours when everything gets louder, slower, and more honest.',
  },
  {
    title: 'A real artist world',
    description: 'Music, lyrics, playlists, visuals, and story threads built to feel like one universe instead of disconnected uploads.',
  },
  {
    title: 'Independent and intentional',
    description: 'Every page keeps the focus on voice, mood, and the long arc behind the releases.',
  },
];

export const journalEntries: JournalEntry[] = [
  {
    slug: 'welcome-to-xcalitoy',
    title: 'Welcome to xcalitoy.com',
    date: 'Now streaming',
    excerpt: 'A proper home for the songs, the lyrics, the visuals, and the pieces around the releases.',
    body: [
      'This site is meant to feel like the actual front door to the Calitoy world, not just a list of links.',
      'The music stays at the center, but the archive matters too: lyrics, visuals, notes, and the shape of what each release is trying to say.',
      'If you are new here, start with the featured songs, then move through the playlists and track pages. The rest will keep opening up from there.',
    ],
  },
  {
    slug: 'building-the-world-around-the-records',
    title: 'Building the world around the records',
    date: 'In progress',
    excerpt: 'The goal is bigger than singles — every release should feel connected to a fuller atmosphere.',
    body: [
      'A record can hit on its own, but it lands harder when the artwork, writing, and surrounding pages all point in the same direction.',
      'That is the point of xcalitoy.com: to give the catalog a place that feels designed, authored, and worth staying inside for a while.',
      'More drops, more lyrics, and more visual material will keep stacking here over time.',
    ],
  },
];

export function getSong(slug: string): Song | undefined {
  return songs.find((s) => s.slug === slug);
}

export function getJournalEntry(slug: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.slug === slug);
}


export const galleryImages: GalleryImage[] = [
  { src: '/gallery/joseph-calitoy-graffiti-portrait.jpg', alt: 'Joseph Calitoy in a red hoodie seated in front of graffiti' },
  { src: '/calitoy-cover.jpg', alt: 'Joseph Calitoy portrait' },
  { src: '/gallery/performance-01.jpg', alt: 'Calitoy performing live under blue stage light' },
  { src: '/gallery/performance-02.jpg', alt: 'Calitoy live performance portrait under red lighting' },
  { src: '/gallery/performance-03.jpg', alt: 'Calitoy singing into microphone on stage' },
  { src: '/gallery/performance-05.jpg', alt: 'Calitoy side-angle live performance photo' },
  { src: '/gallery/performance-06.jpg', alt: 'Calitoy performing with eyes closed under violet light' },
  { src: '/gallery/performance-07.jpg', alt: 'Calitoy intense live vocal performance portrait' },
  { src: '/gallery/performance-08.jpg', alt: 'Calitoy singing with both hands on the mic' },
  { src: '/gallery/performance-09.jpg', alt: 'Calitoy emotional live performance close-up' },
  { src: '/gallery/performance-10.jpg', alt: 'Calitoy performing in front of a crowd' },
];
