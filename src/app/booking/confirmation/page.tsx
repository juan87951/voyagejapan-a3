'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import content from '@/content/site.json';

interface BookingData {
  id: number;
  customer_name: string;
  cruise_title: string;
  cabin_name: string | null;
  guest_count: number;
  deposit_amount: number;
  status: string;
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const t = content.booking.confirmation;
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(!!sessionId);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    fetch(`/api/bookings/confirm?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled && data.booking) setBooking(data.booking);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [sessionId]);

  const depositDisplay = booking
    ? (booking.deposit_amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    : '$500';

  return (
    <>
      <section className="bg-navy pt-32 pb-16">
        <Container>
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              {t.title}
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container size="sm">
          {loading ? (
            <div className="text-center text-gray-500">{content.common.loading}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Success Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="font-display text-3xl font-semibold text-navy mb-4">
                {t.title}
              </h2>

              {booking && (
                <div className="text-left bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cruise</span>
                      <span className="font-medium text-navy">{booking.cruise_title}</span>
                    </div>
                    {booking.cabin_name && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cabin Class</span>
                        <span className="font-medium text-navy">{booking.cabin_name}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Guests</span>
                      <span className="font-medium text-navy">{booking.guest_count}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="text-gray-500">Deposit Paid</span>
                      <span className="font-semibold text-navy">{depositDisplay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.reference}</span>
                      <span className="font-semibold text-gold">VJ-{booking.id}</span>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-600 text-lg mb-6">
                {t.message}
              </p>

              {/* Next Steps */}
              <div className="text-left bg-navy/5 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <h3 className="font-display font-semibold text-navy mb-3">{t.nextStepsTitle}</h3>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                  <li>{t.step1}</li>
                  <li>{t.step2}</li>
                  <li>{t.step3}</li>
                </ol>
              </div>

              <Link href="/">
                <Button variant="primary" className="rounded-full">
                  {t.cta}
                </Button>
              </Link>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}
