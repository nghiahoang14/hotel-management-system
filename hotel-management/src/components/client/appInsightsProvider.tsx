'use client';
import { getAppInsights } from '@/src/lib/appInsights';
import { useEffect } from 'react';

export default function AppInsightsProvider() {
  useEffect(() => {
    getAppInsights();
  }, []);

  return null;
}