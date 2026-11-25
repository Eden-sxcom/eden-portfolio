import React, { Suspense, lazy } from 'react';
import { useMotionEngine } from './hooks/useMotionEngine';
import { Preloader } from './components/Preloader';
import { TacticalNav } from './components/TacticalNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { EchoLanding } from './components/EchoLanding';
import { About } from './components/About';
import { SelectedExpeditions } from './components/SelectedExpeditions';
import { FieldArsenal } from './components/FieldArsenal';
import { Footer } from './components/Footer';
import TargetCursor from './TargetCursor';
import './styles/stage.css';

// Lazy-load Three.js 3D Compass to keep main entry chunk lightweight
const HeroCompass3D = lazy(() =>
  import('./components/HeroCompass3D').then((m) => ({ default: m.HeroCompass3D }))
);

export const App: React.FC = () => {
  const [isAppLoaded, setIsAppLoaded] = React.useState(false);
  useMotionEngine(isAppLoaded);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--color-canvas)' }}>
      {/* Tactical Dynamic Target Cursor */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        targetSelector=".cursor-target, [data-hover-reveal], [aria-haspopup], [aria-expanded], a, button"
        excludeSelector="#top-notch-header, #top-notch-header *, .notch-header-container, .notch-header-container *, .notch-dock-body, .notch-dock-body *, .notch-brand-anchor, .notch-brand-anchor *, .ag-panel, .ag-panel *, .accordion-gallery, .accordion-gallery *, .arsenal-gallery-wrapper, .arsenal-gallery-wrapper *, .no-cursor-target, .no-cursor-target *"
      />
      {/* Tactile Paper Noise Overlay */}
      <div className="paper-grain-overlay" aria-hidden="true" />

      {/* Preloader Screen */}
      <Preloader onComplete={() => setIsAppLoaded(true)} />

      {/* Tactical Right-Rail & Mobile Floating Navigation */}
      <TacticalNav />

      {/* Main Structural Content */}
      <Header />
      <main id="main-content">
        {/* Scroll stage: Echo landing -> black portal -> field log -> expeditions */}
        <div id="hero-stage-wrapper" className="hero-stage-wrapper">
          <EchoLanding isAppLoaded={isAppLoaded} />
          <About />
          <SelectedExpeditions />
          <ErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <HeroCompass3D isVisible={isAppLoaded} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <FieldArsenal />
      </main>
      <Footer />
    </div>
  );
};

export default App;
