const { NodeSDK } = require('@opentelemetry/sdk-node');
const { BatchLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// Khởi tạo OpenTelemetry SDK cho LOGS
const sdk = new NodeSDK({
  logRecordProcessor: new BatchLogRecordProcessor(
    new OTLPLogExporter({
      // Nếu app chạy trong Docker network → dùng hostname service
      // Nếu chạy local → đổi thành http://localhost:4318/v1/logs
      url: 'http://otel-collector:4318/v1/logs',
    })
  ),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start SDK
sdk.start();

console.log('✅ OpenTelemetry Logs SDK started');
