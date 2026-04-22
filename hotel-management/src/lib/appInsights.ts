import { ApplicationInsights } from '@microsoft/applicationinsights-web';

let appInsights: ApplicationInsights | null = null;

export const getAppInsights = () => {
  if (typeof window === 'undefined') return null;

  if (!appInsights) {
    appInsights = new ApplicationInsights({
      config: {
        connectionString: process.env.NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING,
        enableAutoRouteTracking: true,   // track page views
        autoTrackPageVisitTime: true,
      },
    });
    appInsights.loadAppInsights();
    appInsights.trackPageView();
  }

  return appInsights;
};