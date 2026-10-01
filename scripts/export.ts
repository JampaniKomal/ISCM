// Write ISCM's data as JSON, plus ATT&CK Navigator layers, into public/data/.
// Runs before every build (npm "prebuild"), so the published files always
// match the matrix on the site.

import { mkdirSync, writeFileSync } from 'node:fs';
import { tactics } from '../src/data/tactics';
import { techniques } from '../src/data/techniques';
import { ATTACK_VERSION, navigatorLayer } from '../src/lib/attack';

const out = new URL('../public/data/', import.meta.url);
mkdirSync(out, { recursive: true });

const write = (name: string, value: unknown) =>
  writeFileSync(new URL(name, out), JSON.stringify(value, null, 2) + '\n');

write('iscm.json', {
  name: 'Indian Socio-technical Cyber Matrix (ISCM)',
  url: 'https://jampanikomal.github.io/ISCM/',
  attackVersion: ATTACK_VERSION,
  tactics,
  techniques,
});
write('iscm-attack-enterprise-layer.json', navigatorLayer(techniques, 'enterprise'));
write('iscm-attack-mobile-layer.json', navigatorLayer(techniques, 'mobile'));

console.log(`public/data: ${tactics.length} tactics, ${techniques.length} techniques, 2 Navigator layers`);
