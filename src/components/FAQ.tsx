import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Как оформить заказ на изготовление пластиковых пакетов?',
    answer: 'Отправить запрос к нам на почту или написать на ватсапп, менеджер поможет вам оформить заказ.'
  },
  {
    question: 'Каковы сроки изготовления упаковки с логотипом?',
    answer: 'В среднем срок изготовления занимает 20-25 дней.'
  },
  {
    question: 'Можно ли заказать пакеты с индивидуальным дизайном?',
    answer: 'Да, вы можете предоставить ваш дизайн для производства пакетов, максимальное количество нанесение 4-х цветов.'
  },
  {
    question: 'Какие виды пластиковых пакетов вы производите?',
    answer: 'Мы производим пакеты из полиэтилена высшего сорта высокого и низкого давления, ПВД и ПНД.'
  },
  {
    question: 'Каков минимальный объем заказа?',
    answer: 'Минимальный обьем заказа высчитывается исходя из параметров пакета, пакет с вырубной ручкой от 5000штук, пакет майка от 10 000штук, пленка от 100кг одного размера и дизайна.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Вопросы и ответы
          </h2>
          <p className="text-lg text-slate-600">
            Ответы на часто задаваемые вопросы о нашей продукции
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
