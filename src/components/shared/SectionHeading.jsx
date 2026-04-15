import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, align = 'center', light = false }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: '-60px' }} 
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-12 lg:mb-16`}
    >
      {label && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${light ? 'text-accent' : 'text-accent'}`}>
          {label}
        </span>
      )}
      <h2 className={`font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight ${light ? 'text-primary-foreground' : 'text-foreground'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base lg:text-lg leading-relaxed ${light ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}