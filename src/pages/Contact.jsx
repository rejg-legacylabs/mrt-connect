import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, MapPin, Mail, ArrowRight, CheckCircle, Clock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'service_inquiry', label: 'Service Inquiry' },
  { value: 'business_onboarding', label: 'Business Onboarding' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'support', label: 'Support' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', inquiry_type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const created = await base44.entities.ContactInquiry.create(form);
    try {
      await base44.functions.forwardLeadToOps({
        source: 'Contact',
        record_id: created?.id,
        fields: form,
      });
    } catch (err) {
      console.error('forwardLeadToOps failed (non-blocking):', err);
    }
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Message sent successfully!');
  };

  return (
    <div>
      <section className="bg-primary pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Contact</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary-foreground leading-tight">Let's talk operations.</h1>
            <p className="mt-4 text-primary-foreground/65 text-lg">Reach out for service inquiries, business onboarding, or to speak with our operations team.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-semibold text-lg mb-6">Get in touch</h3>
                <div className="space-y-5">
                  <a href="tel:5127705952" className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-semibold text-sm group-hover:text-accent transition-colors">(512) 770-5952</p>
                    </div>
                  </a>
                  <a href="mailto:info@missionreadytransport.com" className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-semibold text-sm group-hover:text-accent transition-colors">info@missionreadytransport.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="font-semibold text-sm">Austin, TX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hours</p>
                      <p className="font-semibold text-sm">Mon–Fri: 7:00 AM – 7:00 PM</p>
                      <p className="text-xs text-muted-foreground">Dispatch available extended hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-accent" />
                  <h4 className="font-semibold text-sm">Business Onboarding</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Setting up a company account? Use our dedicated onboarding form for faster processing.</p>
                <Link to="/company-onboarding">
                  <Button variant="outline" size="sm" className="w-full">Start Onboarding <ArrowRight className="ml-2 w-3.5 h-3.5" /></Button>
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2">Message Sent</h3>
                    <p className="text-muted-foreground">We'll get back to you within one business day.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border/60 rounded-xl p-6 lg:p-8 space-y-5">
                  <h3 className="font-heading font-semibold text-lg">Send us a message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label>Full Name *</Label><Input value={form.name} onChange={e => handleChange('name', e.target.value)} required className="mt-1.5" /></div>
                    <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} required className="mt-1.5" /></div>
                    <div><Label>Phone</Label><Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="mt-1.5" /></div>
                    <div>
                      <Label>Inquiry Type</Label>
                      <Select value={form.inquiry_type} onValueChange={v => handleChange('inquiry_type', v)}>
                        <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>{inquiryTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div><Label>Message *</Label><Textarea value={form.message} onChange={e => handleChange('message', e.target.value)} required placeholder="How can we help?" rows={5} className="mt-1.5" /></div>
                  <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    {submitting ? 'Sending...' : 'Send Message'} {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
