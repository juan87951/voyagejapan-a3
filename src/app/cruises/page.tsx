'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cruises } from '@/data';
import { Container, Card, CardContent } from '@/components/ui';
import { formatDate, formatPriceUSD } from '@/lib/utils';
import content from '@/content/site.json';

const filters = ['all', 'spring', 'summer'] as const;

export default function CruisesPage() {
  const t = content.cruises;
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCruises = activeFilter === 'all'
    ? cruises
    : cruises.filter((c) => c.season === activeFilter);

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy pt-32 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t.pageSubtitle}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters & Cruises */}
      <section className="py-16 bg-gray-light">
        <Container>
          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy hover:bg-navy/10'
                }`}
              >
                {t.filters[filter]}
              </button>
            ))}
          </div>

          {/* Cruise Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCruises.map((cruise, i) => {
                const lowestPrice = cruise.cabinCategories.reduce(
                  (min, cat) => (cat.priceFrom && cat.priceFrom < min ? cat.priceFrom : min),
                  Infinity
                );

                return (
                  <motion.div
                    key={cruise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link href={`/cruises/${cruise.slug}`}>
                      <Card variant="elevated" className="group cursor-pointer h-full">
                        <div className="relative aspect-[16/10] overflow-hidden bg-navy/10">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url('${cruise.imageUrl}')` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
                          <div className="absolute top-4 right-4">
                            {cruise.featured && (
                              <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                                {t.filters.featured}
                              </span>
                            )}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <span className="text-white text-sm font-medium">
                              {cruise.duration.days} {t.days} / {cruise.duration.nights} {t.nights}
                            </span>
                            <span className="text-gold text-sm font-medium">
                              {cruise.departurePort}
                            </span>
                          </div>
                        </div>
                        <CardContent>
                          <h3 className="font-display text-lg font-semibold text-navy group-hover:text-gold transition-colors">
                            {cruise.title}
                          </h3>
                          <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-2">
                            {cruise.shortDescription}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-500 text-sm">
                              {formatDate(cruise.departureDate)}
                            </span>
                            {lowestPrice < Infinity ? (
                              <span className="text-gold font-semibold text-sm">
                                {t.from} {formatPriceUSD(lowestPrice)}
                              </span>
                            ) : (
                              <span className="text-gold font-medium text-sm">
                                {t.viewDetails} →
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}
