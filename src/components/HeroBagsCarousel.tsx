import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import bagGalmart from '../assets/hero-bags/galmart.webp';
import bagAvrora from '../assets/hero-bags/avrora.webp';
import bagVkusmart from '../assets/hero-bags/vkusmart.webp';
import bagKet from '../assets/hero-bags/ket.webp';
import bagBlue from '../assets/hero-bags/blue.webp';

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

// Реальные пакеты клиентов (фото с вырезанным фоном)
const bags: string[] = [bagGalmart, bagAvrora, bagVkusmart, bagKet, bagBlue];

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
                <img
                  src={bag}
                  alt=""
                  draggable={false}
                  loading="eager"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
