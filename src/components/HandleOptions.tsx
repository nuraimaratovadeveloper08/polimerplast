import React from 'react';
import { motion } from 'motion/react';
import schemeDiecut from '../assets/handles/diecut.png';
import schemeDiecutFold from '../assets/handles/diecut-fold.png';
import schemeReinforcedFold from '../assets/handles/reinforced-fold.png';
import schemeReinforced from '../assets/handles/reinforced.png';
import photoHappyCake from '../assets/handles/photo-happycake.webp';
import photoAvrora from '../assets/handles/photo-avrora.jpg';
import photoKet from '../assets/handles/photo-ket.jpg';
import { useLanguage } from '../i18n/LanguageContext';

// Порядок совпадает с t.services.handles.schemes
const schemes = [schemeDiecut, schemeDiecutFold, schemeReinforcedFold, schemeReinforced];

const photos = [
  { src: photoHappyCake, alt: 'Happy Cake' },
  { src: photoAvrora, alt: 'Avrora' },
  { src: photoKet, alt: 'KET Logistic' }
];

const blockTitleStyle: React.CSSProperties = {
  fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
  lineHeight: 1.25,
  textAlign: 'center',
  maxWidth: 800,
  margin: '0 auto 32px'
};

export function HandleOptions() {
  const { t } = useLanguage();
  const text = t.services.handles;

  return (
    <div style={{ marginTop: 80 }}>
      <h3 className="font-bold text-slate-900" style={blockTitleStyle}>{text.schemesTitle}</h3>

      <div
        className="bg-white rounded-2xl shadow-lg"
        style={{ maxWidth: 800, margin: '0 auto 32px', padding: 24, borderLeft: '4px solid #2563eb' }}
      >
        <p className="text-slate-600" style={{ marginBottom: 8 }}>{text.benefits}</p>
        <p className="text-slate-600" style={{ marginBottom: 8 }}>{text.technology}</p>
        <p className="font-semibold text-slate-900">{text.specs}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
        {schemes.map((scheme, index) => (
          <motion.figure
            key={scheme}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg"
            style={{ margin: 0, padding: 16, textAlign: 'center' }}
          >
            <img
              src={scheme}
              alt={text.schemes[index]}
              loading="lazy"
              style={{ width: '100%', maxWidth: 180, height: 'auto', margin: '0 auto 12px', display: 'block' }}
            />
            <figcaption className="text-sm text-slate-600">{text.schemes[index]}</figcaption>
          </motion.figure>
        ))}
      </div>

      <h3 className="font-bold text-slate-900" style={{ ...blockTitleStyle, marginTop: 64 }}>{text.photosTitle}</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
        {photos.map((photo, index) => (
          <motion.div
            key={photo.alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{ height: 340 }}
          >
            <img
              src={photo.src}
              alt={`${text.photoAlt} ${photo.alt}`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
