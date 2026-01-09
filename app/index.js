require('./otel');

const express = require('express');
const pino = require('pino');

const logger = pino({
  level: 'info',
});

const app = express();

app.get('/', (req, res) => {
  logger.info({ path: '/' }, 'request success');
  res.send('OK');
});

app.get('/error', (req, res) => {
  logger.error(
    {
      path: '/error',
      error_type: 'database',
    },
    'database connection timeout'
  );
  res.status(500).send('ERROR');
});

app.listen(8080, () => {
  logger.info('app started on port 8080');
});
