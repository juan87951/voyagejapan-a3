'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFeaturedCruises } from '@/data';
import { Section, Container, SectionHeader, SectionTitle, SectionSubtitle, Card, CardContent, Button } from '@/components/ui';
import { formatDate, formatPriceUSD } from '@/lib/utils';
import content from '@/content/site.json';

export function FeaturedCruisesSection() {
  const t = content.featuredCruises;
  const featured = getFeaturedCruises();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.slice(0, 3).map((cruise, i) => {
            const lowestPrice = cruise.cabinCategories.reduce(
              (min, cat) => (cat.priceFrom && cat.priceFrom < min ? cat.priceFrom : min),
              Infinity
            );

            return (
              <motion.div
                key={cruise.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/cruises/${cruise.slug}`}>
                  <Card variant="elevated" className="group cursor-pointer h-full">
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy/10">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${cruise.imageUrl}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-green-400/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {cruise.duration.days} {t.days} / {cruise.duration.nights} {t.nights}
                        </span>
                      </div>
                    </div>
                    <CardContent>
                      <h3 className="font-display text-xl font-semibold text-navy group-hover:text-gold transition-colors">
                        {cruise.title}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                        {cruise.shortDescription}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {formatDate(cruise.departureDate)}
                        </span>
                        {lowestPrice < Infinity && (
                          <span className="text-gold font-semibold">
                            {t.from} {formatPriceUSD(lowestPrice)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/cruises">
            <Button variant="outline" className="rounded-full">
              {t.viewAll}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
