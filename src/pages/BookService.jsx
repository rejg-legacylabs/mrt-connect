import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const serviceTypes = [
  { value: 'passenger_transport', label: 'Passenger Transportation' },
  { value: 'workforce_transport', label: 'Workforce / Program Transport' },
  { value: 'medical_delivery', label: 'Medical / Time-Sensitive Delivery' },
  { value: 'package_delivery', label: 'Package & Route Delivery' },
  { value: 'contract_route', label: 'Contract Route Services' },
  { value: 'business_solutions', label: 'Business Transport Solutions' },
  { value: 'other', label: 'Other / General Inquiry' },
];

export default function BookService() {
  const [form, setForm] = useState({
    contact_name: '', company: '', phone: '', email: '',
    service_type: '', pickup_location: '', destination: '',
    preferred_date: '', preferred_time: '', is_recurring: false,
    estimated_volume: '', notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const created = await base44.entities.ServiceRequest.create(form);
    // Forward to MRT ops app (fire-and-forget; failures are queued + audited server-side)
    try {
      await base44.functions.forwardLeadToOps({
        source: 'BookService',
        record_id: created?.id,
        fields: form,
      });
    } catch (err) {
      // Visitor should not see ops-routing errors — lead is captured locally.
      console.error('forwardLeadToOps failed (non-blocking):', err);
    }
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Service request submitted successfully!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-heading font-bold text-2xl mb-3">Request Submitted</h2>
          <p className="text-muted-foreground mb-6">Thank you for your service request. Our operations team will review your inquiry and respond within one business day.</p>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(38_92%_50%/0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Book Service</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary-foreground leading-tight">Request transportation or logistics service.</h1>
            <p className="mt-4 text-primary-foreground/65 text-lg">Complete the form below and our operations team will coordinate your service. For urgent requests, call us directly.</p>
            <a href="tel:5127705952" className="inline-flex items-center gap-2 mt-4 text-accent font-medium text-sm">
              <Phone className="w-4 h-4" /> (512) 770-5952
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4 pb-2 border-b border-border">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Full Name *</Label><Input id="name" value={form.contact_name} onChange={e => handleChange('contact_name', e.target.value)} required className="mt-1.5" /></div>
                <div><Label htmlFor="company">Company / Organization</Label><Input id="company" value={form.company} onChange={e => handleChange('company', e.target.value)} className="mt-1.5" /></div>
                <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} required className="mt-1.5" /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="mt-1.5" /></div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4 pb-2 border-b border-border">Service Details</h3>
              <div className="space-y-4">
                <div>
                  <Label>Service Type *</Label>
                  <Select value={form.service_type} onValueChange={v => handleChange('service_type', v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select service type" /></SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map(st => <SelectItem key={st.value} value={st.value}>{st.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Pickup Location</Label><Input value={form.pickup_location} onChange={e => handleChange('pickup_location', e.target.value)} placeholder="Address or location" className="mt-1.5" /></div>
                  <div><Label>Destination</Label><Input value={form.destination} onChange={e => handleChange('destination', e.target.value)} placeholder="Address or location" className="mt-1.5" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Preferred Date</Label><Input type="date" value={form.preferred_date} onChange={e => handleChange('preferred_date', e.target.value)} className="mt-1.5" /></div>
                  <div><Label>Preferred Time</Label><Input value={form.preferred_time} onChange={e => handleChange('preferred_time', e.target.value)} placeholder="e.g. 9:00 AM - 11:00 AM" className="mt-1.5" /></div>
                </div>
                <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
                  <Switch checked={form.is_recurring} onCheckedChange={v => handleChange('is_recurring', v)} />
                  <div>
                    <Label className="mb-0">Recurring Service</Label>
                    <p className="text-xs text-muted-foreground">This is an ongoing or repeating service need</p>
                  </div>
                </div>
                <div><Label>Estimated Volume / Frequency</Label><Input value={form.estimated_volume} onChange={e => handleChange('estimated_volume', e.target.value)} placeholder="e.g. 5 rides/week, 20 deliveries/month" className="mt-1.5" /></div>
                <div><Label>Additional Notes</Label><Textarea value={form.notes} onChange={e => handleChange('notes', e.target.value)} placeholder="Describe your needs, special requirements, or questions..." rows={4} className="mt-1.5" /></div>
              </div>
            </div>

            <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-12 text-base">
              {submitting ? 'Submitting...' : 'Submit Service Request'} {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
