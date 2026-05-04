import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview, track } from '../lib/fpixel';

export function MetaPixelTracker() {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    pageview();
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) track('Contact', { method: 'phone' });
      else if (href.includes('wa.me')) track('Contact', { method: 'whatsapp' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
