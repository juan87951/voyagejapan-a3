'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { cruises } from '@/data';
import { Container, Input, Select, Textarea, Button } from '@/components/ui';
import content from '@/content/site.json';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  passport: z.string().min(1),
  phone: z.string().optional(),
  country: z.string().min(1),
  preferredCruise: z.string().min(1),
  cabinClass: z.string().min(1),
  guestCount: z.string().optional(),
  message: z.string().optional(),
  termsAgreement: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
  consent: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageContent />
    </Suspense>
  );
}

function ContactPageContent() {
  const t = content.contact;
  const b = content.booking;
  const searchParams = useSearchParams();
  const router = useRouter();
  const cancelled = searchParams.get('cancelled') === 'true';

  // Pre-fill from query params (from cabin row click)
  const prefilledCruise = searchParams.get('cruise') || '';
  const prefilledCabin = searchParams.get('cabin') || '';
  const matchedCruise = cruises.find(c => c.title === prefilledCruise);
  const prefilledCabinClass = prefilledCabin.toLowerCase().includes('penthouse') ? 'penthouse'
    : prefilledCabin.toLowerCase().includes('suite') ? 'suite'
    : prefilledCabin.toLowerCase().includes('balcony') ? 'balcony' : '';

  const [guestCount, setGuestCount] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredCruise: matchedCruise?.slug || '',
      cabinClass: prefilledCabinClass,
      guestCount: '1',
      message: prefilledCabin ? `Interested in: ${prefilledCabin}` : '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      alert(t.errors.submit);
      return;
    }
    const { checkoutUrl } = await res.json();
    router.push(checkoutUrl);
  };

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'CA', label: 'Canada' },
    { value: 'CN', label: 'China' },
    { value: 'SG', label: 'Singapore' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'TW', label: 'Taiwan' },
    { value: 'KR', label: 'South Korea' },
    { value: 'JP', label: 'Japan' },
    { value: 'TH', label: 'Thailand' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'PH', label: 'Philippines' },
    { value: 'IN', label: 'India' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'OTHER', label: 'Other' },
  ];

  const cabinClasses = [
    { value: 'penthouse', label: t.form.penthouse },
    { value: 'suite', label: t.form.suite },
    { value: 'balcony', label: t.form.balcony },
  ];

  const cruiseOptions = cruises.map((c) => ({
    value: c.slug,
    label: c.title,
  }));

  const guestOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5+', label: '5+' },
  ];

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

      {/* Form */}
      <section className="py-16 bg-gray-light">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Payment cancelled banner */}
            {cancelled && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                {b.paymentCancelled}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="font-display text-2xl font-semibold text-navy mb-8">
                {t.form.title}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={t.form.name}
                    placeholder={t.form.namePlaceholder}
                    error={errors.name ? t.errors.name : undefined}
                    {...register('name')}
                  />
                  <Input
                    label={t.form.email}
                    type="email"
                    placeholder={t.form.emailPlaceholder}
                    error={errors.email ? t.errors.email : undefined}
                    {...register('email')}
                  />
                </div>

                {/* Passport & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={t.form.passport}
                    placeholder={t.form.passportPlaceholder}
                    error={errors.passport ? t.errors.passport : undefined}
                    {...register('passport')}
                  />
                  <Input
                    label={`${t.form.phone} ${t.form.phoneOptional}`}
                    placeholder={t.form.phonePlaceholder}
                    {...register('phone')}
                  />
                </div>

                {/* Country */}
                <Select
                  label={t.form.country}
                  placeholder={t.form.countryPlaceholder}
                  options={countries}
                  error={errors.country ? t.errors.country : undefined}
                  {...register('country')}
                />

                {/* Cruise & Cabin */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    label={t.form.preferredCruise}
                    placeholder={t.form.preferredCruisePlaceholder}
                    options={cruiseOptions}
                    error={errors.preferredCruise ? t.errors.cruise : undefined}
                    {...register('preferredCruise')}
                  />
                  <Select
                    label={t.form.cabinClass}
                    placeholder={t.form.cabinClassPlaceholder}
                    options={cabinClasses}
                    error={errors.cabinClass ? t.errors.cabinClass : undefined}
                    {...register('cabinClass')}
                  />
                </div>

                {/* Guests */}
                <Select
                  label={t.form.guestCount}
                  options={guestOptions}
                  {...register('guestCount', {
                    onChange: (e) => setGuestCount(parseInt(e.target.value, 10) || 1),
                  })}
                />

                {/* Message */}
                <Textarea
                  label={t.form.message}
                  placeholder={t.form.messagePlaceholder}
                  {...register('message')}
                />

                {/* Terms & Conditions Agreement */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                      {...register('termsAgreement')}
                    />
                    <span className="text-sm text-gray-600">
                      {t.form.termsAgreement}{' '}
                      <Link href="/terms" target="_blank" className="text-gold underline hover:text-gold/80">
                        {t.form.termsLink}
                      </Link>
                      <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  {errors.termsAgreement && (
                    <p className="text-red-500 text-sm mt-1 ml-7">{t.errors.termsAgreement}</p>
                  )}
                </div>

                {/* Marketing Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                    {...register('consent')}
                  />
                  <span className="text-sm text-gray-600">
                    {t.form.consent}
                  </span>
                </label>

                {/* Deposit Info Box */}
                <div className="bg-navy/5 border border-navy/10 rounded-xl p-5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-semibold text-navy text-lg">{b.depositLabel}</span>
                    <span className="text-navy font-semibold">
                      {b.depositAmount} {b.depositPerPerson}
                      {guestCount > 1 && (
                        <span className="text-gray-500 font-normal text-sm">
                          {' '}({b.depositAmount} × {guestCount} = ${500 * guestCount})
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{b.depositDescription}</p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full rounded-full"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? t.form.submitting : t.form.submit}
                </Button>

                {/* Stripe badge */}
                <p className="text-center text-xs text-gray-400">
                  {b.securedBy}
                </p>
              </form>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
