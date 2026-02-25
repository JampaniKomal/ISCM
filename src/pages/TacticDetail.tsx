import { useParams, Link, useNavigate } from 'react-router-dom';
import { tactics } from '../data/tactics';
import { techniques } from '../data/techniques';

export default function TacticDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const tactic = tactics.find(t => t.id === id);

  if (!tactic) {
    return (
      <div className="bg-white p-8 rounded shadow-sm text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tactic Not Found</h2>
        <p className="text-gray-600 mb-6">The requested Tactic ID ({id}) does not exist in the ISCM taxonomy.</p>
        <button onClick={() => navigate('/')} className="bg-matrix-header text-white px-4 py-2 rounded-sm hover:bg-matrix-accent transition-colors">
          Return to Matrix
        </button>
      </div>
    );
  }

  // Get all techniques mapped to this tactic
  const mappedTechniques = techniques.filter(tech => tech.tacticIds.includes(tactic.id));

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mb-12">
      <div className="h-2.5 w-full bg-matrix-header"></div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{tactic.name}</h2>
              <span className="text-sm font-mono text-gray-700 bg-gray-100 border border-gray-300 px-2 py-1 rounded-sm shadow-sm">{tactic.id}</span>
            </div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold mt-2 ${
                  tactic.domain === 'FIN' ? 'bg-green-100 text-green-800 border border-green-200' : 
                  tactic.domain === 'NFIN' ? 'bg-red-100 text-red-800 border border-red-200' : 
                  'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  Domain: {tactic.domain === 'BOTH' ? 'Financial & Non-Financial (BOTH)' : tactic.domain === 'FIN' ? 'Financial (FIN)' : 'Non-Financial (NFIN)'}
            </span>
          </div>
          <Link to="/" className="text-sm font-medium text-matrix-accent hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Matrix
          </Link>
        </div>
        
        <div className="prose prose-sm max-w-none text-gray-800">
          <h3 className="text-xl font-bold mt-8 mb-3 border-b-2 border-gray-100 pb-2 text-matrix-header">Description</h3>
          <p className="text-[16px] leading-relaxed">{tactic.description}</p>
        </div>
        
        {tactic.mitigations && (
          <div className="mt-8 text-sm text-gray-800 bg-matrix-lightblue p-6 rounded-sm border-l-4 border-matrix-accent shadow-sm">
            <h4 className="font-bold text-matrix-header mb-2 text-sm uppercase tracking-wider">Tactic Mitigation Strategy</h4>
            <p className="leading-relaxed text-[15px]">{tactic.mitigations}</p>
          </div>
        )}

        <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-100 pb-2 text-matrix-header">Techniques under {tactic.name}</h3>
            {mappedTechniques.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mappedTechniques.map(tech => (
                        <Link 
                            key={tech.id} 
                            to={`/techniques/${tech.id}`}
                            className="block p-4 bg-gray-50 border border-gray-200 rounded-sm hover:border-matrix-accent hover:shadow-md transition-all group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${tech.domain === 'FIN' ? 'bg-domain-fin' : 'bg-domain-nfin'}`}></div>
                            <h4 className="font-bold text-gray-900 group-hover:text-matrix-accent mb-1 ml-2">{tech.name}</h4>
                            <div className="text-xs text-gray-500 font-mono ml-2 mb-3">{tech.id}</div>
                            <p className="text-sm text-gray-600 line-clamp-2 ml-2">{tech.description}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No techniques are currently mapped to this tactic.</p>
            )}
        </div>
      </div>
    </div>
  );
}
