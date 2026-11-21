
import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { FAQ } from '../components/FAQ';
import { About } from '../components/About';
import { CTA } from '../components/CTA';
import { Partners } from '../components/Partners';
import { PriceCalculator } from '../components/PriceCalculator';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ScrollToTop } from '../components/ScrollToTop';

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <PriceCalculator />
      <FAQ />
      <About />
      <CTA />
      <Partners />
    </>
  );
}
