import React from 'react';
import { motion } from 'motion/react';
import schemeFlatBottom from '../assets/packaging/flat-bottom.png';
import schemeWicket from '../assets/packaging/wicket.png';
import schemeGusset from '../assets/packaging/gusset.png';
import schemeFlap from '../assets/packaging/flap.png';
import schemeBottomFoldFlap from '../assets/packaging/bottom-fold-flap.png';
import photoGalmart from '../assets/catalog/maika-galmart.jpg';
import photoVkusmart from '../assets/catalog/maika-vkusmart.jpg';
import photoBottle from '../assets/catalog/paket-butyl.jpg';
import { useLanguage } from '../i18n/LanguageContext';

// Порядок совпадает с t.services.packaging.schemes
const schemes = [schemeFlatBottom, schemeWicket, schemeGusset, schemeFlap, schemeBottomFoldFlap];

const handlePhotos = [
  { src: photoGalmart, alt: 'Galmart', fit: 'contain' as const },
  { src: photoVkusmart, alt: 'Вкус Март', fit: 'contain' as const },
  { src: photoBottle, alt: 'для бутыли 19 л', fit: 'contain' as const }
];

const blockTitleStyle: React.CSSProperties = {
  fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
  lineHeight: 1.25,
  textAlign: 'center',
  maxWidth: 800,
  margin: '0 auto 32px'
};

export function PackagingOptions() {
  const { t } = useLanguage();
  const text = t.services.packaging;

  return (
    <div style={{ marginTop: 80 }}>
      <h3 className="font-bold text-slate-900" style={blockTitleStyle}>{text.schemesTitle}</h3>

      <div
        className="bg-white rounded-2xl shadow-lg"
        style={{ maxWidth: 800, margin: '0 auto 32px', padding: 24, borderLeft: '4px solid #2563eb' }}
      >
        <p className="text-xl font-semibold text-slate-900">{text.fillingTitle}</p>
        <p className="text-sm text-slate-600" style={{ marginBottom: 12 }}>{text.fillingNote}</p>
        <p className="text-slate-600" style={{ marginBottom: 8 }}>{text.fillingMaterial}</p>
        <p className="text-slate-600">{text.fillingUsage}</p>
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
        {handlePhotos.map((photo, index) => (
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
              style={{ width: '100%', height: '100%', objectFit: photo.fit, padding: photo.fit === 'contain' ? 12 : 0 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
