import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { BagColor, BagProduct, priceTable, PriceRow } from '../data/prices';
import { useLanguage } from '../i18n/LanguageContext';

const formatMoney = (value: number, digits = 0) =>
  value.toLocaleString('ru-RU', { minimumFractionDigits: digits, maximumFractionDigits: digits });

// Выше этого тиража цену считает менеджер
const MAX_QUANTITY = 10_000_000;

type QuantityError = 'required' | 'min' | 'max' | null;

function getQuantityError(input: string, quantity: number, minQuantity: number): QuantityError {
  if (input.trim() === '') return 'required';
  if (quantity < minQuantity) return 'min';
  if (quantity > MAX_QUANTITY) return 'max';
  return null;
}

function getRows(product: BagProduct) {
  return priceTable.filter((row) => row.product === product);
}

// Индекс ступени тиража или -1, если тираж ниже минимального
function getTierIndex(row: PriceRow, bagColor: BagColor, quantity: number) {
  const tiers = row.minQty[bagColor];
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (quantity >= tiers[i]) return i;
  }
  return -1;
}

function Segmented<T extends string | number>({ label, options, value, onChange }: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="calc-field">
      <span className="calc-label">{label}</span>
      <div className="calc-segmented" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
            className={option.value === value ? 'calc-segment calc-segment--active' : 'calc-segment'}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden="true">
      <path
        fill="#25D366"
        d="M20.464 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
      <path
        fill="#fff"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      />
    </svg>
  );
}

