import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TacticDetail from './pages/TacticDetail';
import TechniqueDetail from './pages/TechniqueDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tactics/:id" element={<TacticDetail />} />
        <Route path="techniques/:id" element={<TechniqueDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
