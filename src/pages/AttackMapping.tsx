import { Link } from 'react-router-dom';
import { techniques } from '../data/techniques';
import { ATTACK_VERSION, attackSummary, attackUrl } from '../lib/attack';
import type { AttackReference } from '../types';

const DATA = `${import.meta.env.BASE_URL}data/`;

export function AttackBadge({ reference }: { reference: AttackReference }) {
  return (
    <a
      href={attackUrl(reference.id)}
      target="_blank"
      rel="noreferrer"
      title={`ATT&CK ${reference.domain === 'mobile' ? 'Mobile' : 'Enterprise'}: ${reference.relation === 'equivalent' ? 'equivalent behaviour' : 'covers part of this technique'}`}
      className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-sm border hover:underline ${
        reference.relation === 'equivalent'
          ? 'bg-matrix-lightblue border-matrix-accent text-matrix-header'
          : 'bg-white border-gray-300 text-gray-700'
      }`}
    >
      <span className="font-mono font-semibold">{reference.id}</span>
      <span>{reference.name}</span>
      {reference.domain === 'mobile' && <span className="text-[10px] uppercase tracking-wide text-gray-500">mobile</span>}
    </a>
  );
}

export default function AttackMapping() {
  const s = attackSummary(techniques);
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">ISCM and MITRE ATT&amp;CK</h2>
      <p className="text-gray-700 leading-relaxed max-w-4xl">
        Every ISCM technique is cross-referenced to the MITRE ATT&amp;CK techniques that describe the same behaviour,
        checked against ATT&amp;CK v{ATTACK_VERSION}. Where ATT&amp;CK describes only part of a technique, the part it does
        not describe is stated: that gap is the reason ISCM exists. ATT&amp;CK models intrusions into systems; much of the
        fraud that reaches Indian victims never touches a compromised system at all.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {[
          [s.techniques, 'ISCM techniques'],
          [s.withEquivalent, 'with an equivalent ATT&CK technique'],
          [s.partialOnly, 'only partly described by ATT&CK'],
          [s.attackTechniques, 'distinct ATT&CK techniques referenced'],
        ].map(([value, label]) => (
          <div key={label} className="bg-slate-50 border border-slate-200 rounded-sm p-4">
            <div className="text-2xl font-bold text-matrix-header">{value}</div>
            <div className="text-xs text-gray-600 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-700 mb-6">
        Download:{' '}
        <a className="text-matrix-accent hover:underline" href={`${DATA}iscm.json`}>ISCM as JSON</a> ·{' '}
        <a className="text-matrix-accent hover:underline" href={`${DATA}iscm-attack-enterprise-layer.json`}>ATT&amp;CK Navigator layer (Enterprise)</a> ·{' '}
        <a className="text-matrix-accent hover:underline" href={`${DATA}iscm-attack-mobile-layer.json`}>ATT&amp;CK Navigator layer (Mobile)</a>
        <span className="text-gray-500"> (open the layers in the <a className="hover:underline" href="https://mitre-attack.github.io/attack-navigator/" target="_blank" rel="noreferrer">ATT&amp;CK Navigator</a>)</span>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b-2 border-gray-200">
              <th className="py-2 pr-4">ISCM technique</th>
              <th className="py-2 pr-4">ATT&amp;CK</th>
              <th className="py-2">Not described by ATT&amp;CK</th>
            </tr>
          </thead>
          <tbody>
            {techniques.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 align-top">
                <td className="py-3 pr-4 min-w-[220px]">
                  <Link to={`/techniques/${t.id}`} className="font-semibold text-gray-900 hover:text-matrix-accent">
                    {t.name}
                  </Link>
                  <div className="text-[11px] font-mono text-gray-500 mt-0.5">
                    {t.id} · <span className={t.domain === 'FIN' ? 'text-domain-fin' : 'text-domain-nfin'}>{t.domain}</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-1.5">
                    {t.attack.map((a) => (
                      <AttackBadge key={a.id} reference={a} />
                    ))}
                  </div>
                </td>
                <td className="py-3 text-gray-700 min-w-[260px]">{t.attackGap ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Highlighted references are equivalent behaviour; plain ones cover part of the ISCM technique. MITRE ATT&amp;CK® is a
        registered trademark of The MITRE Corporation; ISCM is not affiliated with MITRE.
      </p>
    </div>
  );
}
