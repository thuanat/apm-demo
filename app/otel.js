'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { BatchLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { Resource } = require('@opentelemetry/resources');

const sdk = new NodeSDK({
  resource: new Resource({
    'service.name': 'demo-service',
  }),

  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),

  logRecordProcessor: new BatchLogRecordProcessor(
    new OTLPLogExporter({
      url: 'http://otel-collector:4318/v1/logs',
    })
  ),

  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log('✅ OpenTelemetry SDK started');
