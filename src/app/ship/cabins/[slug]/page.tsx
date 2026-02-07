import { notFound } from 'next/navigation';
import { cabinTypes, getCabinBySlug, cruises } from '@/data';
import { CabinDetailClient } from './CabinDetailClient';

export function generateStaticParams() {
  return cabinTypes.map((cabin) => ({ slug: cabin.slug }));
}

export default async function CabinDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cabin = getCabinBySlug(slug);

  if (!cabin) {
    notFound();
  }

  // Find all cruises that offer this cabin type
  const availableCruises = cruises.filter((cruise) =>
    cruise.cabinCategories.some((cat) => cat.slug === slug)
  );

  return <CabinDetailClient cabin={cabin} cruises={availableCruises} />;
}
