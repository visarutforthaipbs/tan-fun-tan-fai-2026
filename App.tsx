import React, { useState, createContext, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const HazePage = lazy(() => import('./pages/HazePage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage'));
const SurvivalPage = lazy(() => import('./pages/SurvivalPage'));
const ActionPage = lazy(() => import('./pages/ActionPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));

interface NewcomerContextType {
  isNewcomer: boolean;
  setIsNewcomer: (value: boolean) => void;
}

export const NewcomerContext = createContext<NewcomerContextType>({
  isNewcomer: false,
  setIsNewcomer: () => { },
});

// Page Wrapper for transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/haze-101" element={<PageWrapper><HazePage /></PageWrapper>} />
        <Route path="/tracker" element={<PageWrapper><TrackerPage /></PageWrapper>} />
        <Route path="/survival" element={<PageWrapper><SurvivalPage /></PageWrapper>} />
        <Route path="/action" element={<PageWrapper><ActionPage /></PageWrapper>} />
        <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicyPage /></PageWrapper>} />
        <Route path="/about-us" element={<PageWrapper><AboutUsPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isNewcomer, setIsNewcomer] = useState(true);

  return (
    <BrowserRouter>
      <NewcomerContext.Provider value={{ isNewcomer, setIsNewcomer }}>
        <div className="min-h-screen font-sans text-brand-black bg-brand-smoke selection:bg-brand-orange selection:text-white">
          <header>
            <Header />
          </header>
          <ScrollToTop />

          <main>
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </main>

          <Footer />
        </div>
      </NewcomerContext.Provider>
    </BrowserRouter>
  );
};

export default App;