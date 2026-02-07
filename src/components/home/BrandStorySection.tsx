'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section, Container, SectionHeader, SectionTitle, SectionSubtitle, Button } from '@/components/ui';
import content from '@/content/site.json';

export function BrandStorySection() {
  const t = content.brandStory;

  return (
    <Section variant="cream">
      <Container size="md">
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionSubtitle className="text-gold font-medium tracking-widest uppercase text-sm">
              {t.subtitle}
            </SectionSubtitle>
            <SectionTitle className="text-navy mt-2">
              {t.title}
            </SectionTitle>
          </motion.div>
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/5] rounded-lg overflow-hidden bg-navy/10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/brand-story.jpg')" }}
            />
            {/* Fallback gradient when no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy/20 to-gold/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-700">
              {t.paragraph1}
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              {t.paragraph2}
            </p>
            <Link href="/ship">
              <Button variant="outline" className="rounded-full mt-4">
                {t.learnMore}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
