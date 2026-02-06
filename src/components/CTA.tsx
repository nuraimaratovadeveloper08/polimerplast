import React from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import zavod3 from '../assets/zavod3.jpeg'

export function CTA() {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="relative overflow-hidden rounded-3xl p-12 lg:p-16 shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.img 
              src={zavod3}
              alt="Производство"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            {/* Dark Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-900/90 to-pink-900/95" />
          </div>

          <div className="relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.2
              }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Нужна помощь?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              viewport={{ once: true }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            >
              Оставьте свой вопрос и мы свяжемся с вами
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href={`https://wa.me/77789801120?text=${encodeURIComponent("Здравствуйте! Можно узнать подробнее об услугах?")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Оставить заявку
              </motion.a>
              
              <motion.a
                href="tel:+77789801120"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-medium transition-all"
              >
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  <Phone className="w-5 h-5" />
                </motion.div>
                Позвонить
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
