require('./otel'); // <<< BẮT BUỘC – phải đặt TRƯỚC TẤT CẢ

const express = require('express');
const pino = require('pino');

// Logger gửi log sang OpenTelemetry
const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-opentelemetry-transport',
    options: {
      resourceAttributes: {
        'service.name': 'demo-app',
        'service.namespace': 'apm-demo',
      },
    },
  },
});

const app = express();
const port = 8080;

/**
 * LOG THÀNH CÔNG
 * Dùng cho dashboard: success count, request volume
 */
app.get('/', (req, res) => {
  logger.info(
    {
      route: '/',
      http_method: 'GET',
      status: 200,
      log_type: 'success',
    },
    'Request thành công'
  );

  res.send('Hệ thống APM đã thông suốt!');
});

/**
 * LOG LỖI
 * Dùng cho dashboard: error count, error rate
 */
app.get('/error', (req, res) => {
  logger.error(
    {
      route: '/error',
      http_method: 'GET',
      status: 500,
      log_type: 'error',
      error_type: 'database',
      detail: 'Connection timeout',
    },
    'Lỗi kết nối Database giả lập'
  );

  res.status(500).send('Lỗi hệ thống');
});

/**
 * APP START LOG
 */
app.listen(port, () => {
  logger.info(
    {
      event: 'startup',
      port,
      log_type: 'system',
    },
    `App demo đang lắng nghe tại http://localhost:${port}`
  );
});
