'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import content from '@/content/site.json';

export function CTASection() {
  const t = content.callToAction;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            {t.subtitle}
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="rounded-full">
              {t.cta}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
