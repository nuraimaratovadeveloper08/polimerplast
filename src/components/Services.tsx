import React from 'react';
import { motion } from 'motion/react';
import { Package, FileText, Layers, ArrowRight } from 'lucide-react';
import logo from '../assets/logo-paket.png'
import tar from '../assets/tar.png'
import pnd from '../assets/pnd.png'
import prodlogo from '../assets/prodlogo.png'
import second from '../assets/second2.png'


const services = [
  {
    icon: Package,
    title: 'Изготовление пакетов с логотипом',
    description: 'Производим полиэтиленовые пакеты с вашим фирменным стилем и логотипом',
    image: prodlogo,
    gradient: ''
  },
  {
    icon: FileText,
    title: 'Производство упаковочного материала из ПВД и ПНД',
    description: 'Высококачественные материалы для различных видов упаковки',
    image: second,
    gradient: ''
  },
  {
    icon: Layers,
    title: 'Готовая продукция в виде пакетов из ПВД и ПНД',
    description: 'Широкий ассортимент плёнок для различных целей и отраслей',
    image: pnd,
    gradient: ''
  }
];

export function Services() {
  return (
    <section id="services" className="pt-3 sm:py-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium mb-4">
            Наши услуги
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Что мы предлагаем
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Полный спектр услуг по производству полиэтиленовой упаковки для вашего бизнеса
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
                    alt={service.title}
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
                    {service.title}
                  </h3>
                  <p className="text-slate-600">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
