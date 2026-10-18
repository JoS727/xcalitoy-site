// Minimal typings + loader for the SoundCloud Widget API
// (https://developers.soundcloud.com/docs/api/html5-widget).

export interface SCSound {
  id: number;
  title?: string;
  permalink_url?: string;
  artwork_url?: string | null;
  duration?: number;
  genre?: string | null;
  tag_list?: string;
  user?: { username?: string; avatar_url?: string };
  publisher_metadata?: { artist?: string } | null;
}

export interface SCProgress {
  currentPosition: number;
  relativePosition: number;
  loadProgress: number;
}

export interface SCWidget {
  bind(event: string, listener: (data?: unknown) => void): void;
  unbind(event: string): void;
  play(): void;
  pause(): void;
  toggle(): void;
  next(): void;
  prev(): void;
  skip(index: number): void;
  seekTo(ms: number): void;
  setVolume(v: number): void;
  getSounds(cb: (sounds: SCSound[]) => void): void;
  getCurrentSound(cb: (sound: SCSound | null) => void): void;
  getCurrentSoundIndex(cb: (index: number) => void): void;
  getPosition(cb: (ms: number) => void): void;
  getDuration(cb: (ms: number) => void): void;
  isPaused(cb: (paused: boolean) => void): void;
}

interface SCGlobal {
  Widget: ((el: HTMLIFrameElement | string) => SCWidget) & {
    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
      FINISH: string;
      PLAY_PROGRESS: string;
      LOAD_PROGRESS: string;
      SEEK: string;
      ERROR: string;
    };
  };
}

declare global {
  interface Window {
    SC?: SCGlobal;
  }
}

const API_SRC = 'https://w.soundcloud.com/player/api.js';
let loader: Promise<SCGlobal> | null = null;

/** Loads the Widget API script once and resolves with `window.SC`. */
export function loadSoundCloudApi(): Promise<SCGlobal> {
  if (window.SC?.Widget) return Promise.resolve(window.SC);
  if (loader) return loader;
  loader = new Promise<SCGlobal>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = API_SRC;
    script.async = true;
    script.onload = () => (window.SC?.Widget ? resolve(window.SC) : reject(new Error('SC Widget API missing')));
    script.onerror = () => reject(new Error('Failed to load SoundCloud Widget API'));
    document.head.appendChild(script);
  }).catch((err) => {
    loader = null; // allow a retry on next mount
    throw err;
  });
  return loader;
}

/** Hidden-player embed URL for a SoundCloud track, playlist or profile. */
export function soundCloudEmbedUrl(url: string): string {
  const params = new URLSearchParams({
    url,
    auto_play: 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'false',
    show_reposts: 'false',
    show_teaser: 'false',
    visual: 'false',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
