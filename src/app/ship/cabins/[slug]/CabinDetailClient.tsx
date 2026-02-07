'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CabinType, Cruise } from '@/types';
import { Container, Section, Button } from '@/components/ui';
import { formatPriceUSD, formatDate } from '@/lib/utils';
import content from '@/content/site.json';

export function CabinDetailClient({
  cabin,
  cruises,
}: {
  cabin: CabinType;
  cruises: Cruise[];
}) {
  const t = content.cabinDetail;
  const shipT = content.ship.cabins;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <Image
            src={cabin.imageUrl}
            alt={cabin.name}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <Container className="relative z-10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/ship"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.backToShip}
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                cabin.class === 'penthouse' ? 'bg-gold text-navy' :
                cabin.class === 'suite' ? 'bg-white text-navy' :
                'bg-gray-200 text-gray-700'
              }`}>
                {shipT[cabin.class]}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-2">
              {cabin.name}
            </h1>
            <p className="text-gold text-lg font-medium">{cabin.size}</p>
          </motion.div>
        </Container>
      </section>

      {/* Specs & Description */}
      <Section variant="cream">
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Specs Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-2xl font-display font-semibold text-gold">{cabin.size}</div>
                  <div className="text-sm text-gray-600 mt-1">{t.size}</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-2xl font-display font-semibold text-gold">{cabin.deck}</div>
                  <div className="text-sm text-gray-600 mt-1">{t.deck}</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-2xl font-display font-semibold text-gold">{cabin.roomCount}</div>
                  <div className="text-sm text-gray-600 mt-1">{t.rooms}</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-2xl font-display font-semibold text-gold">{cabin.maxOccupancy}</div>
                  <div className="text-sm text-gray-600 mt-1">{t.maxOccupancy}</div>
                </div>
              </div>
            </motion.div>

            {/* Description & Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {cabin.description}
              </p>
              <div>
                <h3 className="text-xs font-semibold text-navy uppercase tracking-wider mb-4">
                  {t.features}
                </h3>
                <ul className="space-y-2">
                  {cabin.features.map((feature, i) => (
                    <li key={i} className="text-gray-700 flex items-center gap-3">
                      <span className="text-gold text-xs">&#9670;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Available Voyages */}
      {cruises.length > 0 && (
        <Section>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl font-semibold text-navy text-center mb-12">
                {t.voyagesTitle}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cruises.map((cruise, i) => {
                const cabinCat = cruise.cabinCategories.find((cat) => cat.slug === cabin.slug);
                const lowestPrice = cabinCat?.priceFrom;

                return (
                  <motion.div
                    key={cruise.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gold/50 hover:shadow-md transition-all">
                      <h3 className="font-display text-lg font-semibold text-navy mb-2">
                        {cruise.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {formatDate(cruise.departureDate)} &middot; {cruise.duration.days} days &middot; {cruise.departurePort}
                      </p>
                      {lowestPrice && (
                        <p className="text-gold font-semibold text-lg mb-4">
                          {t.from} {formatPriceUSD(lowestPrice)}{' '}
                          <span className="text-gray-500 text-sm font-normal">{t.perPerson}</span>
                        </p>
                      )}
                      <Link href={`/cruises/${cruise.slug}`}>
                        <Button variant="outline" size="sm" className="w-full rounded-full">
                          {t.viewVoyage}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
