import React from 'react';
import { motion } from 'motion/react';
import imgGarbage from '../assets/catalog/musor.png';
import imgMedical from '../assets/catalog/musor-klass-b.png';
import imgFilm from '../assets/pnd.png';
import imgBottle from '../assets/catalog/paket-butyl.jpg';
import imgBags from '../assets/catalog/paket-rulon.webp';
import imgPrinted from '../assets/catalog/paket-fasovka.webp';
import imgBread from '../assets/catalog/paket-lavash.webp';
import imgLinen from '../assets/catalog/paket-belye.webp';
import imgHanger from '../assets/catalog/paket-evroslot.webp';
import imgReady from '../assets/catalog/paket-klubnika.webp';
import { useLanguage } from '../i18n/LanguageContext';

type ItemKey = 'garbage' | 'medical' | 'film' | 'bottles' | 'bags' | 'printed' | 'bread' | 'linen' | 'hanger' | 'ready';

// Порядок карточек; fit: 'cover' для фото с фоном, 'contain' для вырезанных пакетов
const items: { key: ItemKey; image: string; fit?: 'cover' | 'contain'; position?: string }[] = [
  { key: 'garbage', image: imgGarbage, fit: 'cover' },
  { key: 'medical', image: imgMedical, fit: 'cover', position: 'center 20%' },
  { key: 'film', image: imgFilm, fit: 'cover' },
  { key: 'bottles', image: imgBottle, fit: 'cover', position: 'center 30%' },
  { key: 'bags', image: imgBags, fit: 'cover' },
  { key: 'printed', image: imgPrinted, fit: 'cover' },
  { key: 'bread', image: imgBread, fit: 'cover' },
  { key: 'linen', image: imgLinen, fit: 'cover' },
  { key: 'hanger', image: imgHanger, fit: 'cover' },
  { key: 'ready', image: imgReady, fit: 'contain' }
];

export function Assortment() {
  const { t } = useLanguage();
  const text = t.assortment;

  return (
    <section id="assortment" className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 80 }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: 860, marginBottom: 32 }}
        >
          <h2 className="font-bold text-slate-900" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', lineHeight: 1.2, marginBottom: 12 }}>
            {text.title}
          </h2>
          <p className="text-lg text-slate-600">{text.subtitle}</p>
        </motion.div>

        <div className="assortment-panel">
          <h3 className="font-semibold text-slate-900" style={{ fontSize: '1.125rem', marginBottom: 16 }}>
            {text.panelTitle}
          </h3>

          <div className="assortment-grid">
            {items.map((item, index) => {
              const card = text.items[item.key];
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="assortment-card"
                >
                  <div className="assortment-card__media">
                    <img
                      src={item.image}
                      alt={card.title}
                      loading="lazy"
                      style={{ objectFit: item.fit, objectPosition: item.position ?? 'center', padding: item.fit === 'contain' ? 12 : 0 }}
                    />
                  </div>
                  <div className="assortment-card__body">
                    <span className="font-semibold text-slate-900">{card.title}</span>
                    <span className="text-sm text-slate-600">{card.description}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
