import { Link } from 'react-router-dom';
import { tactics } from '../data/tactics';
import { techniques } from '../data/techniques';

export default function Home() {
  const getTechniquesForTactic = (tacticId: string) => {
    return techniques.filter(tech => tech.tacticIds.includes(tacticId));
  };

  return (
    <>
      <div className="mb-8 bg-white border border-matrix-border rounded-sm shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-matrix-header"></div>
        <div className="flex justify-between items-start">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">About ISCM Framework v1.0</h2>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                The Indian Socio-technical Cyber Matrix (ISCM) is an open-source taxonomy mapping the tactics, techniques, 
                and procedures (TTPs) used by cyber syndicates targeting Indian citizens and organizations. 
              </p>
              <p>
                <strong>Inspiration & Heritage:</strong> ISCM is deeply inspired by the structural rigor of the <a href="https://attack.mitre.org/" target="_blank" rel="noreferrer" className="text-matrix-accent hover:underline font-semibold">MITRE ATT&CK®</a> framework. While MITRE excels at enterprise network defense, ISCM is purpose-built to address the sociocentric nature of cyber fraud in India—where the primary vulnerability is human psychology rather than software exploits.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4 mt-5 rounded-sm">
                <h3 className="font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">Understanding the Taxonomy: FIN vs. NFIN</h3>
                <p className="mb-2 text-gray-700">Because Indian cyber incidents straddle both monetary theft and severe personal harassment, ISCM categorizes techniques into two strict domains:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <span className="font-bold text-green-700 bg-green-50 px-1 rounded">FIN (Financial):</span> The primary objective is the direct extraction, interception, or laundering of monetary assets. Examples: <span className="italic">Intercepting an OTP to drain a bank account, or routing stolen funds through mule networks.</span>
                  </li>
                  <li>
                    <span className="font-bold text-red-700 bg-red-50 px-1 rounded">NFIN (Non-Financial):</span> The primary objective is psychological manipulation, extortion, defamation, or forged identity creation. While money may be demanded as a ransom, the technique itself targets the person's reputation or emotions, not their bank vault directly. Examples: <span className="italic">Deepfake morphing, fake arrest warrants via Skype, or WhatsApp hijacking.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-matrix-lightblue border border-matrix-accent p-3 mt-4 rounded-sm text-gray-700 text-xs">
                <span className="font-semibold text-matrix-header italic">Collaborative Origins:</span> The foundational v1.0 architecture of ISCM was developed in collaboration with an advanced AI agent (Gemini), intended to establish a professional, structured foundation for the global cybersecurity community.
              </div>
            </div>
          </div>
          <div className="hidden lg:block text-right flex-shrink-0 ml-6">
            <a href="https://github.com/JampaniKomal/ISCM/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm shadow-sm text-white bg-matrix-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matrix-accent">
                Contribute on GitHub
            </a>
            <p className="text-xs text-gray-500 mt-2 text-center">ISCM requires community input.</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-6 custom-scrollbar">
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {tactics.map((tactic) => (
            <div key={tactic.id} className="w-[240px] shrink-0 border border-matrix-border bg-white shadow-sm flex flex-col rounded-sm">
              <div 
                className="bg-matrix-card p-3 border-b-4 border-matrix-header hover:bg-matrix-lightblue transition-colors group cursor-help rounded-t-sm"
                title={tactic.description}
              >
                <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-matrix-accent leading-tight mb-1">{tactic.name}</h3>
                <div className="text-xs text-gray-500 font-mono font-semibold">{tactic.id}</div>
              </div>
              
              <div className="p-2 flex flex-col gap-2 flex-grow bg-slate-50 relative">
                {getTechniquesForTactic(tactic.id).map((tech) => (
                  <Link
                    key={`${tactic.id}-${tech.id}`}
                    to={`/techniques/${tech.id}`}
                    className="block bg-white border border-gray-200 p-2 text-sm hover:border-matrix-accent hover:shadow-md transition-all group relative rounded-sm"
                  >
                    <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-sm ${tech.domain === 'FIN' ? 'bg-domain-fin' : 'bg-domain-nfin'}`}></div>
                    <div className="pl-2 font-semibold text-gray-800 group-hover:text-matrix-accent leading-snug mb-1">{tech.name}</div>
                    <div className="pl-2 text-[11px] text-gray-500 font-mono tracking-wide">{tech.id}</div>
                  </Link>
                ))}
                {getTechniquesForTactic(tactic.id).length === 0 && (
                    <div className="text-center p-4 text-xs text-gray-400 italic font-medium bg-gray-50/50 rounded-sm border border-dashed border-gray-200 mt-2">
                      No techniques documented.
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
