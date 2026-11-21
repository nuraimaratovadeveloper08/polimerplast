import React from 'react';
import { motion } from 'motion/react';
import { Package, FileText, Layers } from 'lucide-react';
import logo from '../assets/logo-paket.png'
import tar from '../assets/tar.png'
import pnd from '../assets/pnd.png'
import prodlogo from '../assets/prodlogo.png'
import second from '../assets/second2.png'
import { useLanguage } from '../i18n/LanguageContext';
import { PackagingOptions } from './PackagingOptions';
import { HandleOptions } from './HandleOptions';


const services = [
  {
    icon: Package,
    image: prodlogo,
    gradient: ''
  },
  {
    icon: FileText,
    image: second,
    gradient: ''
  },
  {
    icon: Layers,
    image: pnd,
    gradient: ''
  }
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium mb-4">
            {t.services.badge}
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "easeOut",
                  stiffness: 100,
                  damping: 12
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -12,
                  transition: { type: "easeOut", stiffness: 400, damping: 15 }
                }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all w-full"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img 
                    src={service.image}
                    alt={t.services.items[index].title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`} />
                  <motion.div 
                    className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-lg"
                    whileHover={{ 
                      rotate: [0, -15, 15, 0],
                      scale: [1, 1.1, 1.1, 1],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Icon className="w-6 h-6 text-slate-900" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {t.services.items[index].title}
                  </h3>
                  <p className="text-slate-600">
                    {t.services.items[index].description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <PackagingOptions />
        <HandleOptions />
      </div>
    </section>
  );
}
