import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle, Phone, Building2, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const categories = [
  { value: 'passenger_transport', label: 'Passenger Transportation' },
  { value: 'workforce_transport', label: 'Workforce / Employment Transport' },
  { value: 'logistics_delivery', label: 'Logistics & Delivery' },
  { value: 'contract_routes', label: 'Contract Route Services' },
  { value: 'mixed_services', label: 'Mixed / Multiple Services' },
  { value: 'other', label: 'Other' },
];

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'as_needed', label: 'As Needed' },
  { value: 'project_based', label: 'Project-Based' },
];

const benefits = [
  { icon: Building2, title: 'Managed Account', desc: 'Dedicated account coordination with tailored service configuration.' },
  { icon: Shield, title: 'Reliable Coverage', desc: 'Consistent scheduling with dispatch-managed service execution.' },
  { icon: Clock, title: 'Fast Setup', desc: 'Streamlined onboarding from inquiry to active service.' },
];

export default function CompanyOnboarding() {
  const [form, setForm] = useState({
    company_name: '', contact_person: '', role_title: '', email: '', phone: '',
    service_category: '', expected_frequency: '', service_geography: '',
    timing_windows: '', estimated_monthly_volume: '', special_handling: '', comments: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.CompanyOnboarding.create(form);
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Onboarding request submitted!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-heading font-bold text-2xl mb-3">Onboarding Request Received</h2>
          <p className="text-muted-foreground mb-6">Our business team will review your submission and contact you to schedule a consultation within two business days.</p>
          <a href="tel:5127705952" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80">
            <Phone className="w-4 h-4" /> (512) 770-5952
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Company Onboarding</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary-foreground leading-tight">Bring your organization on board.</h1>
            <p className="mt-4 text-primary-foreground/65 text-lg">Set up a managed transport account for your company. Complete the form below to start the onboarding process.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Benefits Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-28 space-y-6">
                <h3 className="font-heading font-semibold text-lg">Why onboard with MRT?</h3>
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{b.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-sm mb-2">Onboarding Process</h4>
                  <ol className="space-y-2 text-xs text-muted-foreground">
                    <li>1. Submit company information</li>
                    <li>2. Define service needs & volume</li>
                    <li>3. Consultation & route review</li>
                    <li>4. Account setup & configuration</li>
                    <li>5. Service begins</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-4 pb-2 border-b border-border">Company Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2"><Label>Company Name *</Label><Input value={form.company_name} onChange={e => handleChange('company_name', e.target.value)} required className="mt-1.5" /></div>
                    <div><Label>Contact Person *</Label><Input value={form.contact_person} onChange={e => handleChange('contact_person', e.target.value)} required className="mt-1.5" /></div>
                    <div><Label>Role / Title</Label><Input value={form.role_title} onChange={e => handleChange('role_title', e.target.value)} className="mt-1.5" /></div>
                    <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} required className="mt-1.5" /></div>
                    <div><Label>Phone</Label><Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="mt-1.5" /></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-lg mb-4 pb-2 border-b border-border">Service Requirements</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Service Category *</Label>
                        <Select value={form.service_category} onValueChange={v => handleChange('service_category', v)}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
                          <SelectContent>{categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Expected Frequency</Label>
                        <Select value={form.expected_frequency} onValueChange={v => handleChange('expected_frequency', v)}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select frequency" /></SelectTrigger>
                          <SelectContent>{frequencies.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div><Label>Service Geography</Label><Input value={form.service_geography} onChange={e => handleChange('service_geography', e.target.value)} placeholder="e.g. Austin metro area, Central Texas" className="mt-1.5" /></div>
                    <div><Label>Timing / Scheduling Windows</Label><Input value={form.timing_windows} onChange={e => handleChange('timing_windows', e.target.value)} placeholder="e.g. Weekdays 7AM-6PM, 24/7" className="mt-1.5" /></div>
                    <div><Label>Estimated Monthly Volume</Label><Input value={form.estimated_monthly_volume} onChange={e => handleChange('estimated_monthly_volume', e.target.value)} placeholder="e.g. 100 rides, 50 deliveries" className="mt-1.5" /></div>
                    <div><Label>Special Handling / Compliance Needs</Label><Textarea value={form.special_handling} onChange={e => handleChange('special_handling', e.target.value)} placeholder="Any special requirements..." rows={3} className="mt-1.5" /></div>
                    <div><Label>Additional Comments</Label><Textarea value={form.comments} onChange={e => handleChange('comments', e.target.value)} placeholder="Anything else we should know..." rows={3} className="mt-1.5" /></div>
                  </div>
                </div>

                <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-12 text-base">
                  {submitting ? 'Submitting...' : 'Submit Onboarding Request'} {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}