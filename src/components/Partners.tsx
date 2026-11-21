import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import lotteRakhat from '../assets/partners/lotte-rakhat.png';
import diona from '../assets/partners/diona.png';
import adal from '../assets/partners/adal.png';
import fermag from '../assets/partners/fermag.webp';
import okadzaki from '../assets/partners/okadzaki.svg';
import biosfera from '../assets/partners/biosfera.svg';
import wyndham from '../assets/partners/wyndham.png';

// dark: логотип белый, на светлой карточке его не видно
const partners = [
  { logo: lotteRakhat, name: 'Lotte Rakhat' },
  { logo: diona, name: 'Diona' },
  { logo: adal, name: 'Adal' },
  { logo: fermag, name: 'Fermag' },
  { logo: okadzaki, name: 'Okadzaki' },
  { logo: biosfera, name: 'Биосфера' },
  { logo: wyndham, name: 'Wyndham Garden Burabay', dark: true }
];

export function Partners() {
  const { t } = useLanguage();

  const renderGroup = (isClone: boolean) => (
    <div className={isClone ? 'partners-group partners-group--clone' : 'partners-group'} aria-hidden={isClone || undefined}>
      {partners.map((partner, index) => (
        <div key={partner.name} className="partner-card bg-white rounded-2xl shadow-lg text-center">
          <div className="partner-card__logo" style={partner.dark ? { backgroundColor: '#1e293b' } : undefined}>
            <img src={partner.logo} alt={isClone ? '' : partner.name} />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">{partner.name}</h3>
          <p className="text-sm text-slate-600">{t.partners.types[index]}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section id="partners" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 px-4 sm:px-6 lg:px-8"
      >
        <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium mb-4">
          {t.partners.badge}
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          {t.partners.title}
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {t.partners.subtitle}
        </p>
      </motion.div>

      <div className="partners-marquee">
        <div className="partners-track">
          {renderGroup(false)}
          {renderGroup(true)}
        </div>
      </div>
    </section>
  );
}
