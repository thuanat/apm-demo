require('./otel');

const express = require('express');
const pino = require('pino');
const { trace, context } = require('@opentelemetry/api');

const logger = pino({ level: 'info' });
const app = express();

function logWithTrace(level, payload, message) {
  const span = trace.getSpan(context.active());
  const traceId = span?.spanContext().traceId;

  logger[level](
    {
      ...payload,
      trace_id: traceId,
    },
    message
  );
}

app.get('/', (req, res) => {
  logWithTrace('info', { path: '/' }, 'request success');
  res.send('OK');
});

app.get('/error', (req, res) => {
  logWithTrace(
    'error',
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
