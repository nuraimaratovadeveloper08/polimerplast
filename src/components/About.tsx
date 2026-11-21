import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import zavod3 from '../assets/zavod3.jpeg'
import { useLanguage } from '../i18n/LanguageContext';

export function About() {
  const { t } = useLanguage();

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
            {t.about.badge}
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t.about.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              alt={t.about.badge}
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
              {t.about.intro}
            </motion.p>
            <div className="space-y-4">
              {t.about.reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  className="flex gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" style={{ marginTop: 3 }} />
                  <p className="text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-900">{reason.title}</span>
                    {reason.text && ` ${reason.text}`}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
