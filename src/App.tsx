import { useState } from 'react';
import { tactics } from './data/tactics';
import type { Technique } from './data/techniques';
import { techniques } from './data/techniques';

function App() {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  
  // Filter and sort techniques for a specific tactic
  const getTechniquesForTactic = (tacticId: string) => {
    return techniques.filter(tech => tech.tacticIds.includes(tacticId));
  };

  return (
    <div className="min-h-screen pb-12 bg-matrix-bg">
      {/* Header */}
      <header className="bg-matrix-header text-white py-6 shadow-md mb-8">
        <div className="container mx-auto px-4 max-w-[95%]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ISCM</h1>
              <p className="text-sm font-medium mt-1 text-gray-200">Indian Socio-technical Cyber Matrix</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="flex items-center text-xs font-medium">
                <span className="w-3 h-3 bg-domain-fin inline-block mr-1 rounded-sm"></span> Financial (FIN)
              </span>
              <span className="flex items-center text-xs font-medium">
                <span className="w-3 h-3 bg-domain-nfin inline-block mr-1 rounded-sm"></span> Non-Financial (NFIN)
              </span>
              <a href="https://github.com/JampaniKomal/ISCM" target="_blank" rel="noreferrer" className="text-sm border border-white px-4 py-1.5 hover:bg-white hover:text-matrix-header transition-colors ml-4 font-bold rounded-sm">
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-[95%]">
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
                <div className="bg-slate-50 border border-slate-200 p-3 mt-4 rounded-sm italic text-gray-600">
                  <span className="font-semibold text-gray-800 not-italic">Collaborative Origins:</span> The foundational architecture, initial taxonomy mapping, and v1.0 codebase of ISCM were developed through collaboration with an advanced AI agent (Gemini), intended to establish a professional, structured foundation for the global cybersecurity community.
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

        {/* Matrix Container */}
        <div className="overflow-x-auto pb-6 custom-scrollbar">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {tactics.map((tactic) => (
              <div key={tactic.id} className="w-[240px] shrink-0 border border-matrix-border bg-white shadow-sm flex flex-col rounded-sm">
                {/* Tactic Header */}
                <div 
                  className="bg-matrix-card p-3 border-b-4 border-matrix-header hover:bg-matrix-lightblue transition-colors group cursor-help rounded-t-sm"
                  title={tactic.description}
                >
                  <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-matrix-accent leading-tight mb-1">{tactic.name}</h3>
                  <div className="text-xs text-gray-500 font-mono font-semibold">{tactic.id}</div>
                </div>
                
                {/* Techniques List */}
                <div className="p-2 flex flex-col gap-2 flex-grow bg-slate-50 relative">
                  {getTechniquesForTactic(tactic.id).map((tech) => (
                    <button
                      key={`${tactic.id}-${tech.id}`}
                      onClick={() => setSelectedTechnique(tech)}
                      className="text-left bg-white border border-gray-200 p-2 text-sm hover:border-matrix-accent hover:shadow-md transition-all group relative rounded-sm"
                    >
                      <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-sm ${tech.domain === 'FIN' ? 'bg-domain-fin' : 'bg-domain-nfin'}`}></div>
                      <div className="pl-2 font-semibold text-gray-800 group-hover:text-matrix-accent leading-snug mb-1">{tech.name}</div>
                      <div className="pl-2 text-[11px] text-gray-500 font-mono tracking-wide">{tech.id}</div>
                    </button>
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

        {/* Technique Detail Modal */}
        {selectedTechnique && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in transition-all">
            <div className="bg-white max-w-2xl w-full rounded-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              <div className={`h-2.5 w-full ${selectedTechnique.domain === 'FIN' ? 'bg-domain-fin' : 'bg-domain-nfin'}`}></div>
              <div className="p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTechnique.name}</h2>
                    <div className="text-sm font-mono text-gray-500 mt-2 font-semibold bg-gray-100 px-2 py-1 inline-block rounded-sm">{selectedTechnique.id}</div>
                  </div>
                  <button 
                    onClick={() => setSelectedTechnique(null)}
                    className="text-gray-400 hover:text-gray-900 p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                
                <div className="prose prose-sm max-w-none text-gray-800">
                  <h3 className="text-lg font-bold mt-6 mb-3 border-b-2 border-gray-100 pb-2 text-matrix-header">Description</h3>
                  <p className="text-[15px] leading-relaxed">{selectedTechnique.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8 bg-gray-50 p-5 rounded-md border border-gray-200 shadow-inner">
                    <div>
                      <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Domain Classification</span>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold ${selectedTechnique.domain === 'FIN' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                        {selectedTechnique.domain === 'FIN' ? 'Financial (FIN)' : 'Non-Financial (NFIN)'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Associated Tactics</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedTechnique.tacticIds.map(tId => {
                           const parentTactic = tactics.find(t => t.id === tId);
                           return (
                            <span key={tId} className="inline-flex text-xs bg-white border border-gray-300 px-2.5 py-1 rounded-sm text-gray-700 font-mono shadow-sm" title={parentTactic?.name}>
                              {tId}
                            </span>
                           );
                        })}
                      </div>
                    </div>
                    {selectedTechnique.platforms && selectedTechnique.platforms.length > 0 && (
                      <div className="col-span-2 sm:col-span-1">
                        <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Platforms</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedTechnique.platforms.map(platform => (
                            <span key={platform} className="inline-flex text-[11px] bg-slate-200 px-2 py-0.5 rounded text-slate-700">{platform}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedTechnique.dataSources && selectedTechnique.dataSources.length > 0 && (
                      <div className="col-span-2 sm:col-span-1">
                        <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Data Sources</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedTechnique.dataSources.map(ds => (
                            <span key={ds} className="inline-flex text-[11px] bg-slate-200 px-2 py-0.5 rounded text-slate-700">{ds}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {(() => {
                  const parentWithMitigation = tactics.find(t => selectedTechnique.tacticIds.includes(t.id) && t.mitigations);
                  if (parentWithMitigation) {
                    return (
                      <div className="mt-8 text-sm text-gray-800 bg-matrix-lightblue p-5 rounded-sm border-l-4 border-matrix-accent shadow-sm">
                        <h4 className="font-bold text-matrix-header mb-1 text-xs uppercase tracking-wider">Mitigation Strategy (from {parentWithMitigation.name})</h4>
                        <p className="leading-relaxed">{parentWithMitigation.mitigations}</p>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="mt-6 text-xs text-center text-gray-400">
                  <a href="https://github.com/JampaniKomal/ISCM" target="_blank" rel="noreferrer" className="hover:text-matrix-accent underline">Contribute to ISCM openly on GitHub</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
