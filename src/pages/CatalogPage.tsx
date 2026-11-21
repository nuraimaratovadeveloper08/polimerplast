import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categoryIds, CategoryId, Product, products } from '../data/catalog';
import { useLanguage } from '../i18n/LanguageContext';
import { PriceCalculator } from '../components/PriceCalculator';

function ProductMedia({ product, name }: { product: Product; name: string }) {
  const { t } = useLanguage();
  const images = [
    product.photo && { src: product.photo, label: t.catalog.photoLabel, fit: product.photoFit ?? ('cover' as const) },
    product.scheme && { src: product.scheme, label: t.catalog.schemeLabel, fit: 'contain' as const }
  ].filter(Boolean) as { src: string; label: string; fit: 'cover' | 'contain' }[];

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: 220, backgroundColor: '#f1f5f9' }}>
        <Package className="w-14 h-14 text-slate-400" />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`, height: 220 }}>
      {images.map((image) => (
        <div key={image.label} style={{ position: 'relative', minWidth: 0, height: 220, overflow: 'hidden', backgroundColor: '#fff' }}>
          <img
            src={image.src}
            alt={`${name}: ${image.label}`}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: image.fit, padding: image.fit === 'contain' ? 8 : 0 }}
          />
          <span
            style={{
              position: 'absolute',
              left: 8,
              bottom: 8,
              padding: '2px 8px',
              fontSize: 12,
              color: '#fff',
              backgroundColor: 'rgb(15 23 42 / 0.7)',
              borderRadius: 9999
            }}
          >
            {image.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  const text = t.catalog.products[product.id];
  const message = `${t.catalog.whatsappMessage} ${text.name}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
    >
      <ProductMedia product={product} name={text.name} />
      <div className="p-6 flex flex-col" style={{ flexGrow: 1 }}>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{text.name}</h3>
        <p className="text-sm text-slate-600 mb-4" style={{ flexGrow: 1 }}>{text.description}</p>
        {product.sizes && (
          <p className="text-sm text-slate-600 mb-4">
            <span className="font-semibold text-slate-900">{t.catalog.sizesLabel}</span> {product.sizes.join(', ')}
          </p>
        )}
        <a
          href={`https://wa.me/77070402121?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium transition-all"
          style={{ padding: '12px 16px' }}
        >
          <MessageCircle className="w-5 h-5" />
          {t.catalog.order}
        </a>
      </div>
    </motion.div>
  );
}

export function CatalogPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const visibleCategories = activeCategory === 'all' ? categoryIds : [activeCategory];
  const filters: { id: CategoryId | 'all'; label: string }[] = [
    { id: 'all', label: t.catalog.all },
    ...categoryIds.map((id) => ({ id, label: t.catalog.categories[id].title }))
  ];

  return (
    <>
    <section className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 112, paddingBottom: 48 }}>
      <div className="max-w-7xl mx-auto">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#475569',
              marginBottom: '32px',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} />
            <span style={{ fontWeight: 500 }}>{t.companyPage.back}</span>
          </motion.div>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.catalog.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.catalog.subtitle}</p>
        </div>

        <div className="flex gap-2 mb-16" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {filters.map((filter) => {
            const isActive = filter.id === activeCategory;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(filter.id)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={{
                  cursor: 'pointer',
                  color: isActive ? '#fff' : '#475569',
                  backgroundColor: isActive ? '#2563eb' : '#fff',
                  boxShadow: '0 1px 3px rgb(15 23 42 / 0.15)'
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {visibleCategories.map((categoryId) => (
          <div key={categoryId} className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">{t.catalog.categories[categoryId].title}</h2>
            <p className="text-slate-600 mb-8">{t.catalog.categories[categoryId].description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((product) => product.category === categoryId)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    <PriceCalculator />
    </>
  );
}
