const logger = require('./otel');
const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  logger.emit({
    severityText: 'INFO',
    body: 'Request thành công',
    attributes: {
      route: '/',
      status: 200,
      log_type: 'success',
    },
  });

  res.send('OK');
});

app.get('/error', (req, res) => {
  logger.emit({
    severityText: 'ERROR',
    body: 'Lỗi database giả lập',
    attributes: {
      route: '/error',
      status: 500,
      log_type: 'error',
      error_type: 'database',
    },
  });

  res.status(500).send('Error');
});

app.listen(port, () => {
  logger.emit({
    severityText: 'INFO',
    body: `App listen on ${port}`,
    attributes: {
      event: 'startup',
      port,
    },
  });
});
