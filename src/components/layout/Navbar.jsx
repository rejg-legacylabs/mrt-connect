import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { 
    label: 'Services', path: '/services',
    children: [
      { label: 'Passenger Transport', path: '/passenger-transport' },
      { label: 'Logistics & Delivery', path: '/logistics-delivery' },
    ]
  },
  { label: 'For Business', path: '/for-business' },
  { label: 'Technology', path: '/technology' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-card/95 backdrop-blur-xl shadow-sm border-b border-border/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">M</span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg tracking-tight text-foreground">MRT</span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium -mt-0.5">Mission Ready Transport</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              link.children ? (
                <div key={link.label} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <Link to={link.path} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${location.pathname === link.path ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 mt-1 w-56 bg-card rounded-lg shadow-xl border border-border/50 py-2 overflow-hidden">
                        {link.children.map(child => (
                          <Link key={child.path} to={child.path} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.path} to={link.path} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === link.path ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/book-service">
              <Button variant="outline" size="sm" className="font-medium text-sm">
                Book Service
              </Button>
            </Link>
            <Link to="/company-onboarding">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium text-sm">
                Onboard Your Company
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-md text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-card border-t border-border/50 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <React.Fragment key={link.path}>
                  <Link to={link.path} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md">
                    {link.label}
                  </Link>
                  {link.children?.map(child => (
                    <Link key={child.path} to={child.path} className="block pl-8 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md">
                      {child.label}
                    </Link>
                  ))}
                </React.Fragment>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link to="/book-service"><Button variant="outline" className="w-full">Book Service</Button></Link>
                <Link to="/company-onboarding"><Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Onboard Your Company</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}