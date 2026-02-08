'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Cruise, AvailabilityStatus } from '@/types';
import { Container, Button } from '@/components/ui';
import { formatDate, formatPriceUSD, cabinAvailabilitySlug } from '@/lib/utils';
import availabilityData from '@/data/availability.json';
import content from '@/content/site.json';

const tabs = ['overview', 'itinerary', 'cabins'] as const;

function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  const t = content.cruiseDetail;
  switch (status) {
    case 'available':
      return <span className="text-green-600 font-semibold" title={t.available}>〇</span>;
    case 'waitlist':
      return <span className="text-amber-500 font-semibold" title={t.waitlist}>△</span>;
    case 'sold_out':
      return <span className="text-red-500 font-semibold" title={t.soldOut}>×</span>;
  }
}

export function CruiseDetailClient({ cruise }: { cruise: Cruise }) {
  const t = content.cruiseDetail;
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Get availability for this cruise
  const cruiseAvailability = (availabilityData.cruises as Record<string, Record<string, AvailabilityStatus>>)[cruise.slug] || {};

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url('${cruise.imageUrl}')` }}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <Container className="relative z-10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
              {cruise.duration.days} {t.day}{cruise.duration.days > 1 ? 's' : ''} / {cruise.duration.nights} night{cruise.duration.nights > 1 ? 's' : ''}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-3">
              {cruise.title}
            </h1>
            <p className="text-white/70 text-lg">
              {cruise.route}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Tabs */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
        <Container>
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-gold text-navy'
                    : 'border-transparent text-gray-500 hover:text-navy'
                }`}
              >
                {t[tab]}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <section className="py-16">
        <Container>
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-3 gap-12">
                {/* Key Info */}
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-navy mb-4">
                      {t.overview}
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {cruise.shortDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy mb-4">
                      {t.highlights}
                    </h3>
                    <ul className="space-y-3">
                      {cruise.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-gold mt-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-cream rounded-lg p-6">
                    <h3 className="font-display text-lg font-semibold text-navy mb-4">
                      {t.departure}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.departure}</span>
                        <span className="font-medium text-navy">{formatDate(cruise.departureDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.arrival}</span>
                        <span className="font-medium text-navy">{formatDate(cruise.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.port}</span>
                        <span className="font-medium text-navy">
                          {cruise.departurePort}
                        </span>
                      </div>
                    </div>
                    <Link href="/contact" className="block mt-6">
                      <Button variant="primary" className="w-full rounded-full">
                        {t.inquireNow}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'itinerary' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-2xl font-semibold text-navy mb-8">
                {t.itinerary}
              </h2>

              <div className="space-y-0">
                {cruise.itinerary.map((stop, i) => {
                  const stopDate = new Date(cruise.departureDate);
                  stopDate.setDate(stopDate.getDate() + stop.day - 1);
                  const dateStr = stopDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                  return (
                  <div
                    key={i}
                    className={`flex items-center gap-6 py-5 ${
                      i < cruise.itinerary.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    {/* Day marker */}
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-xs text-gray-500 uppercase">{t.day} {stop.day}</div>
                      <div className="text-lg font-display font-semibold text-navy">{dateStr}</div>
                    </div>

                    {/* Timeline dot */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-3 h-3 rounded-full ${stop.isSeaDay ? 'bg-navy/30' : 'bg-gold'}`} />
                    </div>

                    {/* Port info */}
                    <div className="flex-1">
                      <div className="font-medium text-navy">
                        {stop.port}
                      </div>
                      {stop.isSeaDay ? (
                        <div className="text-sm text-gray-500 italic">
                          {t.atSea}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {stop.arrival && `${t.arrival}: ${stop.arrival}`}
                          {stop.arrival && stop.departure && ' — '}
                          {stop.departure && `${t.departure}: ${stop.departure}`}
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Route Map */}
              {cruise.routeMapUrl && (
                <div className="mt-12 max-w-2xl mx-auto">
                  <img
                    src={cruise.routeMapUrl}
                    alt={`${cruise.title} route map`}
                    className="w-full rounded-xl border border-gray-200"
                  />
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'cabins' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-2xl font-semibold text-navy mb-4">
                {t.cabins}
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                {t.priceNote}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-navy/20">
                      <th className="text-left py-3 pr-4 text-sm font-semibold text-navy">
                        {t.class}
                      </th>
                      <th className="text-left py-3 pr-4 text-sm font-semibold text-navy">
                        {t.category}
                      </th>
                      <th className="text-right py-3 pr-4 text-sm font-semibold text-navy">
                        {t.price}
                      </th>
                      <th className="text-center py-3 text-sm font-semibold text-navy">
                        {t.status}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cruise.cabinCategories.map((cabin, i) => {
                      const availKey = cabinAvailabilitySlug(cabin.name);
                      const availability = cruiseAvailability[availKey] || 'available';
                      const inquiryUrl = `/contact?cruise=${encodeURIComponent(cruise.title)}&cabin=${encodeURIComponent(cabin.name)}`;

                      return (
                        <tr
                          key={i}
                          className="border-b border-gray-100 hover:bg-cream/50 cursor-pointer transition-colors"
                          onClick={() => window.location.href = inquiryUrl}
                        >
                          <td className="py-4 pr-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              cabin.class === 'penthouse' ? 'bg-gold/20 text-gold-dark' :
                              cabin.class === 'suite' ? 'bg-navy/10 text-navy' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {cabin.classLabel}
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="font-medium text-navy">
                              {cabin.name}
                            </span>
                            {cabin.singleOnly && (
                              <span className="ml-2 text-xs text-gray-400">({t.singleOnly})</span>
                            )}
                          </td>
                          <td className="py-4 pr-4 text-right">
                            {cabin.priceFrom ? (
                              <span className="text-navy font-medium">
                                {t.from} {formatPriceUSD(cabin.priceFrom)}
                                <span className="text-gray-400 text-xs font-normal block">{t.perPerson}</span>
                              </span>
                            ) : (
                              <span className="text-sm text-gray-500 italic">
                                {t.contactForPricing}
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-center text-lg">
                            <AvailabilityBadge status={availability} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 text-xs text-gray-400 italic">
                {t.exchangeRateNote}
              </p>

              {availabilityData.lastUpdated && (
                <p className="mt-2 text-xs text-gray-400">
                  Last updated: {new Date(availabilityData.lastUpdated).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              )}

              <div className="mt-8 text-center">
                <Link href="/contact">
                  <Button variant="primary" className="rounded-full">
                    {t.inquireNow}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}
