import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, translations } from './translations';

const STORAGE_KEY = 'language';

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.ru;
} | null>(null);

function getInitialLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'kk' ? 'kk' : 'ru';
  } catch {
    return 'ru';
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Приватный режим: язык просто не сохранится между визитами
    }
  }, [language, t]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
