import React from 'react';
import { motion } from 'motion/react';
import bagGalmart from '../assets/hero-bags/galmart.webp';
import bagVkusmart from '../assets/hero-bags/vkusmart.webp';
import bagAvrora from '../assets/hero-bags/avrora.webp';
import bagKet from '../assets/hero-bags/ket.webp';
import bagBlue from '../assets/hero-bags/blue.webp';
import { useLanguage } from '../i18n/LanguageContext';

// Реальные пакеты, сделанные для клиентов (фото с вырезанным фоном)
const bags = [
  { src: bagGalmart, alt: 'Galmart' },
  { src: bagVkusmart, alt: 'Вкусмарт' },
  { src: bagAvrora, alt: 'Avrora' },
  { src: bagKet, alt: 'KET Logistic' },
  { src: bagBlue, alt: 'Голубой пакет' }
];

export function ProductExamples() {
  const { t } = useLanguage();
  const text = t.productExamples;

  return (
    <section id="examples" className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 80 }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="examples-intro"
        >
          <h2 className="font-bold text-slate-900 examples-intro__title">{text.title}</h2>
          {text.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg text-slate-600" style={{ lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        <h3 className="font-bold text-slate-900" style={{ fontSize: '1.5rem', margin: '40px 0 20px' }}>
          {text.examplesTitle}
        </h3>

        <div className="examples-grid">
          {bags.map((bag, index) => (
            <motion.div
              key={bag.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="examples-grid__cell"
            >
              <img src={bag.src} alt={bag.alt} loading="lazy" className="examples-grid__img" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
