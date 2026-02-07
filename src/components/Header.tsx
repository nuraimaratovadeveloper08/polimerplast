import React from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import logo from 'figma:asset/92395d5c6beb33de133f6ced28c9b6a2f451dbba.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 
  const isHomePage = location.pathname === '/';
  const closeMenu = () => setIsMenuOpen(false);
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
            className="flex items-center"
          >
            <img 
              src={logo} 
              alt="Полимер Пласт"
              className="h-12 sm:h-14 object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors">О компании</Link>
            {isHomePage && (
              <>
                <a href="#services" className={navLinkStyles}>Услуги</a>
                <a href="#faq" className={navLinkStyles}>Вопросы</a>
              </>
            )}
            <a href="#contacts" className="text-slate-700 hover:text-blue-600 transition-colors">Контакты</a>
          </nav>

          {/* Phone Numbers */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-blue-600" />
              <a href="tel:+77172531330" className="hover:text-blue-600 transition-colors">8 (717) 253-13-30</a>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-blue-600" />
              <a href="tel:+77789801120" className="hover:text-blue-600 transition-colors">+7 (778) 980-11-20</a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              <Link to="/about" className={navLinkStyles} onClick={closeMenu}>О компании</Link>
              {isHomePage && (
                <>
                  <a href="#services" className={navLinkStyles} onClick={closeMenu}>Услуги</a>
                  <a href="#faq" className={navLinkStyles} onClick={closeMenu}>Вопросы</a>
                </>
              )}
              <a href="#contacts" className="text-slate-700 hover:text-blue-600 transition-colors" onClick={closeMenu}>Контакты</a>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                <a href="tel:+77172531330" className="text-slate-700 hover:text-blue-600 transition-colors">
                  +7 717 253 13 30
                </a>
                <a href="tel:+77789801120" className="text-slate-700 hover:text-blue-600 transition-colors">
                  +7 778 980 11 20
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
