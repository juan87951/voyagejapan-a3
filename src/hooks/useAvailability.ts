import { useState, useEffect } from 'react';
import staticData from '@/data/availability.json';
import type { AvailabilityData } from '@/types';

export function useAvailability(): AvailabilityData {
  const [data, setData] = useState<AvailabilityData>(staticData as AvailabilityData);

  useEffect(() => {
    fetch('/api/availability')
      .then((res) => res.ok ? res.json() : null)
      .then((json) => { if (json) setData(json); })
      .catch(() => {});
  }, []);

  return data;
}