export function PriceCalculator() {
  const { t } = useLanguage();
  const text = t.calculator;
  const [product, setProduct] = useState<BagProduct>('maika');
  const [sizeIndex, setSizeIndex] = useState(0);
  const [bagColor, setBagColor] = useState<BagColor>('white');
  const [printColors, setPrintColors] = useState(1);
  const [quantityInput, setQuantityInput] = useState(String(getRows('maika')[0].minQty.white[0]));
  const [needCliche, setNeedCliche] = useState(false);

  const rows = getRows(product);
  const row = rows[sizeIndex];
  const quantity = Number(quantityInput) || 0;
  const minQuantity = row.minQty[bagColor][0];
  const quantityError = getQuantityError(quantityInput, quantity, minQuantity);
  const tierIndex = quantityError ? -1 : getTierIndex(row, bagColor, quantity);
  const unitPrice = tierIndex >= 0 ? row.prices[bagColor][printColors - 1][tierIndex] : null;
  const total = unitPrice !== null ? unitPrice * quantity : null;

  const nextTierQuantity = tierIndex >= 0 ? row.minQty[bagColor][tierIndex + 1] : undefined;
  const nextTierPrice = nextTierQuantity !== undefined ? row.prices[bagColor][printColors - 1][tierIndex + 1] : undefined;

  const productName = text.products[product];
  const sizeLabel = (item: PriceRow) =>
    `${item.size}${item.gusset ? `, ${text.gusset} ${item.gusset}` : ''} ${text.cm}, ${item.micron} ${text.micron}`;

  // При смене варианта тираж подставляется минимальным, если поле не трогали
  // (там стоял прежний минимум), оно пустое или тираж меньше нового минимума
  const syncQuantity = (nextRow: PriceRow, nextColor: BagColor) => {
    const nextMin = nextRow.minQty[nextColor][0];
    if (quantityInput.trim() === '' || quantity === minQuantity || quantity < nextMin) {
      setQuantityInput(String(nextMin));
    }
  };

  const handleProductChange = (next: BagProduct) => {
    setProduct(next);
    setSizeIndex(0);
    setQuantityInput(String(getRows(next)[0].minQty[bagColor][0]));
  };

  const handleSizeChange = (nextIndex: number) => {
    setSizeIndex(nextIndex);
    syncQuantity(rows[nextIndex], bagColor);
  };

  const handleColorChange = (nextColor: BagColor) => {
    setBagColor(nextColor);
    syncQuantity(row, nextColor);
  };

  // В поле можно ввести только цифры
  const handleQuantityChange = (value: string) => {
    setQuantityInput(value.replace(/\D/g, '').replace(/^0+(?=\d)/, ''));
  };

  // Пустое поле после ввода возвращаем к минимуму; тираж ниже минимума оставляем и показываем ошибку
  const handleQuantityBlur = () => {
    if (quantityInput.trim() === '') setQuantityInput(String(minQuantity));
  };

  const quantityErrorText =
    quantityError === 'required' ? text.quantityRequired
    : quantityError === 'min' ? `${text.quantityMin} ${formatMoney(minQuantity)} ${text.pieces}`
    : quantityError === 'max' ? text.quantityMax
    : null;

  const message = [
    text.whatsappIntro,
    `${productName}, ${sizeLabel(row)}`,
    `${text.bagColor}: ${text.bagColors[bagColor]}`,
    `${text.printColors}: ${printColors}`,
    `${text.quantity}: ${formatMoney(quantity)} ${text.pieces}`,
    unitPrice !== null && total !== null
      ? `${text.estimate}: ${formatMoney(unitPrice, 2)} ${text.perPiece}, ${formatMoney(total)} ${text.currency}`
      : '',
    needCliche ? text.clicheMessage : ''
  ].filter(Boolean).join('\n');

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium mb-4">
            {text.badge}
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{text.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{text.subtitle}</p>
        </motion.div>

        <div className="calc-card">
          <div className="calc-inputs">
            <Segmented
              label={text.product}
              value={product}
              onChange={handleProductChange}
              options={[
                { value: 'maika' as BagProduct, label: text.products.maika },
                { value: 'vyrubnaya' as BagProduct, label: text.products.vyrubnaya }
              ]}
            />

            <label className="calc-field">
              <span className="calc-label">{text.size}</span>
              <select
                className="calc-input"
                value={sizeIndex}
                onChange={(e) => handleSizeChange(Number(e.target.value))}
              >
                {rows.map((item, index) => (
                  <option key={`${item.size}-${item.micron}`} value={index}>{sizeLabel(item)}</option>
                ))}
              </select>
            </label>

            <Segmented
              label={text.bagColor}
              value={bagColor}
              onChange={handleColorChange}
              options={[
                { value: 'white' as BagColor, label: text.bagColors.white },
                { value: 'colored' as BagColor, label: text.bagColors.colored }
              ]}
            />

            <Segmented
              label={text.printColors}
              value={printColors}
              onChange={setPrintColors}
              options={[1, 2, 3, 4].map((count) => ({ value: count, label: String(count) }))}
            />

            <label className="calc-field">
              <span className="calc-label">{text.quantity}, {text.pieces}</span>
              <input
                className={quantityErrorText ? 'calc-input calc-input--error' : 'calc-input'}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                maxLength={9}
                value={quantityInput}
                placeholder={String(minQuantity)}
                aria-invalid={quantityErrorText ? true : undefined}
                aria-describedby={quantityErrorText ? 'calc-quantity-error' : undefined}
                onChange={(e) => handleQuantityChange(e.target.value)}
                onBlur={handleQuantityBlur}
              />
              {quantityErrorText && (
                <span id="calc-quantity-error" className="calc-error" role="alert">{quantityErrorText}</span>
              )}
            </label>

            {/* Клише в сумму не входит: отметка только добавляет его в сообщение менеджеру */}
            <label className={needCliche ? 'calc-note calc-note--checked' : 'calc-note'}>
              <input
                type="checkbox"
                className="calc-note__input"
                checked={needCliche}
                onChange={(e) => setNeedCliche(e.target.checked)}
              />
              <span className="calc-note__box" aria-hidden="true">
                {needCliche && <Check size={14} strokeWidth={3} />}
              </span>
              <span>
                <strong className="calc-note__title">{text.clicheNeed}</strong>
                <strong>{text.clicheTitle}</strong> {text.clicheText}
              </span>
            </label>
          </div>

          <div className="calc-result">
            {unitPrice !== null && total !== null ? (
              <>
                <span className="calc-result__label">{text.estimate}</span>
                <span className="calc-result__total">≈ {formatMoney(total)} {text.currency}</span>
                <span className="calc-result__unit">{formatMoney(unitPrice, 2)} {text.perPiece}</span>
                {nextTierQuantity !== undefined && nextTierPrice !== undefined && (
                  <p className="calc-result__hint">
                    {text.nextTierBefore} {formatMoney(nextTierQuantity)} {text.nextTierAfter}: {formatMoney(nextTierPrice, 2)} {text.perPiece}
                  </p>
                )}
              </>
            ) : quantityError === 'max' ? (
              <>
                <span className="calc-result__label">{text.maxQuantityTitle}</span>
                <p className="calc-result__hint">{text.quantityMax}</p>
              </>
            ) : (
              <>
                <span className="calc-result__label">{text.minQuantityTitle}</span>
                <span className="calc-result__total">{formatMoney(minQuantity)} {text.pieces}</span>
                <p className="calc-result__hint">{text.minQuantityHint}</p>
              </>
            )}

            {/* Пока тираж не прошёл проверку, расчёт отправить нельзя */}
            {quantityError ? (
              <button type="button" className="calc-result__button" disabled>
                <WhatsAppIcon />
                {text.send}
              </button>
            ) : (
              <a
                href={`https://wa.me/77070402121?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="calc-result__button"
              >
                <WhatsAppIcon />
                {text.send}
              </a>
            )}
            <p className="calc-result__note">{text.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
