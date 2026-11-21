import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutCompanyPage } from './pages/AboutCompanyPage';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import ScrollToTopPage from './components/ScrollToTopPage';
import { MetaPixelTracker } from './components/MetaPixelTracker';
import { LanguageProvider } from './i18n/LanguageContext';


export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <MetaPixelTracker />
        <ScrollToTopPage />
        <div className="max-w-full overflow-x-hidden min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <Header />
          <ScrollToTop />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutCompanyPage />} />
            {/* Каталог убран: старые ссылки ведут на главную */}
            <Route path="/catalog" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </LanguageProvider>
  );
}
