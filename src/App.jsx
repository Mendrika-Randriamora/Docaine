import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import DocsIndex from './pages/DocsIndex.jsx';
import DocPage from './pages/DocPage.jsx';
import About from './pages/About.jsx';
import Contribute from './pages/Contribute.jsx';
import NotFound from './pages/NotFound.jsx';
import { getLanguage, firstPagePath } from './lib/content.js';

// /docs/python  ->  première page de la documentation Python
function LanguageRedirect() {
  const { lang } = useParams();
  return getLanguage(lang) ? <Navigate to={firstPagePath(lang)} replace /> : <NotFound />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs" element={<DocsIndex />} />
        <Route path="docs/:lang" element={<LanguageRedirect />} />
        <Route path="docs/:lang/:section/:page" element={<DocPage />} />
        <Route path="a-propos" element={<About />} />
        <Route path="contribuer" element={<Contribute />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
