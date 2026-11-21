import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function FloatingWhatsApp() {
  const { t } = useLanguage();

  return (
    <motion.a
      href={`https://wa.me/77070402121?text=${encodeURIComponent(t.common.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.5)"
      }}
      whileTap={{ scale: 0.9 }}
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="w-8 h-8"
      />
    </motion.a>
  );
}
