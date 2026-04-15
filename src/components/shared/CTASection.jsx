import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection({ title, description, primaryLabel, primaryLink, secondaryLabel, secondaryLink }) {
  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground leading-tight">
            {title || "Ready to get started?"}
          </h2>
          <p className="mt-4 text-primary-foreground/70 text-lg leading-relaxed">
            {description || "Connect with our operations team to discuss your transportation and logistics needs."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to={primaryLink || '/book-service'}>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">
                {primaryLabel || 'Book Service'} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            {secondaryLabel && (
              <Link to={secondaryLink || '/contact'}>
                <Button size="lg" variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10 font-semibold px-8">
                  {secondaryLabel}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}