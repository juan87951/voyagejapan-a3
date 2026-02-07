'use client';

import { motion } from 'framer-motion';
import { Section, Container, SectionHeader, SectionTitle } from '@/components/ui';
import content from '@/content/site.json';

type ShipHighlightsKey = keyof typeof content.shipHighlights;

const stats: { labelKey: ShipHighlightsKey; valueKey: ShipHighlightsKey; icon: string }[] = [
  { labelKey: 'guests', valueKey: 'guestCapacity', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { labelKey: 'tonnage', valueKey: 'tonnageValue', icon: 'M2 20h20M5 20V10l7-7 7 7v10M9 20v-4h4v4' },
  { labelKey: 'crew', valueKey: 'crewCount', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { labelKey: 'restaurants', valueKey: 'restaurantCount', icon: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3' },
  { labelKey: 'cabins', valueKey: 'cabinCount', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zM9 22V12h6v10' },
  { labelKey: 'ratio', valueKey: 'ratioValue', icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3' },
];

export function ShipHighlightsSection() {
  const t = content.shipHighlights;

  return (
    <Section variant="navy">
      <Container>
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle className="text-white">{t.title}</SectionTitle>
          </motion.div>
        </SectionHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={stat.icon} />
                </svg>
              </div>
              <div className="text-2xl md:text-3xl font-display font-semibold text-gold mb-1">
                {t[stat.valueKey]}
              </div>
              <div className="text-white/70 text-sm">
                {t[stat.labelKey]}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
