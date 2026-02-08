'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section, Container, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/ui';
import content from '@/content/site.json';

export function ExperienceLinksSection() {
  const t = content.experienceLinks;

  return (
    <Section>
      <Container>
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle className="text-navy">{t.title}</SectionTitle>
            <SectionSubtitle className="text-gray-600">{t.subtitle}</SectionSubtitle>
          </motion.div>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={card.href}>
                <div className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
                      {card.label}
                    </span>
                    <p className="text-white/80 text-sm leading-relaxed group-hover:text-gold transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
