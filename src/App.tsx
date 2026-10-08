import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Manufacturing from './pages/Manufacturing'
import Solutions from './pages/Solutions'
import UseCases from './pages/UseCases'
import UseCaseDetail from './pages/UseCaseDetail'
import Features from './pages/Features'
import Enterprise from './pages/Enterprise'
import DrawingKnowledge from './pages/DrawingKnowledge'
import Resources from './pages/Resources'
import Checklist from './pages/Checklist'
import Guide from './pages/Guide'
import Compare from './pages/Compare'
import Example from './pages/Example'
import Pricing from './pages/Pricing'
import Company from './pages/Company'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

/** The 21 marketing routes from the approved site architecture, the Solutions hub, plus 404. */
const routes = [
  { path: '/', element: <Home /> },
  { path: '/product', element: <Product /> },
  { path: '/solutions', element: <Solutions /> },
  { path: '/manufacturing', element: <Manufacturing /> },
  { path: '/use-cases', element: <UseCases /> },
  { path: '/use-cases/engineering-drawing-review', element: <UseCaseDetail id={5} /> },
  { path: '/use-cases/drawing-revision-review', element: <UseCaseDetail id={6} /> },
  { path: '/use-cases/external-drawing-review', element: <UseCaseDetail id={7} /> },
  { path: '/use-cases/production-quality-handoff', element: <UseCaseDetail id={8} /> },
  { path: '/features', element: <Features /> },
  { path: '/enterprise', element: <Enterprise /> },
  { path: '/drawing-knowledge', element: <DrawingKnowledge /> },
  { path: '/resources', element: <Resources /> },
  { path: '/resources/drawing-readiness-checklist', element: <Checklist /> },
  { path: '/resources/engineering-drawing-revision-control', element: <Guide id={14} /> },
  { path: '/resources/supplier-drawing-review-guide', element: <Guide id={15} /> },
  { path: '/resources/ai-engineering-drawing-review', element: <Guide id={16} /> },
  { path: '/compare/pdm-vs-drawing-collaboration', element: <Compare /> },
  { path: '/resources/drawing-review-example', element: <Example /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/company', element: <Company /> },
  { path: '/contact', element: <Contact /> },
  { path: '/privacy-notice', element: <Legal which="privacy" /> },
  { path: '/terms-of-use', element: <Legal which="terms" /> },
  { path: '/cookie-preferences', element: <Legal which="cookies" /> },
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((r) => (
          // key by path so per-page state resets between routes sharing a component
          <Route key={r.path} path={r.path} element={<div key={r.path} className="page">{r.element}</div>} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
