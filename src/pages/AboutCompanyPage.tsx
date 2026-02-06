import React from 'react';
import { motion } from 'framer-motion'; // Изменил на стандартный импорт
import { Award, Factory, TrendingUp, Users, Check, Sparkles, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import team from '../assets/paketi-team.jpg'
import zavodd from '../assets/zavodd.png'
import zavod3 from '../assets/zavod3.jpeg'
import zavod1 from '../assets/zavod1.png'
import production from '../assets/production.png'



import gotovo from '../assets/gotovo.png'


const stats = [
  { label: 'Лет на рынке', value: '30+', icon: Award },
  { label: 'Довольных клиентов', value: '10 000+', icon: Users },
  { label: 'Рост производства', value: 'Ежегодно', icon: TrendingUp }
];

const advantages = [
  'Наличие продукции на складе',
  'Национальный производитель',
  'Приемлемые цены',
  'Индивидуальный подход к каждому клиенту',
  'Возможность нанесения логотипа и рисунка',
  'Высокое качество продукции',
  'Широкий ассортимент',
  'Быстрая обработка заказов'
];

const products = [
  'Термоусадочная пленка (макс. ширина 1,1 м, толщина до 150 микрон)',
  'Строительная пленка рукав/полотно (макс. ширина 1,5 м, 40-150 микрон)',
  'Пленка для химчисток',
  'Пакеты для фасовки продуктов',
  'Упаковка для купюр и монет',
  'Пакеты для мусора',
  'Пакеты для шин',
  'Пакеты для упаковки бутылей с водой',
  'Пакеты типа «майка» (от 10 000 шт)',
  'Пакеты с вырубной ручкой (от 5 000 шт)'
];

const galleryImages = [
  { url: production, title: 'Производственная линия' },
  { url: zavodd, title: 'Производство пленки' },
  { url: zavod1, title: 'Складское хранение' },
  { url: team, title: 'Команда специалистов' },
  { url: gotovo, title: 'Готовая продукция' },
  { url: zavod3, title: 'Современное оборудование' }
];

export function AboutCompanyPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      backgroundImage: 'linear-gradient(to bottom right, #f8fafc, #eff6ff, #f1f5f9)',
      paddingTop: '80px',
      fontFamily: 'sans-serif',
    }}>
      <section style={{ padding: isMobile ? '40px 16px' : '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Back Button */}
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
              <span style={{ fontWeight: 500 }}>Вернуться на главную</span>
            </motion.div>
          </Link>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '8px 16px', 
              backgroundColor: 'rgba(59, 130, 246, 0.1)', 
              color: '#2563eb', 
              borderRadius: '9999px', 
              fontSize: '14px', 
              fontWeight: 600,
              marginBottom: '16px'
            }}>
              О компании
            </span>
            <h1 style={{ 
              fontSize: isMobile ? '32px' : '48px', 
              fontWeight: 800, 
              color: '#0f172a', 
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              ТОО «Полимер-Пласт»
            </h1>
            <p style={{ fontSize: '18px', color: '#475569', maxWidth: '768px', margin: '0 auto' }}>
              Ведущий производитель полиэтиленовой упаковки в Казахстане с 1996 года
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ 
            display: 'grid', 
            // На десктопе 3 колонки, на мобилках 1 или 2
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: '24px', 
            marginBottom: '80px',
            justifyContent: 'center' // Вот это центрирует всю сетку
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white', 
                borderRadius: '24px', 
                padding: '24px', 
                textAlign: 'center', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
              }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '56px', 
                  height: '56px', 
                  backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #a855f7)', 
                  borderRadius: '16px', 
                  marginBottom: '16px' 
                }}>
                  <stat.icon size={28} color="white" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', 
            gap: '48px', 
            marginBottom: '80px' 
          }}>
            {/* History & Advantages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Sparkles size={24} color="#2563eb" />
                  <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Наша история</h2>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                  ТОО <b>«Полимер-Пласт»</b> стабильно работает с <span style={{ color: '#2563eb', fontWeight: 600 }}>1996 года</span>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Растущая сеть продовольственных магазинов гарантирует устойчивый рынок сбыта как производителя тарного и упаковочного материала.
                </p>
              </div>

              <div style={{ 
                backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #7c3aed)', 
                borderRadius: '24px', 
                padding: '32px', 
                color: 'white' 
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Преимущества</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {advantages.map((adv, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
                        <Check size={14} style={{ margin: 'auto' }} />
                      </div>
                      <span style={{ fontSize: '14px', opacity: 0.9 }}>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Наша продукция</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {products.map((prod, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '6px' }} />
                    <span style={{ fontSize: '14px', color: '#475569' }}>{prod}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Производство</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', 
              gap: '24px' 
            }}>
              {galleryImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(img.url)}
                  style={{ 
                    position: 'relative', 
                    height: '280px', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <img src={img.url} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, left: 0, right: 0, 
                    padding: '20px', 
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', 
                    color: 'white',
                    textAlign: 'left'
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: 600 }}>{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ 
            marginTop: '80px',
            padding: isMobile ? '40px 20px' : '60px', 
            borderRadius: '32px', 
            backgroundImage: 'linear-gradient(to bottom right, #2563eb, #7c3aed)', 
            color: 'white', 
            textAlign: 'center' 
          }}>
            <h3 style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700, marginBottom: '16px' }}>Нужна качественная упаковка?</h3>
            <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '32px' }}>Свяжитесь с нами прямо сейчас для расчета стоимости</p>
            <a 
              href={`https://wa.me/77789801120?text=${encodeURIComponent("Здравствуйте! Можно узнать подробнее об услугах?")}`}
              target="_blank"
              style={{ 
                display: 'inline-block', 
                backgroundColor: 'white', 
                color: '#2563eb', 
                padding: '16px 40px', 
                borderRadius: '16px', 
                fontWeight: 700, 
                textDecoration: 'none',
                boxShadow: '0 10px 15px rgba(0,0,0,0.2)'
              }}
            >
              Оставить заявку
            </a>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{ 
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', 
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' 
          }}
        >
          <img src={selectedImage} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '16px' }} />
        </div>
      )}
    </div>
  );
}