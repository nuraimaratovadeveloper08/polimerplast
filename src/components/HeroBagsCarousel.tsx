import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import logo from '../assets/new_logo_1.png';
import logoGalmart from '../assets/catalog/logo-galmart.png';
import logoVkusmart from '../assets/catalog/logo-vkusmart.png';
import { useLanguage } from '../i18n/LanguageContext';

// Параметры coverflow: при modifier 5 соседний пакет разворачивается на 250° и показывает обратную сторону
const ROTATE = 50;
const STRETCH = 20;
const DEPTH = 100;
const MODIFIER = 5;
const SPEED = 1500;
const DELAY = 2000;
const BASE_WIDTH = 300;
const PERSPECTIVE = 1200;
// Сколько пакетов рендерим по каждую сторону от центрального
const RANGE = 4;
const SWIPE_THRESHOLD = 40;

const TSHIRT_PATH = 'M30 40 L88 40 C88 112 118 134 150 134 C182 134 212 112 212 40 L270 40 L270 378 Q210 388 150 382 Q90 376 30 384 Z';
const DIECUT_PATH = 'M38 24 L262 24 Q272 24 272 34 L272 374 Q272 384 262 384 L38 384 Q28 384 28 374 L28 34 Q28 24 38 24 Z M112 54 Q100 54 100 66 Q100 78 112 78 L188 78 Q200 78 200 66 Q200 54 188 54 Z';

type PrintKey = 'logo' | 'yourLogo' | 'yourDesign' | 'colors' | 'brand' | 'galmart' | 'vkusmart';

interface Bag {
  shape: 'tshirt' | 'diecut';
  colors: [string, string];
  ink: string;
  print: PrintKey;
}

const bags: Bag[] = [
  { shape: 'diecut', colors: ['#ffffff', '#dfe6ee'], ink: '#1e3a8a', print: 'logo' },
  { shape: 'tshirt', colors: ['#ffffff', '#e2e8f0'], ink: '#0f172a', print: 'galmart' },
  { shape: 'diecut', colors: ['#a855f7', '#db2777'], ink: '#ffffff', print: 'yourDesign' },
  { shape: 'tshirt', colors: ['#3b82f6', '#1e40af'], ink: '#ffffff', print: 'yourLogo' },
  { shape: 'diecut', colors: ['#ffffff', '#e2e8f0'], ink: '#0f172a', print: 'colors' },
  { shape: 'tshirt', colors: ['#ffffff', '#e2e8f0'], ink: '#b91c1c', print: 'vkusmart' },
  { shape: 'diecut', colors: ['#1e293b', '#0f172a'], ink: '#ffffff', print: 'brand' },
  { shape: 'tshirt', colors: ['#ffffff', '#e2e8f0'], ink: '#1e3a8a', print: 'logo' },
  { shape: 'tshirt', colors: ['#22c55e', '#047857'], ink: '#ffffff', print: 'yourLogo' }
];

function BagPrint({ bag, centerY }: { bag: Bag; centerY: number }) {
  const { t } = useLanguage();

  if (bag.print === 'logo') {
    return <image href={logo} x="50" y={centerY - 60} width="200" height="120" preserveAspectRatio="xMidYMid meet" />;
  }

  if (bag.print === 'galmart') {
    return <image href={logoGalmart} x="55" y={centerY - 80} width="190" height="160" preserveAspectRatio="xMidYMid meet" />;
  }

  if (bag.print === 'vkusmart') {
    return <image href={logoVkusmart} x="40" y={centerY - 50} width="220" height="100" preserveAspectRatio="xMidYMid meet" />;
  }

  if (bag.print === 'colors') {
    const swatches = ['#06b6d4', '#db2777', '#facc15', '#0f172a'];
    return (
      <g>
        {swatches.map((color, index) => (
          <circle key={color} cx={150 + (index - 1.5) * 42} cy={centerY - 34} r="24" fill={color} fillOpacity="0.9" />
        ))}
        {t.hero.bagColors.map((line, index) => (
          <text key={line} x="150" y={centerY + 26 + index * 26} textAnchor="middle" fontSize="20" fontWeight="700" fill={bag.ink}>
            {line}
          </text>
        ))}
      </g>
    );
  }

  const lines = bag.print === 'yourLogo' ? t.hero.bagYourLogo : bag.print === 'yourDesign' ? t.hero.bagYourDesign : ['ПОЛИМЕР', 'ПЛАСТ'];

  return (
    <g>
      <rect x="62" y={centerY - 58} width="176" height="116" rx="14" fill="none" stroke={bag.ink} strokeOpacity="0.55" strokeWidth="3" strokeDasharray={bag.print === 'brand' ? undefined : '10 7'} />
      {lines.map((line, index) => (
        <text key={line} x="150" y={centerY - 6 + index * 30} textAnchor="middle" fontSize="23" fontWeight="800" letterSpacing="0.5" fill={bag.ink}>
          {line}
        </text>
      ))}
    </g>
  );
}

