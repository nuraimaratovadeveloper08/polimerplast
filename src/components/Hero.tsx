import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/92395d5c6beb33de133f6ced28c9b6a2f451dbba.png';
import videoBg from '../../src/assets/paketi.mp4';

export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay — оставляем ваш градиент поверх видео */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img 
              src={logo} 
              alt="Полимер Пласт"
              className="h-16 sm:h-20 mb-8 object-contain"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Производство{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                полиэтиленовой упаковки
              </span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Мы предлагаем полный спектр услуг по производству и потребностям вашего бизнеса. 
              Чтобы производить качественную полиэтиленовую упаковку мы используем новейшее оборудование.
            </p>

            <motion.a
              href={`https://wa.me/77789801120?text=${encodeURIComponent("Здравствуйте! Можно узнать подробнее об услугах?")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all items-center gap-2"
            >
              Оставить заявку
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: 0.4 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 10px 30px -5px rgba(255, 255, 255, 0.2)"
              }}
              transition={{ 
                opacity: { delay: 0.4, duration: 0.5 },
                y: { delay: 0.4 },
                scale: { type: "spring", stiffness: 400, damping: 10 } 
              }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
            >
              <motion.div 
                className="text-4xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                30+
              </motion.div>
              <div className="text-slate-300">Лет опыта</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 10px 30px -5px rgba(255, 255, 255, 0.2)"
              }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
            >
              <motion.div 
                className="text-4xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.7,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                10 000+
              </motion.div>
              <div className="text-slate-300">Клиентов</div>
            </motion.div>
            
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 10px 30px -5px rgba(255, 255, 255, 0.2)"
              }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
            >
              <motion.div 
                className="text-4xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                24/7
              </motion.div>
              <div className="text-slate-300">Поддержка</div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
