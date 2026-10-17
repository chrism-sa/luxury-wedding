// Pakai: node --env-file=.env scripts/generate-links.mjs guests.txt
import { createCipheriv, createHash, randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';

const pass = process.env.VITE_GUEST_KEY;
const site = (process.env.SITE_URL || 'https://charisita.com').replace(/\/$/, '');
if (!pass) { console.error('Isi VITE_GUEST_KEY di .env'); process.exit(1); }

const key = createHash('sha256').update(pass).digest();
const b64u = (b) => b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const names = readFileSync(process.argv[2] || 'guests.txt', 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);

for (const name of names) {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([c.update(name, 'utf8'), c.final()]);
  console.log(`${name}\t${site}/${b64u(Buffer.concat([iv, enc, c.getAuthTag()]))}`);
}
