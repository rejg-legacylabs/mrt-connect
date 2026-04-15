import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, Route, Truck, Users, Calendar, ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import CTASection from '@/components/shared/CTASection';

const solutions = [
  { icon: Route, title: 'Recurring Contract Routes', desc: 'Dedicated route coverage for your ongoing transport and delivery needs with consistent scheduling and driver assignment.' },
  { icon: Truck, title: 'Contracted Deliveries', desc: 'Managed delivery programs for organizations requiring reliable, repeatable logistics across their service areas.' },
  { icon: Users, title: 'Workforce & Client Transport', desc: 'Structured transportation for your employees, program participants, or clients — aligned to your operational schedule.' },
  { icon: Calendar, title: 'Flexible Scheduling', desc: 'Time-block scheduling, shift-based coordination, and custom frequency options to match your operational rhythm.' },
  { icon: Building2, title: 'Managed Accounts', desc: 'Full account setup with dedicated coordination, billing management, and operational reporting for your organization.' },
  { icon: Shield, title: 'Overflow & Surge Support', desc: 'Scalable capacity for peak periods, special projects, or expanding service areas without infrastructure investment.' },
];

const onboardingSteps = [
  { num: '01', title: 'Submit Your Inquiry', desc: 'Tell us about your organization, service needs, and operational requirements.' },
  { num: '02', title: 'Consultation & Planning', desc: 'Our team reviews your needs and designs a tailored transport or logistics program.' },
  { num: '03', title: 'Account Setup', desc: 'We configure your routes, scheduling, and coordination within our platform.' },
  { num: '04', title: 'Service Launch', desc: 'Dispatch-coordinated service begins with full operational visibility and support.' },
];

export default function ForBusiness() {
  return (
    <div>
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">For Business</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Transport solutions scaled for your organization.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/65 leading-relaxed max-w-xl">
              From recurring routes to managed transport accounts, MRT delivers the structure and reliability that organizations demand.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/company-onboarding"><Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">Onboard Your Company <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
              <Link to="/book-service"><Button size="lg" variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10 font-semibold px-8">Request a Quote</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl">Business transport & logistics solutions</h2>
            <p className="mt-4 text-muted-foreground">Structured services designed for organizations that need consistent, coordinated transportation and delivery.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card border border-border/60 rounded-xl p-6 hover:shadow-lg transition-shadow">
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

      {/* Onboarding Process */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">Getting Started</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl">Simple onboarding, serious service</h2>
            <p className="mt-4 text-muted-foreground">From initial inquiry to active service — our onboarding process is designed to get your operations moving fast.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onboardingSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border/60 text-center">
                <span className="text-4xl font-heading font-bold text-accent/20">{step.num}</span>
                <h3 className="font-heading font-semibold mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Let's build your transport program" description="Submit an onboarding request or connect with our business team to discuss your organization's needs." primaryLabel="Onboard Your Company" primaryLink="/company-onboarding" secondaryLabel="Request Business Quote" secondaryLink="/book-service" />
    </div>
  );
}