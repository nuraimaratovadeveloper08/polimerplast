import React from 'react';
import { PackagingOptions } from './PackagingOptions';
import { HandleOptions } from './HandleOptions';

// Якорь #services нужен для пункта меню «Услуги»
export function Services() {
  return (
    <section id="services" className="pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PackagingOptions />
        <HandleOptions />
      </div>
    </section>
  );
}
