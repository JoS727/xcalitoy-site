import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('.');
const outDir = resolve(root, 'dist');
const files = [
  '.htaccess',
  'favicon.svg',
  'index.html',
  'placeholder-cover-1.svg',
  'placeholder-cover-2.svg',
  'placeholder-cover-3.svg',
  'assets',
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const file of files) {
  await cp(resolve(root, file), resolve(outDir, file), { recursive: true });
}

console.log('Built static site into dist/');
