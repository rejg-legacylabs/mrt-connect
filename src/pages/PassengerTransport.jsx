import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Route, Shield, ArrowRight, CheckCircle, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import CTASection from '@/components/shared/CTASection';

const features = [
  { icon: Calendar, title: 'Scheduled Rides', desc: 'Pre-arranged pickup and drop-off coordinated around your timetable. No guesswork, no delays.' },
  { icon: Users, title: 'Workforce Transport', desc: 'Structured rides for employees, participants, and clients — aligned with shift schedules and site locations.' },
  { icon: Clock, title: 'Appointment Transportation', desc: 'Dependable transport to medical, legal, and professional appointments with on-time guarantees.' },
  { icon: Route, title: 'Organized Route Services', desc: 'Multi-rider route coordination for programs, organizations, and facilities with consistent scheduling.' },
  { icon: Repeat, title: 'Recurring Transport', desc: 'Set it and rely on it. Daily, weekly, or custom frequency schedules for ongoing transportation needs.' },
  { icon: Shield, title: 'Dispatch Coordination', desc: 'Every ride is managed through our dispatch system — tracked, confirmed, and supported in real time.' },
];

export default function PassengerTransport() {
  return (
    <div>
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Passenger Transport</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Dependable rides, coordinated with precision.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/65 leading-relaxed max-w-xl">
              Premium passenger transportation for individuals, workforces, and organizations. Scheduled, structured, and dispatch-managed for complete reliability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/book-service"><Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">Book a Ride <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10 font-semibold px-8">Contact Us</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl">How we serve passengers</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Every ride is coordinated through our operations platform — from initial request to drop-off confirmation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card border border-border/60 rounded-xl p-6">
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

      {/* Who We Serve */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 block">Who We Serve</span>
              <h2 className="font-heading font-bold text-3xl leading-tight">Transport for every passenger need</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                MRT provides passenger transportation across a range of use cases — always with the same standard of reliability, professionalism, and operational coordination.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Healthcare appointments', 'Workforce commutes', 'Program participants', 'Senior transportation', 'Court & legal appointments', 'Education & training', 'Event transportation', 'Custom scheduling'].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-card rounded-lg px-4 py-3 border border-border/60">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Book reliable passenger transport today" description="Request a ride, set up recurring service, or connect with our scheduling team." primaryLabel="Book Service" primaryLink="/book-service" secondaryLabel="Learn About Business Solutions" secondaryLink="/for-business" />
    </div>
  );
}