import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, DollarSign, ThumbsUp, SquareCheck } from 'lucide-react';

const features = [
  {
    icon: SquareCheck,
    title: 'Наличие продукции на складе',
    description: 'Собственные складские мощности и широкий ассортимент в наличии',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Национальный производитель',
    description: 'Развиваем промышленный потенциал страны, создавая качественный продукт',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: DollarSign,
    title: 'Оптовые цены',
    description: 'Выгодные условия для оптовых заказчиков',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: ThumbsUp,
    title: 'Индивидуальный подход',
    description: 'Учитываем специфику вашего бизнеса и предлагаем гибкие условия',
    gradient: 'from-green-500 to-emerald-500'
  }
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Gradient Border Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />
                
                <motion.div 
                  className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 shadow-lg`}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1],
                    transition: { duration: 0.5 }
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
