import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from 'figma:asset/92395d5c6beb33de133f6ced28c9b6a2f451dbba.png';

export function Footer() {
  return (
    <footer id="contacts" className="bg-slate-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-8">
            <img 
              src={logo} 
              alt="Полимер Пласт"
              className="h-16 mx-auto mb-4 object-contain"
            />
            <p className="text-slate-400">
              Производство полиэтиленовой упаковки высшего качества
            </p>
          </div>

          {/* Contacts */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl">
              <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <a href="tel:+77172531330" className="text-slate-300 hover:text-white transition-colors block">
                  8 (717) 253-13-30
                </a>
                <a href="tel:+77789801120" className="text-slate-300 hover:text-white transition-colors block">
                  +7 (778) 980-11-20
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl">
              <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <a href="mailto:polimer_astana@mail.ru" className="text-slate-300 hover:text-white transition-colors">
                polimer_astana@mail.ru
              </a>
            </div>
            <div className="sm:col-span-2 flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl">
              <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm">
                Казахстан, г. Астана, ул. Аксай 11
              </span>
            </div>

            <div className="sm:col-span-2 flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-500 p-4 rounded-xl hover:from-green-500 hover:to-green-400 transition-all">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="WhatsApp" 
                className="w-8 h-8"
              />
              <a 
                href={`https://wa.me/77789801120?text=${encodeURIComponent("Здравствуйте! Можно узнать подробнее об услугах?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 ТОО "ПОЛИМЕР-ПЛАСТ". Все права защищены
            </p>
            {/* <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
