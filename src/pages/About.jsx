import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Target, Users, Shield, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';

const values = [
  { icon: Shield, title: 'Reliability', desc: 'Every service commitment is honored. On time, on route, without compromise.' },
  { icon: Target, title: 'Mission-Driven', desc: 'We exist to serve the transportation needs of people and organizations doing meaningful work.' },
  { icon: Users, title: 'Professionalism', desc: 'From dispatch to delivery, our operations reflect the standards of a premium service company.' },
  { icon: TrendingUp, title: 'Scalability', desc: 'Our infrastructure grows with your needs — from single rides to enterprise-level route networks.' },
];

const capabilities = [
  'Passenger transportation for individuals and organizations',
  'Workforce and program-based transport coordination',
  'Route-based logistics and parcel delivery',
  'Time-sensitive and medical courier-style services',
  'Contract route management and recurring scheduling',
  'Organizational onboarding and managed account setup',
  'Dispatch-enabled operational coordination',
  'Technology-driven route planning and visibility',
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">About MRT</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Built for missions that matter.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/65 leading-relaxed max-w-xl">
              MRT — Mission Ready Transport is a premium transportation and logistics company serving organizations, operations, and individuals who demand structured, reliable service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">Our Story</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight">More than a transport company</h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  MRT was founded on a straightforward principle: organizations doing important work deserve transportation and logistics support that matches their seriousness. Not ride-share approximations. Not generic courier drop-offs. Real, coordinated, dispatch-managed service.
                </p>
                <p>
                  We serve nonprofits, healthcare-adjacent operations, workforce programs, and commercial enterprises — providing structured passenger transport, route-based deliveries, and contracted logistics services built for reliability at scale.
                </p>
                <p>
                  Every route we run, every rider we serve, and every package we deliver operates within a technology-enabled framework designed for operational precision and accountability.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-muted/50 rounded-2xl p-8 lg:p-10">
              <h3 className="font-heading font-semibold text-lg mb-6">What We Support</h3>
              <div className="space-y-3">
                {capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Values" title="Principles that drive every operation" description="These aren't aspirational statements — they're operational standards embedded in every service we provide." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border/60">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Partner with a transport company that takes your mission seriously" description="Request service, start onboarding, or connect with our team to explore how MRT can serve your organization." primaryLabel="Get Started" primaryLink="/book-service" secondaryLabel="Contact Us" secondaryLink="/contact" />
    </div>
  );
}