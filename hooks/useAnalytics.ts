// hooks/useAnalytics.ts
'use client';

import { sendGAEvent } from '@next/third-parties/google';

export const useAnalytics = () => {
  const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    // Fejlesztés közben a konzolra írjuk, élesben a Google-nek küldjük
    if (process.env.NODE_ENV === 'development') {
      console.log(`📡 Analytics Event: ${eventName}`, params);
    }
    
    // Biztonsági ellenőrzés, hogy ne szálljon el hiba, ha nincs GA ID beállítva
    try {
      sendGAEvent('event', eventName, params);
    } catch (error) {
      console.warn('GA Event failed', error);
    }
  };

  return { trackEvent };
};