'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { PeriodicExportingMetricReader } =
  require('@opentelemetry/sdk-metrics');

const {
  OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-http');

const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  // METRICS
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://otel-collector:4318/v1/metrics',
    }),
    exportIntervalMillis: 5000,
  }),

  // TRACE (auto)
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start()
  .then(() => {
    console.log('✅ OpenTelemetry started (trace + metrics)');
  })
  .catch((err) => {
    console.error('❌ OpenTelemetry failed to start', err);
  });
