import React from 'react';
import { motion } from 'motion/react';
import { Award, Target, Zap, HeartHandshake } from 'lucide-react';
import zavod3 from '../assets/zavod3.jpeg'

const values = [
  {
    icon: Award,
    title: 'Качество',
    description: 'Высочайшие стандарты производства'
  },
  {
    icon: Target,
    title: 'Точность',
    description: 'Соблюдение всех сроков'
  },
  {
    icon: Zap,
    title: 'Эффективность',
    description: 'Современное оборудование'
  },
  {
    icon: HeartHandshake,
    title: 'Доверие',
    description: 'Надёжный партнёр для бизнеса'
  }
];

export function About() {
  return (
    <section id="about" className="pt-3 sm:py-20 pb-20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium mb-4">
            О компании
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Почему выбирают нас
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.6
            }}
            className="relative"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl blur-2xl opacity-20"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />
            <motion.img 
              src={zavod3}
              alt="О компании"
              className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.6,
              delay: 0.2
            }}
          >
            <motion.p 
              className="text-lg text-slate-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Компания "Полимер - Пласт" была образована в 1996 году и 
              продолжает стабильную работу в столице Казахстана, в Астане.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Предприятие занимается производством полиэтиленовой упаковки в виде пакетов 
              разных видов (пакет майка, с вырубной ручкой, упаковочные мешки, 
              пакеты для шин, медицинские, для банкнот, фасовочные, пищевой продукции и т.д), пленки различного назначения (стройка, химчистка одежды, теплицы, термоусадочная и т.д).
            </motion.p>
            <motion.p 
              className="text-lg text-slate-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Наша команда каждый день работает над производством 
              качественной продукции и гарантирует стабильные поставки 
              в оговоренные сроки уже 29 лет.
            </motion.p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="text-center"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg"
                  whileHover={{
                    rotate: [0, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.4 }
                  }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
