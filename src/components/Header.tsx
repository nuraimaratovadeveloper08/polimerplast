import React from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import logo from '../assets/new_logo_1.png';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';

export function Header() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 
  const isHomePage = location.pathname === '/';
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogoClick = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const navLinkStyles = "text-slate-700 hover:text-blue-600 transition-colors font-medium";

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="header-logo flex items-center"
          >
            <Link to="/" onClick={handleLogoClick} className="flex items-center" style={{ minWidth: 0 }}>
              <img 
                src={logo} 
                alt="Полимер Пласт"
                width={220}
                height={70}
                className="object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="header-nav hidden md:flex items-center">
            <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors">{t.header.about}</Link>
            {isHomePage && (
              <>
                <a href="#services" className={navLinkStyles}>{t.header.services}</a>
                <a href="#faq" className={navLinkStyles}>{t.header.faq}</a>
              </>
            )}
            <a href="#contacts" className="text-slate-700 hover:text-blue-600 transition-colors">{t.header.contacts}</a>
          </nav>

          {/* Phone Numbers */}
          <div className="header-actions">
            <div className="header-phones hidden lg:flex items-center gap-4">
              <div className="header-phone-secondary items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-blue-600" />
                <a href="tel:+77172531330" className="hover:text-blue-600 transition-colors">8 (717) 253-13-30</a>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-blue-600" />
                <a href="tel:+77070402121" className="hover:text-blue-600 transition-colors">+7 (707) 040 21 21</a>
              </div>
            </div>

            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t.header.closeMenu : t.header.openMenu}
              className="md:hidden p-2 text-slate-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <nav className="flex flex-col gap-4 p-6">
              <Link to="/about" className={navLinkStyles} onClick={closeMenu}>{t.header.about}</Link>
              {isHomePage && (
                <>
                  <a href="#services" className={navLinkStyles} onClick={closeMenu}>{t.header.services}</a>
                  <a href="#faq" className={navLinkStyles} onClick={closeMenu}>{t.header.faq}</a>
                </>
              )}
              <a href="#contacts" className="text-slate-700 hover:text-blue-600 transition-colors" onClick={closeMenu}>{t.header.contacts}</a>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                <a href="tel:+77172531330" className="text-slate-700 hover:text-blue-600 transition-colors">
                  +7 717 253 13 30
                </a>
                <a href="tel:+77070402121" className="text-slate-700 hover:text-blue-600 transition-colors">
                  +7 707 040 21 21
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
