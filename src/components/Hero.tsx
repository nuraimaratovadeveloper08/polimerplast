import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Gift } from 'lucide-react';
import logo from '../assets/new_logo.png';
import heroBg from '../assets/production.png';
import { useLanguage } from '../i18n/LanguageContext';
import { HeroBagsCarousel } from './HeroBagsCarousel';

export function Hero() {
  const { t } = useLanguage();

  return (
<section className="relative min-h-[100svh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
      {/* Background Video */}
      <div className="absolute inset-0">
      <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src={heroBg}
          alt={t.common.production}
          className="hero-bg absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />

        {/* Overlay: фон светлее, текст слева остаётся читаемым */}
        <div className="absolute inset-0 hero-overlay" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10" style={{ paddingTop: 104, paddingBottom: 56 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={logo} 
              alt="Полимер Пласт"
              width={190}
              height={120}
              className="object-contain"
            />

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.hero.titleBefore}{t.hero.titleBefore && ' '}
              <span className="text-white bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
              {t.hero.titleAfter && ' '}{t.hero.titleAfter}
            </h1>

            {/* Мобильная версия: карусель сразу под заголовком */}
            <div className="hero-carousel-mobile" style={{ marginBottom: 24 }}>
              <HeroBagsCarousel />
            </div>

            <p className="text-lg text-white mb-8 leading-relaxed">
              {t.hero.description}
            </p>

            <motion.a
              href={`https://wa.me/77070402121?text=${encodeURIComponent(t.common.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all items-center gap-2"
            >
              {t.common.apply}
              <motion.div
                whileInView={{ x: [0, 4, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.a>

            <p className="text-sm text-white" style={{ marginTop: 16, maxWidth: 440, lineHeight: 1.75 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  marginRight: 6,
                  padding: '1px 10px 1px 8px',
                  verticalAlign: 'baseline',
                  backgroundColor: '#fff',
                  borderRadius: 9999,
                  boxShadow: '0 4px 14px rgb(147 51 234 / 0.35)'
                }}
              >
                <Gift size={14} color="#7c3aed" aria-hidden="true" />
                <span
                  style={{
                    fontWeight: 700,
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(90deg, #2563eb, #9333ea)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text'
                  }}
                >
                  {t.hero.freeOfferLead}
                </span>
              </span>
              {t.hero.freeOffer}
            </p>
          </motion.div>

          {/* Right Column: карусель пакетов и статистика */}
<div style={{ minWidth: 0 }}>
<div className="hero-carousel-desktop">
  <HeroBagsCarousel />
</div>
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col gap-3"
  style={{ marginTop: 24, padding: 20 }}
>
  {t.hero.points.map((point) => (
    <div key={point} className="flex items-center gap-3 text-white font-medium">
      <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
      {point}
    </div>
  ))}
</motion.div>
</div>
        </div>
      </div>
    </section>
  );
}
