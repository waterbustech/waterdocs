'use client';

import { Rate } from '@/components/rate';

export function RateWrapper() {
  return (
    <Rate
      onRateAction={async (url, feedback) => {
        // handle feedback, e.g. POST to API route
        console.log('Feedback:', url, feedback);
      }}
    />
  );
}
