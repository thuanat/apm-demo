const { NodeSDK } = require('@opentelemetry/sdk-node');
const { LoggerProvider, BatchLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const loggerProvider = new LoggerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'demo-app',
  }),
});

loggerProvider.addLogRecordProcessor(
  new BatchLogRecordProcessor(
    new OTLPLogExporter({
      url: 'http://otel-collector:4318/v1/logs',
    })
  )
);

const sdk = new NodeSDK({
  loggerProvider,
});

sdk.start();