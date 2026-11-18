import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ArGalleryPage from './pages/ArGalleryPage';
import TutorialPage from './pages/TutorialPage';
import BmcWorkspacePage from './pages/BmcWorkspacePage';
import QuizPage from './pages/QuizPage';
import AssessmentPage from './pages/AssessmentPage';

import { getItem, setItem, STORAGE_KEYS } from './utils/storage';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      if (pageParam) return pageParam;
      if (params.get('product') || params.get('ar')) return 'ar-gallery';
    }
    return 'home';
  });

  const [selectedProductId, setSelectedProductId] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prodParam = params.get('product');
      if (prodParam) return prodParam;
    }
    return getItem(STORAGE_KEYS.ACTIVE_PRODUCT, 'lighting-controller');
  });

  // Keep active product persisted
  useEffect(() => {
    if (selectedProductId) {
      setItem(STORAGE_KEYS.ACTIVE_PRODUCT, selectedProductId);
    }
  }, [selectedProductId]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage 
            setActivePage={setActivePage} 
            setSelectedProductId={setSelectedProductId} 
          />
        );
      case 'modules':
        return (
          <ModulesPage 
            setActivePage={setActivePage} 
            setSelectedProductId={setSelectedProductId} 
          />
        );
      case 'ar-gallery':
        return (
          <ArGalleryPage 
            activeProductId={selectedProductId}
            setActiveProductId={setSelectedProductId}
            setActivePage={setActivePage}
          />
        );
      case 'tutorial':
        return (
          <TutorialPage 
            setActivePage={setActivePage} 
          />
        );
      case 'bmc':
        return (
          <BmcWorkspacePage 
            setActivePage={setActivePage} 
          />
        );
      case 'quiz':
        return (
          <QuizPage 
            setActivePage={setActivePage} 
          />
        );
      case 'assessment':
        return (
          <AssessmentPage 
            setActivePage={setActivePage} 
          />
        );
      default:
        return (
          <HomePage 
            setActivePage={setActivePage} 
            setSelectedProductId={setSelectedProductId} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Academic Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

