import { useParams, Link, useNavigate } from 'react-router-dom';
import { techniques } from '../data/techniques';
import { tactics } from '../data/tactics';

export default function TechniqueDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const technique = techniques.find(t => t.id === id);

  if (!technique) {
    return (
      <div className="bg-white p-8 rounded shadow-sm text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Technique Not Found</h2>
        <p className="text-gray-600 mb-6">The requested TTP ID ({id}) does not exist in the ISCM taxonomy.</p>
        <button onClick={() => navigate('/')} className="bg-matrix-header text-white px-4 py-2 rounded-sm hover:bg-matrix-accent transition-colors">
          Return to Matrix
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <div className={`h-2.5 w-full ${technique.domain === 'FIN' ? 'bg-domain-fin' : 'bg-domain-nfin'}`}></div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{technique.name}</h2>
              <span className="text-sm font-mono text-gray-700 bg-gray-100 border border-gray-300 px-2 py-1 rounded-sm shadow-sm">{technique.id}</span>
            </div>
          </div>
          <Link to="/" className="text-sm font-medium text-matrix-accent hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Matrix
          </Link>
        </div>
        
        <div className="prose prose-sm max-w-none text-gray-800">
          <h3 className="text-xl font-bold mt-6 mb-3 border-b-2 border-gray-100 pb-2 text-matrix-header">Description</h3>
          <p className="text-[16px] leading-relaxed">{technique.description}</p>
          
          <div className="grid grid-cols-2 gap-6 mt-8 bg-gray-50 p-6 rounded-md border border-gray-200 shadow-inner">
            <div>
              <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Domain Classification</span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold ${technique.domain === 'FIN' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                {technique.domain === 'FIN' ? 'Financial (FIN)' : 'Non-Financial (NFIN)'}
              </span>
            </div>
            
            <div>
              <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Associated Tactics</span>
              <div className="flex flex-wrap gap-2">
                {technique.tacticIds.map(tId => {
                   const parentTactic = tactics.find(t => t.id === tId);
                   return (
                    <span key={tId} className="inline-flex text-xs bg-white border border-gray-300 px-2.5 py-1.5 rounded-sm text-gray-700 font-mono shadow-sm" title={parentTactic?.name}>
                      {tId}: {parentTactic?.name}
                    </span>
                   );
                })}
              </div>
            </div>
            
            {technique.platforms && technique.platforms.length > 0 && (
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Platforms</span>
                <div className="flex flex-wrap gap-1.5">
                  {technique.platforms.map(platform => (
                    <span key={platform} className="inline-flex text-[12px] font-medium bg-slate-200 px-2.5 py-1 rounded text-slate-700 border border-slate-300">{platform}</span>
                  ))}
                </div>
              </div>
            )}
            
            {technique.dataSources && technique.dataSources.length > 0 && (
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Data Sources</span>
                <div className="flex flex-wrap gap-1.5">
                  {technique.dataSources.map(ds => (
                    <span key={ds} className="inline-flex text-[12px] font-medium bg-slate-200 px-2.5 py-1 rounded text-slate-700 border border-slate-300">{ds}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {(() => {
          const parentWithMitigation = tactics.find(t => technique.tacticIds.includes(t.id) && t.mitigations);
          if (parentWithMitigation) {
            return (
              <div className="mt-8 text-sm text-gray-800 bg-matrix-lightblue p-6 rounded-sm border-l-4 border-matrix-accent shadow-sm">
                <h4 className="font-bold text-matrix-header mb-2 text-sm uppercase tracking-wider">Mitigation Strategy (from {parentWithMitigation.name})</h4>
                <p className="leading-relaxed text-[15px]">{parentWithMitigation.mitigations}</p>
              </div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
}
