import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Route, Users, Radio, Shield, ArrowRight, Layers, Monitor, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import CTASection from '@/components/shared/CTASection';

const platformFeatures = [
  { icon: Zap, title: 'Dispatch Coordination', desc: 'Centralized dispatch management that assigns, tracks, and confirms every service in real time. No service runs unmonitored.' },
  { icon: Route, title: 'Route Planning', desc: 'Intelligent routing that optimizes multi-stop sequences, reduces transit time, and ensures efficient service coverage.' },
  { icon: Monitor, title: 'Operational Visibility', desc: 'Live dashboards and operational views that keep your team informed on service status, driver positions, and delivery confirmations.' },
  { icon: Users, title: 'Driver Workflows', desc: 'Structured driver assignment, task management, and communication tools that keep your field team aligned and accountable.' },
  { icon: Smartphone, title: 'Rider & Client Communication', desc: 'Automated notifications, scheduling confirmations, and status updates that keep passengers and clients informed throughout service.' },
  { icon: Layers, title: 'Scalable Infrastructure', desc: 'A platform built to grow — from a few daily routes to enterprise-scale operations across multiple service areas.' },
];

const capabilities = [
  'Automated dispatch assignment',
  'Multi-stop route optimization',
  'Real-time service tracking',
  'Driver mobile workflow tools',
  'Client notification systems',
  'Scheduling & capacity management',
  'Reporting & analytics',
  'API-ready architecture',
];

export default function Technology() {
  return (
    <div>
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Technology</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Modern operations. Intelligent infrastructure.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/65 leading-relaxed max-w-xl">
              MRT runs on a purpose-built transportation platform that powers dispatch, routing, driver coordination, and client communication at scale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl">Platform capabilities</h2>
            <p className="mt-4 text-muted-foreground">Every component of our platform is designed to deliver operational precision and scalable service management.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card border border-border/60 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Deep Dive */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">Under The Hood</span>
              <h2 className="font-heading font-bold text-3xl leading-tight">Built for the future of transportation</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our platform is designed with API-ready architecture that supports future integrations, connected systems, and expanding operational capabilities. As transportation evolves, MRT's technology evolves with it.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Radio className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-primary rounded-2xl p-8 lg:p-12">
              <div className="space-y-5">
                {['Dispatch Engine', 'Route Optimizer', 'Fleet Management', 'Client Portal', 'Reporting Suite'].map((mod, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-primary-foreground font-medium text-sm">{mod}</span>
                    </div>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-accent font-semibold">Active</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection title="Experience technology-driven transportation" description="See how MRT's platform can support your organization's transport and logistics needs." primaryLabel="Request a Demo" primaryLink="/book-service" secondaryLabel="Contact Operations" secondaryLink="/contact" />
    </div>
  );
}