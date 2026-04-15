import React from 'react';
import { Users, Briefcase, Clock, Truck, Route, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import ServiceCard from '@/components/shared/ServiceCard';
import CTASection from '@/components/shared/CTASection';

const services = [
  { icon: Users, title: 'Passenger Transportation', description: 'Scheduled, coordinated rides for individuals, groups, and organizations. Whether it\'s a daily commute, an appointment run, or a program-supported transport, we arrive ready.', useCases: ['Appointment transportation', 'Daily scheduled rides', 'Group transport coordination', 'Recurring passenger routes'], link: '/passenger-transport' },
  { icon: Briefcase, title: 'Workforce & Employment Transport', description: 'Structured transportation for employees, program participants, and workforce development clients. Built around shift schedules, site locations, and organizational timing.', useCases: ['Employee shuttle services', 'Workforce program transport', 'Shift-based scheduling', 'Multi-site coordination'], link: '/for-business' },
  { icon: Clock, title: 'Medical & Time-Sensitive Delivery', description: 'Priority handling for documents, specimens, and packages that operate on strict timelines. Every handoff is tracked, every route is optimized for speed.', useCases: ['Document courier runs', 'Lab specimen transport', 'Same-day priority delivery', 'Scheduled medical logistics'], link: '/logistics-delivery' },
  { icon: Truck, title: 'Logistics & Parcel Delivery', description: 'Route-based delivery services for packages, supplies, and materials. Multi-stop coordination with real-time dispatch management.', useCases: ['Multi-stop route delivery', 'Supply distribution', 'Scheduled parcel runs', 'Regional delivery coverage'], link: '/logistics-delivery' },
  { icon: Route, title: 'Contract Route Services', description: 'Dedicated route assignments for recurring transport and delivery needs. Consistent coverage with dispatch-coordinated execution across your service geography.', useCases: ['Fixed-route contracts', 'Recurring delivery schedules', 'Dedicated driver assignment', 'Regional route networks'], link: '/for-business' },
  { icon: Building2, title: 'Organizational Transport Solutions', description: 'Comprehensive transport management for organizations — from needs assessment through account setup, scheduling, and ongoing operational support.', useCases: ['Custom transport programs', 'Managed account setup', 'Multi-service coordination', 'Enterprise-scale operations'], link: '/company-onboarding' },
];

export default function Services() {
  return (
    <div>
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Services</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Full-spectrum transport & logistics.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/65 leading-relaxed max-w-xl">
              From passenger rides to contract route delivery, MRT provides dispatch-enabled services built for reliability, coordination, and scale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card border border-border/60 rounded-xl p-6 lg:p-8 hover:shadow-lg transition-shadow">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <s.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Ideal For</h4>
                    <ul className="space-y-2">
                      {s.useCases.map((uc, j) => (
                        <li key={j} className="text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Find the right service for your operation" description="Tell us what you need and our team will design the right transportation or logistics solution." primaryLabel="Request Service" primaryLink="/book-service" secondaryLabel="Contact Operations" secondaryLink="/contact" />
    </div>
  );
}