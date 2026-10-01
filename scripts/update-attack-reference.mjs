// Refresh src/data/attack-reference.json from MITRE's official ATT&CK STIX data.
//
//   node scripts/update-attack-reference.mjs [version]
//
// Keeps only what ISCM needs to validate and display its cross-references: the
// ATT&CK ID, name, domain, URL, and whether MITRE has deprecated or revoked the
// technique. The tests check every ATT&CK ID in src/data/techniques.ts against
// this file, so a typo or a retired technique fails the build.

import { writeFileSync } from "node:fs";

const BASE = "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master";
const DOMAINS = { enterprise: "enterprise-attack", mobile: "mobile-attack" };

async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

const index = await json(`${BASE}/index.json`);
const wanted = process.argv[2];
const techniques = {};
let version;

for (const [domain, collection] of Object.entries(DOMAINS)) {
  const entry = index.collections.find((c) => c.id && c.name?.toLowerCase().includes(domain));
  const versions = entry.versions.map((v) => v.version);
  version = wanted ?? versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];
  const bundle = await json(`${BASE}/${collection}/${collection}-${version}.json`);
  for (const object of bundle.objects) {
    if (object.type !== "attack-pattern") continue;
    const ref = (object.external_references ?? []).find((r) => r.source_name === "mitre-attack");
    if (!ref?.external_id) continue;
    techniques[ref.external_id] = {
      name: object.name,
      domain,
      url: ref.url,
      deprecated: Boolean(object.x_mitre_deprecated || object.revoked),
    };
  }
}

const sorted = Object.fromEntries(Object.entries(techniques).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })));
writeFileSync(
  new URL("../src/data/attack-reference.json", import.meta.url),
  JSON.stringify({ attackVersion: version, source: "https://github.com/mitre-attack/attack-stix-data", techniques: sorted }, null, 1) + "\n",
);
console.log(`ATT&CK v${version}: ${Object.keys(sorted).length} techniques`);
