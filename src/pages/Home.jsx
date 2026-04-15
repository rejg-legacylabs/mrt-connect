import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Route, Users, Truck, Zap, Building2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import ServiceCard from '@/components/shared/ServiceCard';
import CTASection from '@/components/shared/CTASection';

const trustItems = [
  { icon: Shield, label: 'Reliable Scheduling' },
  { icon: Clock, label: 'On-Time Execution' },
  { icon: Route, label: 'Route Optimization' },
  { icon: Users, label: 'Passenger Transport' },
  { icon: Truck, label: 'Logistics Support' },
  { icon: Zap, label: 'Dispatch-Enabled' },
  { icon: Building2, label: 'Business Onboarding' },
  { icon: CheckCircle, label: 'Scalable Operations' },
];

const services = [
  { icon: Users, title: 'Passenger Transportation', description: 'Scheduled, coordinated rides for individuals, workforces, and organizations. Dependable transport that arrives ready.', link: '/passenger-transport' },
  { icon: Building2, title: 'Workforce & Program Transport', description: 'Structured transportation for employees, clients, and program participants — built around your operational schedule.', link: '/for-business' },
  { icon: Clock, title: 'Medical & Time-Sensitive Delivery', description: 'Priority handling for time-critical documents, specimens, and packages where every minute counts.', link: '/logistics-delivery' },
  { icon: Truck, title: 'Package & Route Delivery', description: 'Route-based delivery services covering multi-stop logistics, scheduled runs, and regional distribution.', link: '/logistics-delivery' },
  { icon: Shield, title: 'Business Transport Solutions', description: 'End-to-end transport management for organizations — from contract routes to overflow support and managed accounts.', link: '/for-business' },
  { icon: Route, title: 'Contract Route Services', description: 'Dedicated route coverage for recurring delivery and transport needs. Consistent, trackable, and dispatch-coordinated.', link: '/services' },
];

const steps = [
  { num: '01', title: 'Request Service', desc: 'Submit your transport or logistics request through our streamlined intake process.' },
  { num: '02', title: 'Scheduling & Review', desc: 'Our operations team reviews routing, timing, and resource requirements for your service.' },
  { num: '03', title: 'Company Onboarding', desc: 'For recurring needs, we set up your managed account with preferred routes and schedules.' },
  { num: '04', title: 'Dispatch & Execution', desc: 'Coordinated dispatch ensures your service runs on time, every time, with live operational awareness.' },
  { num: '05', title: 'Ongoing Support', desc: 'Dedicated operational visibility, reporting, and scaling as your needs grow.' },
];

const techFeatures = [
  'Coordinated dispatch management',
  'Intelligent route planning',
  'Driver workflow alignment',
  'Real-time operational readiness',
  'Client & rider communication',
  'Scalable service infrastructure',
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,transparent_0%,hsl(var(--primary))_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-6">
                Premium Transportation & Logistics
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-[1.08] tracking-tight">
              Transportation that moves at the speed of your mission.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg lg:text-xl text-primary-foreground/65 max-w-xl leading-relaxed">
              Dispatch-enabled transport and logistics for organizations, operations, and people who need reliable, coordinated service — every time.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10 flex flex-wrap gap-4">
              <Link to="/book-service">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base">
                  Book Service <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/company-onboarding">
                <Button size="lg" variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10 font-semibold px-8 h-12 text-base">
                  Onboard Your Company
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border/50 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-4">
            {trustItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex flex-col items-center text-center gap-2">
                <item.icon className="w-5 h-5 text-accent" />
                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Services" title="Comprehensive transport and logistics solutions" description="From passenger rides to multi-stop deliveries, MRT provides structured, dispatch-enabled services for individuals and organizations." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} link={s.link} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="How It Works" title="From request to execution in five steps" description="Our streamlined process ensures every service is coordinated, confirmed, and delivered with operational precision." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="bg-card rounded-xl p-6 border border-border/60 h-full">
                  <span className="text-3xl font-heading font-bold text-accent/20">{step.num}</span>
                  <h3 className="font-heading font-semibold text-base mt-2 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY / OPERATIONS */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">Technology-Enabled</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight">Operations built on modern infrastructure</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                MRT runs on a structured transportation platform that enables coordinated dispatch, intelligent route planning, and real-time operational visibility — ensuring every service is executed with precision.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {techFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/technology" className="inline-flex items-center mt-8 text-sm font-semibold text-foreground hover:text-accent transition-colors">
                Explore our technology <ArrowRight className="ml-1.5 w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-primary rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
              <div className="relative space-y-6">
                {['Dispatch Coordination', 'Route Planning Engine', 'Driver Workflow System', 'Live Operations Dashboard'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-primary-foreground font-medium text-sm">{item}</span>
                      <div className="h-1.5 mt-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${75 + i * 6}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 }} className="h-full bg-accent rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOR BUSINESS CTA */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border/60 rounded-2xl p-8 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">For Business</span>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight">Transport solutions scaled for your organization</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Recurring routes, contracted deliveries, workforce transportation, and managed accounts — built for companies that need consistent, coordinated service.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/company-onboarding">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                      Onboard Your Company <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/for-business">
                    <Button variant="outline" className="font-semibold">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Recurring Routes', 'Contract Delivery', 'Workforce Transport', 'Managed Accounts', 'Flexible Scheduling', 'Overflow Support'].map((item, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-4 text-center">
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection 
        title="Move your operations forward with MRT" 
        description="Whether you need a single ride or a full contract transport solution, our operations team is ready to deliver."
        primaryLabel="Book Service"
        primaryLink="/book-service"
        secondaryLabel="Talk to Operations"
        secondaryLink="/contact"
      />
    </div>
  );
}