function BagArt({ bag }: { bag: Bag }) {
  const id = useId().replace(/:/g, '');
  const path = bag.shape === 'tshirt' ? TSHIRT_PATH : DIECUT_PATH;

  return (
    <svg viewBox="0 0 300 400" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bag.colors[0]} />
          <stop offset="1" stopColor={bag.colors[1]} />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.32" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="0.46" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.68" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0.1" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={path} clipRule="evenodd" />
        </clipPath>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path d={path} fill={`url(#${id}-base)`} fillRule="evenodd" />

      <g clipPath={`url(#${id}-clip)`}>
        <BagPrint bag={bag} centerY={bag.shape === 'tshirt' ? 250 : 220} />

        {/* Складки плёнки */}
        <g filter={`url(#${id}-soft)`} fill="none" strokeLinecap="round">
          <path d="M52 140 Q70 230 48 372" stroke="#0f172a" strokeOpacity="0.14" strokeWidth="7" />
          <path d="M248 130 Q230 240 254 376" stroke="#0f172a" strokeOpacity="0.14" strokeWidth="7" />
          <path d="M92 96 Q128 190 84 300" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="8" />
          <path d="M214 170 Q186 262 222 356" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="6" />
          <path d="M40 368 Q150 344 262 370" stroke="#0f172a" strokeOpacity="0.12" strokeWidth="6" />
        </g>

        {bag.shape === 'diecut' && (
          <path d="M84 40 H216 V92 H84 Z" fill="#ffffff" fillOpacity="0.14" />
        )}
        <rect x="0" y="0" width="300" height="400" fill={`url(#${id}-sheen)`} />
      </g>

      <path d={path} fill="none" fillRule="evenodd" stroke="#0f172a" strokeOpacity="0.14" strokeWidth="1" />
    </svg>
  );
}

function getSlideStyle(offset: number, width: number, speed: number): React.CSSProperties {
  const scale = width / BASE_WIDTH;
  const multiplier = offset * MODIFIER;
  const translateX = offset * width - STRETCH * multiplier * scale;
  const translateZ = -DEPTH * Math.abs(multiplier) * scale;
  const rotateY = -ROTATE * multiplier;

  return {
    position: 'absolute',
    top: 0,
    left: '50%',
    width,
    height: width * (4 / 3),
    marginLeft: -width / 2,
    transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg)`,
    transition: `transform ${speed}ms ease, opacity ${speed}ms ease`,
    opacity: Math.abs(offset) >= RANGE ? 0 : 1,
    zIndex: 10 - Math.abs(offset),
    willChange: 'transform'
  };
}

export function HeroBagsCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(BASE_WIDTH);
  const isInView = useInView(stageRef);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setWidth(Math.min(stage.clientWidth / 2, BASE_WIDTH));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    const timer = setInterval(() => {
      if (!document.hidden) setCurrent((value) => value + 1);
    }, SPEED + DELAY);
    return () => clearInterval(timer);
  }, [isInView, reducedMotion]);

  const handlePointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const distance = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) {
      setCurrent((value) => value + (distance < 0 ? 1 : -1));
    }
  };

  const slots = [];
  for (let slot = current - RANGE - 1; slot <= current + RANGE + 1; slot++) {
    slots.push(slot);
  }

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      onPointerDown={(e) => { swipeStartX.current = e.clientX; }}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { swipeStartX.current = null; }}
      style={{
        position: 'relative',
        width: '100%',
        height: width * (4 / 3),
        perspective: PERSPECTIVE * (width / BASE_WIDTH),
        touchAction: 'pan-y',
        userSelect: 'none',
        cursor: 'grab'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
        {slots.map((slot) => {
          const bag = bags[((slot % bags.length) + bags.length) % bags.length];
          return (
            <div key={slot} style={getSlideStyle(slot - current, width, reducedMotion ? 0 : SPEED)}>
              <div style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 18px 22px rgba(0, 0, 0, 0.35))' }}>
                <BagArt bag={bag} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
