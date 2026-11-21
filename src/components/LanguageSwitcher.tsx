import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const languages: { code: Language; label: string; name: string }[] = [
  { code: 'kk', label: 'ҚАЗ', name: 'Қазақша' },
  { code: 'ru', label: 'РУС', name: 'Русский' }
];

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label={t.header.chooseLanguage}>
      {languages.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={name}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
          className={language === code ? 'lang-switcher__button lang-switcher__button--active' : 'lang-switcher__button'}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
