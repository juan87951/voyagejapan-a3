import { notFound } from 'next/navigation';
import { getCruiseBySlug, cruises } from '@/data';
import { CruiseDetailClient } from './CruiseDetailClient';

export function generateStaticParams() {
  return cruises.map((cruise) => ({ slug: cruise.slug }));
}

export default async function CruiseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cruise = getCruiseBySlug(slug);

  if (!cruise) {
    notFound();
  }

  return <CruiseDetailClient cruise={cruise} />;
}
