import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceCard({ icon: Icon, title, description, link, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={link || '/services'} className="group block h-full">
        <div className="h-full bg-card border border-border/60 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1">
          <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-heading font-semibold text-lg mb-2.5">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
          <span className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
            Learn more <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}