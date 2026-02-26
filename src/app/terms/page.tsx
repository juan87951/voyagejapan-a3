'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import content from '@/content/site.json';

const PDF_URL =
  'https://asuka-web.s3.ap-northeast-1.amazonaws.com/wp-content/uploads/2026/02/20115412/Terms-and-Conditions-of-Contract-of-Carriage-for-Passengers-on-Cruise-Vessels_Jan2026.pdf';

export default function TermsPage() {
  const t = content.terms;

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

      {/* Content */}
      <section className="py-16 bg-gray-light">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <p className="text-gray-600 text-lg mb-8">
                {t.description}
              </p>

              {/* Download Button */}
              <div className="mb-10">
                <a href={PDF_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="rounded-full inline-flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t.downloadLabel}
                  </Button>
                </a>
              </div>

              {/* Chapter Summaries */}
              <div className="space-y-6">
                {t.sections.map((section, i) => (
                  <div key={i} className="border-l-4 border-gold pl-6 py-2">
                    <h3 className="font-display text-lg font-semibold text-navy mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600">
                      {section.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Last Updated */}
              <p className="text-sm text-gray-400 mt-10">
                {t.lastUpdated}
              </p>

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                <Link href="/contact">
                  <Button variant="primary" className="rounded-full">
                    Inquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
