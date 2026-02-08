'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { artCollection } from '@/data';
import { Container, Section, SectionHeader, SectionTitle, SectionSubtitle, Button } from '@/components/ui';
import content from '@/content/site.json';

export default function ArtPage() {
  const t = content.ship.art;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url('https://a3art.asukacruise.co.jp/images/artworks/kazumi-murose-1.jpg')` }}
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
              {t.title}
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Intro */}
      <Section variant="cream">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.description}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Featured Artworks */}
      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle className="text-navy">Featured Artists & Masterpieces</SectionTitle>
            <SectionSubtitle className="text-gray-600">
              Original masterworks by Japan&apos;s most celebrated artists
            </SectionSubtitle>
          </SectionHeader>

          <div className="space-y-24">
            {artCollection.map((artwork, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-center`}
              >
                {/* Artwork Image */}
                <div className="md:w-3/5">
                  <div className="relative overflow-hidden rounded-xl shadow-xl">
                    <img
                      src={artwork.imageUrl}
                      alt={`${artwork.title} by ${artwork.artist}`}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="md:w-2/5 space-y-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={artwork.artistImageUrl}
                      alt={artwork.artist}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gold shadow-md"
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-navy">
                        {artwork.artist}
                      </h3>
                      <p className="text-sm text-gold font-medium">{artwork.artistTitle}</p>
                    </div>
                  </div>

                  <h4 className="font-display text-2xl md:text-3xl font-semibold text-navy italic">
                    &ldquo;{artwork.title}&rdquo;
                  </h4>

                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="px-3 py-1.5 bg-navy/10 text-navy rounded-full font-medium">
                      {artwork.medium}
                    </span>
                    <span className="px-3 py-1.5 bg-gold/20 text-gold-dark rounded-full font-medium">
                      {artwork.location}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-base">
                    {artwork.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Open Competition */}
      <Section variant="navy">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-semibold text-white mb-6">
              Open Art Competition
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              {t.competitionNote}
            </p>
            <p className="text-white/50 text-sm">
              Judged by Reiji Hiramatsu, Hiroshi Senju, Noriko Tamura, Reiichi Tsuchiya, and Kazumi Murose.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="cream">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-semibold text-navy mb-4">
              Experience Art at Sea
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Step aboard AsukaIII and immerse yourself in one of the finest floating art collections in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cruises">
                <Button variant="primary" size="lg" className="rounded-full">
                  Browse Voyages
                </Button>
              </Link>
              <Link href="/ship">
                <Button variant="outline" size="lg" className="rounded-full">
                  Explore The Ship
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
