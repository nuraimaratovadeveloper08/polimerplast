
import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Services } from '../components/Services';
import { FAQ } from '../components/FAQ';
import { About } from '../components/About';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ScrollToTop } from '../components/ScrollToTop';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <FAQ />
      <About />
      <CTA />
    </>
  );
}
