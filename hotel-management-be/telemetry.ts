import * as appInsights from 'applicationinsights';

export function setupTelemetry() {
  if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
    appInsights
      .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true) // HTTP requests
      .setAutoCollectPerformance(true, false) // CPU, memory
      .setAutoCollectExceptions(true) // Errors & exceptions
      .setAutoCollectDependencies(true) // MongoDB, HTTP calls
      .setAutoCollectConsole(true) // console.log
      .start();
  }
}
