'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  phone: z.string().optional(),
  country: z.string().min(1),
  preferredCruise: z.string().optional(),
  cabinClass: z.string().optional(),
  guestCount: z.string().optional(),
  message: z.string().optional(),
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
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill from query params (from cabin row click)
  const prefilledCruise = searchParams.get('cruise') || '';
  const prefilledCabin = searchParams.get('cabin') || '';
  const matchedCruise = cruises.find(c => c.title === prefilledCruise);
  const prefilledCabinClass = prefilledCabin.toLowerCase().includes('penthouse') ? 'penthouse'
    : prefilledCabin.toLowerCase().includes('suite') ? 'suite'
    : prefilledCabin.toLowerCase().includes('balcony') ? 'balcony' : '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredCruise: matchedCruise?.slug || '',
      cabinClass: prefilledCabinClass,
      message: prefilledCabin ? `Interested in: ${prefilledCabin}` : '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    setIsSubmitted(true);
  };

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'CA', label: 'Canada' },
    { value: 'SG', label: 'Singapore' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'TW', label: 'Taiwan' },
    { value: 'KR', label: 'South Korea' },
    { value: 'JP', label: 'Japan' },
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

  if (isSubmitted) {
    return (
      <>
        <section className="bg-navy pt-32 pb-16">
          <Container>
            <div className="text-center">
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
                {t.pageTitle}
              </h1>
            </div>
          </Container>
        </section>
        <section className="py-24">
          <Container size="sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display text-3xl font-semibold text-navy mb-4">
                {t.success.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {t.success.message}
              </p>
              <Link href="/">
                <Button variant="primary" className="rounded-full">
                  {t.success.cta}
                </Button>
              </Link>
            </motion.div>
          </Container>
        </section>
      </>
    );
  }

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

                {/* Phone & Country */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={`${t.form.phone} ${t.form.phoneOptional}`}
                    placeholder={t.form.phonePlaceholder}
                    {...register('phone')}
                  />
                  <Select
                    label={t.form.country}
                    placeholder={t.form.countryPlaceholder}
                    options={countries}
                    error={errors.country ? t.errors.country : undefined}
                    {...register('country')}
                  />
                </div>

                {/* Cruise & Cabin */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    label={t.form.preferredCruise}
                    placeholder={t.form.preferredCruisePlaceholder}
                    options={cruiseOptions}
                    {...register('preferredCruise')}
                  />
                  <Select
                    label={t.form.cabinClass}
                    placeholder={t.form.cabinClassPlaceholder}
                    options={cabinClasses}
                    {...register('cabinClass')}
                  />
                </div>

                {/* Guests */}
                <Select
                  label={t.form.guestCount}
                  options={guestOptions}
                  {...register('guestCount')}
                />

                {/* Message */}
                <Textarea
                  label={t.form.message}
                  placeholder={t.form.messagePlaceholder}
                  {...register('message')}
                />

                {/* Consent */}
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
              </form>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
