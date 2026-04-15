import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Clock, Route, MapPin, Truck, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import CTASection from '@/components/shared/CTASection';

const services = [
  { icon: Route, title: 'Route-Based Deliveries', desc: 'Multi-stop delivery routes optimized for speed and reliability. Consistent execution across your service geography.' },
  { icon: Clock, title: 'Time-Sensitive Runs', desc: 'Priority handling for documents, specimens, and packages operating on strict deadlines. Every minute is accounted for.' },
  { icon: Package, title: 'Contract Delivery Support', desc: 'Ongoing delivery agreements with dedicated route coverage, scheduled pickups, and managed dispatch coordination.' },
  { icon: MapPin, title: 'Same-Day Coordination', desc: 'Rapid response delivery for urgent requests. Dispatched, routed, and confirmed within your required timeframe.' },
  { icon: Truck, title: 'Scheduled Delivery Programs', desc: 'Recurring delivery schedules aligned with your business operations. Daily, weekly, or custom frequency runs.' },
  { icon: Shield, title: 'Multi-Stop Route Servicing', desc: 'Complex delivery routes managed through our dispatch system with sequential stop optimization and real-time tracking.' },
];

export default function LogisticsDelivery() {
  return (
    <div>
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Logistics & Delivery</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Delivery operations, dispatched with precision.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/65 leading-relaxed max-w-xl">
              Route-based logistics, time-sensitive deliveries, and contract courier services — coordinated through our dispatch platform for maximum reliability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/book-service"><Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">Request Delivery <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10 font-semibold px-8">Talk to Logistics</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl">Logistics services built for operations</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Every delivery is dispatch-managed with route optimization, real-time coordination, and confirmation tracking.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card border border-border/60 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">What We Deliver</span>
              <h2 className="font-heading font-bold text-3xl leading-tight">Handling what matters, when it matters</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our logistics services cover a broad range of delivery needs — from standard parcel routes to time-critical runs where precision is non-negotiable.
              </p>
            </div>
            <div className="space-y-3">
              {['Documents & legal filings', 'Laboratory specimens & samples', 'Packages & parcels', 'Office supplies & materials', 'Inter-office transfers', 'Pharmacy & medical supply runs', 'Contract route deliveries', 'Emergency same-day requests'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card rounded-lg px-4 py-3 border border-border/60">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Get your deliveries moving with MRT" description="Request service for a one-time delivery or set up recurring logistics support for your organization." primaryLabel="Request Delivery" primaryLink="/book-service" secondaryLabel="Onboard Your Company" secondaryLink="/company-onboarding" />
    </div>
  );
}