'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { shipSpecs, cabinTypes, restaurants } from '@/data';
import { Container, Section, SectionHeader, SectionTitle, SectionSubtitle, Card, CardContent } from '@/components/ui';
import content from '@/content/site.json';

export default function ShipPage() {
  const t = content.ship;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/images/ship-hero.jpg')" }}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <Container className="relative z-10 pb-12">
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

      {/* Overview */}
      <Section variant="cream">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-6">
              {t.overview.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.overview.description}
            </p>
          </motion.div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {shipSpecs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-center p-6 bg-white rounded-lg"
              >
                <div className="text-2xl font-display font-semibold text-gold mb-1">
                  {spec.value}
                </div>
                <div className="text-sm text-gray-600">
                  {spec.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Cabins */}
      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle className="text-navy">{t.cabins.title}</SectionTitle>
            <SectionSubtitle className="text-gray-600">{t.cabins.subtitle}</SectionSubtitle>
          </SectionHeader>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cabinTypes.map((cabin, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/ship/cabins/${cabin.slug}`}>
                  <Card variant="bordered" className="h-full group cursor-pointer">
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
                      <Image
                        src={cabin.imageUrl}
                        alt={cabin.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          cabin.class === 'penthouse' ? 'bg-gold text-navy' :
                          cabin.class === 'suite' ? 'bg-navy text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {t.cabins[cabin.class]}
                        </span>
                      </div>
                    </div>
                    <CardContent>
                      <h3 className="font-display text-xl font-semibold text-navy group-hover:text-gold transition-colors">
                        {cabin.name}
                      </h3>
                      <p className="text-gold text-sm font-medium mt-1">{cabin.size}</p>
                      <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                        {cabin.description}
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                          {t.cabins.features}
                        </p>
                        <ul className="space-y-1">
                          {cabin.features.slice(0, 3).map((feature, j) => (
                            <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="text-gold text-xs">&#9670;</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="mt-4 text-gold text-sm font-medium">
                        {t.cabins.viewDetails} →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Restaurants */}
      <Section variant="navy">
        <Container>
          <SectionHeader>
            <SectionTitle className="text-white">{t.dining.title}</SectionTitle>
            <SectionSubtitle className="text-white/70">{t.dining.subtitle}</SectionSubtitle>
          </SectionHeader>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.filter(r => r.type === 'restaurant').map((restaurant, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
              >
                {restaurant.imageUrl && (
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-gold mb-1">
                    {restaurant.name}
                  </h3>
                  <p className="text-white/50 text-sm mb-3">
                    {restaurant.cuisine}
                    {restaurant.note && <span className="ml-2 text-gold/60">· {restaurant.note}</span>}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {restaurant.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bars & Lounges */}
      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle className="text-navy">{t.dining.barsTitle}</SectionTitle>
            <SectionSubtitle className="text-gray-600">{t.dining.barsSubtitle}</SectionSubtitle>
          </SectionHeader>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.filter(r => r.type === 'bar').map((bar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card variant="bordered" className="h-full">
                  {bar.imageUrl && (
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={bar.imageUrl}
                        alt={bar.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent>
                    <h3 className="font-display text-xl font-semibold text-navy mb-1">
                      {bar.name}
                    </h3>
                    <p className="text-gold text-sm font-medium mb-3">
                      {bar.cuisine}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {bar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
