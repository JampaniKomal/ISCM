import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-matrix-bg">
      <header className="bg-matrix-header text-white py-6 shadow-md mb-8">
        <div className="container mx-auto px-4 max-w-[95%]">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/" className="group">
                <h1 className="text-3xl font-bold tracking-tight group-hover:text-gray-200 transition-colors">ISCM</h1>
                <p className="text-sm font-medium mt-1 text-gray-200">Indian Socio-technical Cyber Matrix</p>
              </Link>
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

      <main className="container mx-auto px-4 max-w-[95%] flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-sm text-gray-500">
        <p>The ISCM framework is an open-source intelligence initiative.</p>
        <p className="mt-1">
           View the <a href="https://github.com/JampaniKomal/ISCM" className="text-matrix-accent hover:underline">GitHub Repository</a> down to contribute to the matrix.
        </p>
      </footer>
    </div>
  );
}
