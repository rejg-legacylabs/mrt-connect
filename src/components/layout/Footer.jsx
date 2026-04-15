import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerSections = [
  {
    title: 'Services',
    links: [
      { label: 'Passenger Transport', path: '/passenger-transport' },
      { label: 'Logistics & Delivery', path: '/logistics-delivery' },
      { label: 'For Business', path: '/for-business' },
      { label: 'All Services', path: '/services' },
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About MRT', path: '/about' },
      { label: 'Technology', path: '/technology' },
      { label: 'Contact', path: '/contact' },
    ]
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Book Service', path: '/book-service' },
      { label: 'Company Onboarding', path: '/company-onboarding' },
      { label: 'Request a Quote', path: '/book-service' },
    ]
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-bold text-2xl lg:text-3xl">Ready to move forward?</h3>
              <p className="text-primary-foreground/70 mt-2 max-w-md">Partner with MRT for reliable, premium transportation and logistics solutions built for your operations.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/book-service">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
                  Request Service <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/company-onboarding">
                <Button variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10 font-medium">
                  Onboard Your Company
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-sm">M</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg">MRT</span>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-primary-foreground/60 -mt-0.5">Mission Ready Transport</span>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs mb-6">
              Premium transportation and logistics solutions. Dispatch-enabled, operationally serious, and built for organizations that demand reliability.
            </p>
            <div className="space-y-3">
              <a href="tel:5127705952" className="flex items-center gap-2.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                (512) 770-5952
              </a>
              <a href="mailto:info@missionreadytransport.com" className="flex items-center gap-2.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                info@missionreadytransport.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Austin, TX</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.path + link.label}>
                    <Link to={link.path} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} MRT — Mission Ready Transport. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-primary-foreground/40">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}